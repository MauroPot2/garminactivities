"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import styles from "./RouteMap.module.css";

type RoutePoint = { lat: number; lon: number };

export function RouteMap({ points }: { points: RoutePoint[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let disposed = false;

    async function mountMap() {
      if (!containerRef.current || points.length < 2 || mapRef.current) return;

      const L = await import("leaflet");
      if (disposed || !containerRef.current) return;

      const map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        preferCanvas: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      const latLngs = points.map((point) => L.latLng(point.lat, point.lon));
      const route = L.polyline(latLngs, {
        color: "#8b5cf6",
        weight: 5,
        opacity: 0.96,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      L.circleMarker(latLngs[0], {
        radius: 7,
        color: "#ffffff",
        weight: 3,
        fillColor: "#22c55e",
        fillOpacity: 1,
      }).bindTooltip("Partenza", { direction: "top", offset: [0, -6] }).addTo(map);

      L.circleMarker(latLngs.at(-1)!, {
        radius: 7,
        color: "#ffffff",
        weight: 3,
        fillColor: "#f97316",
        fillOpacity: 1,
      }).bindTooltip("Arrivo", { direction: "top", offset: [0, -6] }).addTo(map);

      map.fitBounds(route.getBounds(), { padding: [30, 30], maxZoom: 15 });
      requestAnimationFrame(() => map.invalidateSize());
    }

    mountMap();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [points]);

  if (points.length < 2) {
    return <div className={`${styles.map} ${styles.empty}`}>Traccia GPS non disponibile</div>;
  }

  return (
    <div className={styles.wrap}>
      <div ref={containerRef} className={styles.map} />
      <div className={styles.badge}>MAPPA · GPS FIT</div>
    </div>
  );
}
