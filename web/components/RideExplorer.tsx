"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CircleMarker, Map as LeafletMap } from "leaflet";
import { Activity, Gauge, HeartPulse, MapPin, Mountain, RotateCcw, Timer, Zap } from "lucide-react";
import styles from "./RideExplorer.module.css";

type MetricKey = "power" | "heartRate" | "cadence" | "altitude";
export type ExplorerRecord = {
  timestamp?: string;
  lat?: number;
  lon?: number;
  distance?: number;
  power?: number;
  heartRate?: number;
  cadence?: number;
  altitude?: number;
  speed?: number;
  grade?: number;
};

const metrics: Array<{ key: MetricKey; label: string; unit: string }> = [
  { key: "power", label: "Potenza", unit: "W" },
  { key: "heartRate", label: "Frequenza cardiaca", unit: "bpm" },
  { key: "cadence", label: "Cadenza", unit: "rpm" },
  { key: "altitude", label: "Altitudine", unit: "m" },
];

function formatTime(start: string | undefined, current: string | undefined) {
  if (!start || !current) return "—";
  const seconds = Math.max(0, Math.round((new Date(current).getTime() - new Date(start).getTime()) / 1000));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
}

function value(value: number | undefined, digits = 0) {
  return value === undefined || !Number.isFinite(value) ? "—" : value.toLocaleString("it-IT", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

export function RideExplorer({ records }: { records: ExplorerRecord[] }) {
  const [metric, setMetric] = useState<MetricKey>("power");
  const [activeIndex, setActiveIndex] = useState(0);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<CircleMarker | null>(null);

  const geo = useMemo(() => records.map((record, index) => ({ record, index })).filter(({ record }) => typeof record.lat === "number" && typeof record.lon === "number"), [records]);
  const current = records[Math.min(activeIndex, Math.max(0, records.length - 1))] ?? {};

  useEffect(() => {
    let disposed = false;
    async function mount() {
      if (!mapContainer.current || geo.length < 2 || mapRef.current) return;
      const L = await import("leaflet");
      if (disposed || !mapContainer.current) return;
      const map = L.map(mapContainer.current, { zoomControl: false, preferCanvas: true, attributionControl: false });
      mapRef.current = map;
      L.control.zoom({ position: "bottomright" }).addTo(map);
      const latLngs = geo.map(({ record }) => L.latLng(record.lat!, record.lon!));
      const route = L.polyline(latLngs, { color: "#a78bfa", weight: 5, opacity: .95, lineCap: "round", lineJoin: "round" }).addTo(map);
      L.circleMarker(latLngs[0], { radius: 6, color: "#fff", weight: 2, fillColor: "#5bd69a", fillOpacity: 1 }).bindTooltip("Partenza").addTo(map);
      L.circleMarker(latLngs.at(-1)!, { radius: 6, color: "#fff", weight: 2, fillColor: "#ff8a3d", fillOpacity: 1 }).bindTooltip("Arrivo").addTo(map);
      markerRef.current = L.circleMarker(latLngs[0], { radius: 9, color: "#fff", weight: 3, fillColor: "#8b5cf6", fillOpacity: 1 }).addTo(map);
      map.fitBounds(route.getBounds(), { padding: [28, 28], maxZoom: 15 });
      requestAnimationFrame(() => map.invalidateSize());
    }
    mount();
    return () => { disposed = true; mapRef.current?.remove(); mapRef.current = null; markerRef.current = null; };
  }, [geo]);

  useEffect(() => {
    if (!markerRef.current || !geo.length) return;
    let closest = geo[0];
    let best = Math.abs(closest.index - activeIndex);
    for (const point of geo) {
      const distance = Math.abs(point.index - activeIndex);
      if (distance < best) { closest = point; best = distance; }
      if (point.index > activeIndex && distance > best) break;
    }
    markerRef.current.setLatLng([closest.record.lat!, closest.record.lon!]);
  }, [activeIndex, geo]);

  const chart = useMemo(() => {
    const source = records.map((record, index) => ({ index, value: record[metric] })).filter((point): point is { index: number; value: number } => typeof point.value === "number" && Number.isFinite(point.value));
    if (source.length < 2) return null;
    const stride = Math.max(1, Math.ceil(source.length / 900));
    const sampled = source.filter((_, index) => index % stride === 0 || index === source.length - 1);
    const min = Math.min(...sampled.map((point) => point.value));
    const max = Math.max(...sampled.map((point) => point.value));
    const spread = Math.max(1, max - min);
    const width = 1000;
    const height = 210;
    const points = sampled.map((point) => `${point.index / Math.max(1, records.length - 1) * width},${height - 14 - (point.value - min) / spread * (height - 28)}`).join(" ");
    return { min, max, width, height, points };
  }, [records, metric]);

  const onPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setActiveIndex(Math.round(ratio * Math.max(0, records.length - 1)));
  };

  const selectedMetric = metrics.find((item) => item.key === metric)!;
  const cursorX = activeIndex / Math.max(1, records.length - 1) * 1000;

  if (!records.length) return <div className={styles.empty}>Telemetria non disponibile.</div>;

  return (
    <section className={styles.explorer}>
      <div className={styles.mapWrap}>
        <div ref={mapContainer} className={styles.map}/>
        <div className={styles.mapBadge}><MapPin size={14}/> GPS FIT · MAPPA LOCALE · NESSUN TILE ESTERNO</div>
      </div>

      <div className={styles.telemetry}>
        <div className={styles.liveStrip}>
          <div><Timer/><span>Tempo</span><b>{formatTime(records[0]?.timestamp, current.timestamp)}</b></div>
          <div><MapPin/><span>Distanza</span><b>{current.distance !== undefined ? `${value(current.distance / 1000, 2)} km` : "—"}</b></div>
          <div><Zap/><span>Potenza</span><b>{current.power !== undefined ? `${value(current.power)} W` : "—"}</b></div>
          <div><HeartPulse/><span>FC</span><b>{current.heartRate !== undefined ? `${value(current.heartRate)} bpm` : "—"}</b></div>
          <div><RotateCcw/><span>Cadenza</span><b>{current.cadence !== undefined ? `${value(current.cadence)} rpm` : "—"}</b></div>
          <div><Gauge/><span>Velocità</span><b>{current.speed !== undefined ? `${value(current.speed * 3.6, 1)} km/h` : "—"}</b></div>
          <div><Mountain/><span>Quota</span><b>{current.altitude !== undefined ? `${value(current.altitude)} m` : "—"}</b></div>
          <div><Activity/><span>Pendenza</span><b>{current.grade !== undefined ? `${value(current.grade, 1)}%` : "—"}</b></div>
        </div>

        <div className={styles.metricTabs}>{metrics.map((item) => <button key={item.key} className={metric === item.key ? styles.activeTab : ""} onClick={() => setMetric(item.key)}>{item.label}</button>)}</div>
        <div className={styles.chartHead}><span>{selectedMetric.label}</span><b>{value(current[metric])} {selectedMetric.unit}</b></div>
        {chart ? (
          <svg viewBox={`0 0 ${chart.width} ${chart.height}`} preserveAspectRatio="none" className={styles.chart} onPointerMove={onPointer} onPointerDown={onPointer}>
            <defs><linearGradient id={`ride-grad-${metric}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".36"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
            {[.25,.5,.75].map((ratio) => <line key={ratio} x1="0" x2={chart.width} y1={ratio * chart.height} y2={ratio * chart.height} className={styles.gridLine}/>) }
            <polygon points={`0,${chart.height} ${chart.points} ${chart.width},${chart.height}`} fill={`url(#ride-grad-${metric})`}/>
            <polyline points={chart.points} fill="none" stroke="currentColor" strokeWidth="2.2" vectorEffect="non-scaling-stroke"/>
            <line x1={cursorX} x2={cursorX} y1="0" y2={chart.height} className={styles.cursor}/>
          </svg>
        ) : <div className={styles.emptyChart}>Dati {selectedMetric.label.toLowerCase()} non disponibili</div>}
        <div className={styles.chartFoot}><span>min {chart ? value(chart.min) : "—"} {selectedMetric.unit}</span><span>Muovi il cursore per seguire il punto sulla mappa</span><span>max {chart ? value(chart.max) : "—"} {selectedMetric.unit}</span></div>
      </div>
    </section>
  );
}
