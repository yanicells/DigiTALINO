"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { sensors as initialSensors } from "@/data/sensors";
import { smsReports } from "@/data/sms-reports";
import type { SmsReport } from "@/data/sms-reports";
import type { Sensor } from "@/data/sensors";
import {
  Play,
  RotateCcw,
  Radio,
  MessageSquare,
  AlertTriangle,
  Activity,
} from "lucide-react";

const DrrmoMap = dynamic(() => import("@/components/drrmo-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface rounded text-sm text-text-muted">
      Loading map...
    </div>
  ),
});

export default function DrrmoDashboard() {
  const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
  const [visibleReports, setVisibleReports] = useState<SmsReport[]>([]);
  const [alertLog, setAlertLog] = useState<
    { time: string; message: string; level: "info" | "warning" | "critical" }[]
  >([
    {
      time: "14:22:00",
      message: "Routine monitoring: All sensors within normal range",
      level: "info",
    },
    {
      time: "14:23:00",
      message:
        "S-002 Riverside Canal: 2.7m — Elevated. Continuing observation.",
      level: "info",
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [yellowWarning, setYellowWarning] = useState(false);
  const [thresholdBreached, setThresholdBreached] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetSimulation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setSimStep(0);
    setVisibleReports([]);
    setSensors(initialSensors);
    setYellowWarning(false);
    setThresholdBreached(false);
    setAlertLog([
      {
        time: "14:22:00",
        message: "Routine monitoring: All sensors within normal range",
        level: "info",
      },
      {
        time: "14:23:00",
        message:
          "S-002 Riverside Canal: 2.7m — Elevated. Continuing observation.",
        level: "info",
      },
    ]);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSimStep((prev) => {
        const next = prev + 1;

        // Always add next SMS if available
        if (next <= smsReports.length) {
          setVisibleReports(smsReports.slice(0, next));
        }

        // Step 3: S-002 starts rising
        if (next === 3) {
          setSensors((s) =>
            s.map((x) =>
              x.id === "S-002"
                ? { ...x, waterLevel: 2.8, status: "elevated" as const }
                : x,
            ),
          );
          setAlertLog((l) => [
            ...l,
            {
              time: "14:25:38",
              message:
                "S-002 rising: 2.8m — monitoring actively (threshold: 3.0m)",
              level: "info",
            },
          ]);
        }

        // Step 4: After 4 SMS — YELLOW WARNING
        if (next === 4) {
          setSensors((s) =>
            s.map((x) =>
              x.id === "S-002"
                ? { ...x, waterLevel: 2.87, status: "elevated" as const }
                : x,
            ),
          );
          setYellowWarning(true);
          setAlertLog((l) => [
            ...l,
            {
              time: "14:26:30",
              message:
                "WARNING — S-002 at 2.87m: Approaching flood threshold. DRRMO teams on standby.",
              level: "warning",
            },
          ]);
        }

        // Step 7: S-002 approaching critical
        if (next === 7) {
          setSensors((s) =>
            s.map((x) =>
              x.id === "S-002"
                ? { ...x, waterLevel: 2.95, status: "elevated" as const }
                : x,
            ),
          );
          setAlertLog((l) => [
            ...l,
            {
              time: "14:29:55",
              message:
                "WARNING — S-002 at 2.95m: Pre-emptive evacuation advisory for Brgy Riverside issued.",
              level: "warning",
            },
          ]);
        }

        // Step 8: After 8 SMS — RED CRITICAL BREACH
        if (next === 8) {
          setSensors((s) =>
            s.map((x) =>
              x.id === "S-002"
                ? { ...x, waterLevel: 3.0, status: "critical" as const }
                : x,
            ),
          );
          setThresholdBreached(true);
          setAlertLog((l) => [
            ...l,
            {
              time: "14:30:22",
              message:
                "THRESHOLD BREACHED: S-002 at 3.0m — Bulk SMS dispatched to 2,847 registered residents in Barangay Riverside",
              level: "critical",
            },
          ]);
        }

        // Stop simulation after all reports
        if (next >= smsReports.length + 1) {
          setIsRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        return next;
      });
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  return (
    <div className="min-h-full">
      {/* Yellow Elevated Warning Banner */}
      {yellowWarning && !thresholdBreached && (
        <div className="px-4 sm:px-8 py-3 bg-accent-amber text-white flex items-center gap-3">
          <AlertTriangle size={18} />
          <span className="text-sm font-medium">
            ELEVATED WATER LEVEL — Sensor S-002 (Riverside Canal) approaching
            flood threshold — DRRMO teams on standby, evacuation advisory issued
          </span>
        </div>
      )}

      {/* Red Threshold Breach Banner */}
      {thresholdBreached && (
        <div className="px-4 sm:px-8 py-3 bg-accent-red text-white flex items-center gap-3">
          <AlertTriangle size={18} />
          <span className="text-sm font-medium">
            FLOOD THRESHOLD BREACHED — Sensor S-002 (Riverside Canal) —
            Automated SMS alert dispatched to Barangay Riverside residents
          </span>
        </div>
      )}

      <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-border bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">
              DRRMO Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Disaster Risk Reduction &amp; Management Office — Real-time
              Monitoring
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setIsRunning(true)}
              disabled={isRunning || simStep > 0}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play size={14} />
              Start Simulation
            </button>
            <button
              onClick={resetSimulation}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium border border-border text-text-primary rounded hover:bg-surface transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:h-[calc(100vh-220px)]">
          {/* Left: Map */}
          <div className="flex-3 min-w-0 lg:h-full drrmo-map-height">
            <div
              className="bg-white border border-border rounded h-full overflow-hidden"
              style={{ isolation: "isolate" }}
            >
              <DrrmoMap sensors={sensors} visibleReports={visibleReports} />
            </div>
          </div>

          {/* Right: Panel */}
          <div className="flex-2 flex flex-col gap-4 min-w-0 lg:min-w-72 lg:h-full overflow-hidden">
            {/* Sensor Readings */}
            <div className="bg-white border border-border rounded shrink-0">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <Activity size={14} />
                  Flood Sensor Readings
                </h2>
              </div>
              <div className="divide-y divide-border">
                {sensors.map((sensor) => {
                  const pct = (sensor.waterLevel / sensor.threshold) * 100;
                  const isBreached = sensor.waterLevel >= sensor.threshold;
                  return (
                    <div
                      key={sensor.id}
                      className={`px-4 py-3 ${isBreached ? "bg-accent-red/5" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-medium text-text-primary">
                          {sensor.id} — {sensor.location}
                        </div>
                        <SensorStatusBadge status={sensor.status} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-surface rounded overflow-hidden">
                          <div
                            className={`h-full rounded transition-all duration-500 ${
                              isBreached
                                ? "bg-accent-red"
                                : sensor.status === "elevated"
                                  ? "bg-accent-amber"
                                  : "bg-accent-green"
                            }`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-secondary whitespace-nowrap font-mono">
                          {sensor.waterLevel.toFixed(1)}m /{" "}
                          {sensor.threshold.toFixed(1)}m
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SMS Feed */}
            <div className="bg-white border border-border rounded flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-border shrink-0">
                <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <MessageSquare size={14} />
                  Live SMS Report Feed
                  {visibleReports.length > 0 && (
                    <span className="text-xs font-normal text-text-muted">
                      ({visibleReports.length}/{smsReports.length})
                    </span>
                  )}
                </h2>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar divide-y divide-border">
                {visibleReports.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-text-muted">
                    Start the simulation to see incoming SMS reports
                  </div>
                ) : (
                  [...visibleReports].reverse().map((report) => (
                    <div key={report.id} className="px-4 py-3">
                      <div className="text-xs text-text-muted mb-1">
                        {report.timestamp}
                      </div>
                      <div className="text-sm text-text-secondary italic mb-2">
                        &ldquo;{report.sms}&rdquo;
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px]">
                        <span className="px-1.5 py-0.5 rounded bg-surface text-text-secondary">
                          {report.nlp.hazard}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-surface text-text-secondary">
                          {report.nlp.location}
                        </span>
                        <UrgencyBadge urgency={report.nlp.urgency} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Alert Log */}
            <div className="bg-white border border-border rounded shrink-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <Radio size={14} />
                  Alert Log
                </h2>
              </div>
              <div className="divide-y divide-border max-h-36 sm:max-h-40 overflow-y-auto hide-scrollbar">
                {[...alertLog].reverse().map((entry, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 text-xs ${
                      entry.level === "critical"
                        ? "bg-accent-red/5 text-accent-red"
                        : entry.level === "warning"
                          ? "text-accent-amber"
                          : "text-text-secondary"
                    }`}
                  >
                    <span className="font-mono font-medium">{entry.time}</span>
                    {" — "}
                    {entry.level === "critical" && "🚨 "}
                    {entry.level === "warning" && "⚠️ "}
                    {entry.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensorStatusBadge({ status }: { status: Sensor["status"] }) {
  const config = {
    normal: {
      label: "Normal",
      color: "text-accent-green bg-accent-green/10",
      dot: "bg-accent-green",
    },
    elevated: {
      label: "Elevated",
      color: "text-accent-amber bg-accent-amber/10",
      dot: "bg-accent-amber",
    },
    critical: {
      label: "Critical",
      color: "text-accent-red bg-accent-red/10",
      dot: "bg-accent-red",
    },
  };
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded ${c.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function UrgencyBadge({ urgency }: { urgency: SmsReport["nlp"]["urgency"] }) {
  const config = {
    Critical: "bg-accent-red/10 text-accent-red",
    Moderate: "bg-accent-amber/10 text-accent-amber",
    Low: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-1.5 py-0.5 rounded font-medium ${config[urgency]}`}>
      {urgency}
    </span>
  );
}
