"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { SmsReport } from "@/data/sms-reports";
import type { Sensor } from "@/data/sensors";

const URGENCY_COLORS: Record<string, string> = {
  Critical: "#dc2626",
  Moderate: "#f59e0b",
  Low: "#eab308",
};

interface DrrmoMapProps {
  sensors: Sensor[];
  visibleReports: SmsReport[];
}

export default function DrrmoMap({ sensors, visibleReports }: DrrmoMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reportMarkersRef = useRef<L.CircleMarker[]>([]);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [14.852, 120.955],
      zoom: 14,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Add sensor markers
    sensors.forEach((sensor) => {
      const marker = L.circleMarker([sensor.lat, sensor.lng], {
        radius: 10,
        fillColor: "#2563eb",
        color: "#1e40af",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(map);

      marker.bindPopup(
        `<div style="font-family:system-ui;font-size:12px;">
          <strong>${sensor.id}</strong><br/>
          ${sensor.location}<br/>
          Water Level: ${sensor.waterLevel}m / ${sensor.threshold}m
        </div>`
      );

      // Label
      L.marker([sensor.lat, sensor.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div style="font-size:10px;font-weight:600;color:#1e40af;white-space:nowrap;transform:translateX(14px) translateY(-8px)">${sensor.id}</div>`,
          iconSize: [0, 0],
        }),
      }).addTo(map);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update report markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
    reportMarkersRef.current.forEach((m) => m.remove());
    reportMarkersRef.current = [];

    visibleReports.forEach((report) => {
      const color = URGENCY_COLORS[report.nlp.urgency] || "#eab308";
      const marker = L.circleMarker([report.lat, report.lng], {
        radius: 8,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
      }).addTo(mapRef.current!);

      marker.bindPopup(
        `<div style="font-family:system-ui;font-size:12px;max-width:220px;">
          <div style="font-style:italic;margin-bottom:6px;color:#52524e;">"${report.sms}"</div>
          <strong>NLP Classification:</strong><br/>
          Hazard: ${report.nlp.hazard}<br/>
          Location: ${report.nlp.location}<br/>
          Urgency: <span style="color:${color};font-weight:600;">${report.nlp.urgency}</span><br/>
          Time: ${report.timestamp}<br/>
          Status: Geocoded and plotted
        </div>`
      );

      reportMarkersRef.current.push(marker);
    });
  }, [visibleReports]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded"
      style={{ minHeight: "500px" }}
    />
  );
}
