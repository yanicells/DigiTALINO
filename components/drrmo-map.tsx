"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { SmsReport } from "@/data/sms-reports";
import type { Sensor } from "@/data/sensors";

const URGENCY_COLORS: Record<string, string> = {
  Critical: "#dc2626",
  Moderate: "#f59e0b",
  Low: "#ca8a04",
};

const URGENCY_BG: Record<string, string> = {
  Critical: "#fef2f2",
  Moderate: "#fffbeb",
  Low: "#fefce8",
};

interface DrrmoMapProps {
  sensors: Sensor[];
  visibleReports: SmsReport[];
}

// Build compact popup HTML for auto-show on new report
function buildCompactPopup(report: SmsReport): string {
  const color = URGENCY_COLORS[report.nlp.urgency] || "#ca8a04";
  const bg = URGENCY_BG[report.nlp.urgency] || "#fefce8";
  return `
    <div style="font-family:system-ui,sans-serif;min-width:180px;max-width:220px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;gap:8px;">
        <span style="font-size:11px;font-weight:700;color:#1a1a1a;">${report.nlp.hazard}</span>
        <span style="font-size:10px;font-weight:600;color:${color};background:${bg};padding:1px 6px;border-radius:3px;">${report.nlp.urgency}</span>
      </div>
      <div style="font-size:10px;color:#52524e;margin-bottom:4px;">${report.nlp.location}</div>
      <div style="font-size:10px;color:#8a8a86;font-style:italic;border-top:1px solid #e5e2de;padding-top:4px;line-height:1.4;">"${report.sms.length > 60 ? report.sms.slice(0, 60) + "…" : report.sms}"</div>
      <div style="font-size:9px;color:#8a8a86;margin-top:3px;">${report.timestamp} · Geocoded & plotted</div>
    </div>`;
}

// Build full popup HTML for on-click
function buildFullPopup(report: SmsReport): string {
  const color = URGENCY_COLORS[report.nlp.urgency] || "#ca8a04";
  return `
    <div style="font-family:system-ui,sans-serif;font-size:12px;max-width:230px;">
      <div style="font-style:italic;margin-bottom:6px;color:#52524e;line-height:1.4;">"${report.sms}"</div>
      <div style="font-size:11px;font-weight:600;margin-bottom:4px;color:#1a1a1a;">NLP Classification</div>
      Hazard: <strong>${report.nlp.hazard}</strong><br/>
      Location: ${report.nlp.location}<br/>
      Urgency: <span style="color:${color};font-weight:700;">${report.nlp.urgency}</span><br/>
      Time: ${report.timestamp}<br/>
      Status: Geocoded and plotted
    </div>`;
}

export default function DrrmoMap({ sensors, visibleReports }: DrrmoMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sensorMarkerRef = useRef<Map<string, L.CircleMarker>>(new Map());
  const markerMapRef = useRef<Map<number, L.CircleMarker>>(new Map());
  const prevCountRef = useRef(0);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        fillOpacity: 0.85,
      }).addTo(map);

      marker.bindPopup(
        `<div style="font-family:system-ui;font-size:12px;">
          <strong>${sensor.id}</strong><br/>
          ${sensor.location}<br/>
          Water Level: ${sensor.waterLevel}m / ${sensor.threshold}m
        </div>`
      );

      sensorMarkerRef.current.set(sensor.id, marker);

      L.marker([sensor.lat, sensor.lng], {
        icon: L.divIcon({
          className: "",
          html: `<div style="font-size:10px;font-weight:600;color:#1e40af;white-space:nowrap;transform:translateX(14px) translateY(-8px)">${sensor.id}</div>`,
          iconSize: [0, 0],
        }),
      }).addTo(map);
    });

    mapRef.current = map;

    // Ensure proper render after mount/layout settles.
    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      sensorMarkerRef.current.clear();
      map.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep map size in sync with container resizes.
  useEffect(() => {
    if (!containerRef.current || !mapRef.current) return;

    const map = mapRef.current;
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync sensor pins when readings/status update during simulation.
  useEffect(() => {
    const markerMap = sensorMarkerRef.current;
    if (!markerMap.size) return;

    sensors.forEach((sensor) => {
      const marker = markerMap.get(sensor.id);
      if (!marker) return;

      const color =
        sensor.status === "critical"
          ? "#dc2626"
          : sensor.status === "elevated"
          ? "#f59e0b"
          : "#2563eb";

      marker.setStyle({
        fillColor: color,
        color,
      });
      marker.setLatLng([sensor.lat, sensor.lng]);
      marker.bindPopup(
        `<div style="font-family:system-ui;font-size:12px;">
          <strong>${sensor.id}</strong><br/>
          ${sensor.location}<br/>
          Water Level: ${sensor.waterLevel.toFixed(1)}m / ${sensor.threshold.toFixed(1)}m
        </div>`
      );
    });
  }, [sensors]);

  // Sync report markers — add new ones incrementally, don't rebuild all
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const markerMap = markerMapRef.current;
    const prevCount = prevCountRef.current;
    const newCount = visibleReports.length;

    // Reset: visible reports went from non-zero to zero (simulation reset)
    if (newCount === 0 && prevCount > 0) {
      markerMap.forEach((m) => m.remove());
      markerMap.clear();
      prevCountRef.current = 0;
      return;
    }

    // Add only newly-added reports
    const newReports = visibleReports.slice(prevCount);
    newReports.forEach((report) => {
      const color = URGENCY_COLORS[report.nlp.urgency] || "#ca8a04";

      const marker = L.circleMarker([report.lat, report.lng], {
        radius: 9,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.75,
      }).addTo(map);

      // On-click full popup
      marker.bindPopup(buildFullPopup(report), { maxWidth: 260 });

      markerMap.set(report.id, marker);
    });

    // If a new report was added, show the compact auto-popup on it
    if (newCount > prevCount && newReports.length > 0) {
      const newestReport = newReports[newReports.length - 1];
      const newestMarker = markerMap.get(newestReport.id);

      if (newestMarker) {
        // Cancel any existing auto-close timer
        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);

        // Close all open popups first
        map.closePopup();

        // Temporarily bind and open the compact popup
        newestMarker.bindPopup(buildCompactPopup(newestReport), {
          maxWidth: 240,
          closeButton: false,
          autoPan: false,
        });
        newestMarker.openPopup();

        // After 2.5s, switch back to the full popup (for on-click use) and close
        autoCloseTimerRef.current = setTimeout(() => {
          map.closePopup();
          newestMarker.bindPopup(buildFullPopup(newestReport), { maxWidth: 260 });
        }, 2500);
      }
    }

    prevCountRef.current = newCount;
  }, [visibleReports]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded"
    />
  );
}
