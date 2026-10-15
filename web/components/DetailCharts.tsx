import type { ActivityRecord } from "@/lib/fit";
import { formatNumber } from "@/lib/format";

function downsample(values: number[], maxPoints = 280) {
  if (values.length <= maxPoints) return values;
  const step = values.length / maxPoints;
  return Array.from({ length: maxPoints }, (_, i) => values[Math.floor(i * step)]);
}

export function SeriesChart({ records, field, label, unit, tone = "violet" }: { records: ActivityRecord[]; field: "power" | "heartRate" | "cadence" | "altitude"; label: string; unit: string; tone?: "violet" | "orange" | "pink" | "cyan" }) {
  const raw = records.map((r) => r[field]).filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  const values = downsample(raw);
  if (values.length < 2) return <div className="chartCard"><div className="chartTitle"><span>{label}</span><b>—</b></div><div className="chartEmpty">Dati non disponibili</div></div>;
  const width = 800;
  const height = 170;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const spread = Math.max(1, max - min);
  const points = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - ((v - min) / spread) * (height - 24) - 12}`).join(" ");
  return (
    <div className={`chartCard tone-${tone}`}>
      <div className="chartTitle"><span>{label}</span><b>{formatNumber(avg)} <small>{unit}</small></b></div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="detailChart">
        <defs><linearGradient id={`grad-${field}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".3"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
        <line x1="0" y1="42" x2={width} y2="42" className="gridLine"/><line x1="0" y1="86" x2={width} y2="86" className="gridLine"/><line x1="0" y1="130" x2={width} y2="130" className="gridLine"/>
        <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#grad-${field})`}/>
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.2" vectorEffect="non-scaling-stroke"/>
      </svg>
      <div className="chartRange"><span>{formatNumber(min)} {unit}</span><span>max {formatNumber(max)} {unit}</span></div>
    </div>
  );
}

export function RouteMap({ records }: { records: ActivityRecord[] }) {
  const points = records.filter((r) => typeof r.lat === "number" && typeof r.lon === "number");
  if (points.length < 2) return <div className="routeMap routeEmpty">Traccia GPS non disponibile</div>;
  const sampled = points.length > 600 ? points.filter((_, i) => i % Math.ceil(points.length / 600) === 0) : points;
  const lats = sampled.map((p) => p.lat!);
  const lons = sampled.map((p) => p.lon!);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats), minLon = Math.min(...lons), maxLon = Math.max(...lons);
  const width = 760, height = 300, pad = 24;
  const latSpan = Math.max(0.00001, maxLat - minLat), lonSpan = Math.max(0.00001, maxLon - minLon);
  const route = sampled.map((p) => `${pad + ((p.lon! - minLon) / lonSpan) * (width - pad * 2)},${height - pad - ((p.lat! - minLat) / latSpan) * (height - pad * 2)}`).join(" ");
  return <div className="routeMap"><div className="mapGrid"/><svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet"><polyline points={route} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/><circle cx={route.split(" ")[0]?.split(",")[0]} cy={route.split(" ")[0]?.split(",")[1]} r="7" className="routeStart"/></svg><div className="mapBadge">GPS · FIT</div></div>;
}
