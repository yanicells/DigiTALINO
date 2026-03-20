import {
  topMetrics,
  departmentPerformance,
  disasterStatus,
  systemMetrics,
} from "@/data/kpi-data";
import {
  TrendingUp,
  Clock,
  ThumbsUp,
  AlertTriangle,
  Activity,
  Shield,
  Users,
  Wifi,
} from "lucide-react";

const metricIcons = [TrendingUp, Clock, ThumbsUp, AlertTriangle];

export default function MayorDashboard() {
  return (
    <div className="min-h-full">
      <div className="px-8 py-6 border-b border-border bg-white">
        <h1 className="text-xl font-semibold text-text-primary">
          Executive Dashboard
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Municipality of Bagong Pag-asa
        </p>
      </div>

      <div className="p-8 space-y-6">
        {/* Top Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {topMetrics.map((metric, i) => {
            const Icon = metricIcons[i];
            return (
              <div
                key={metric.label}
                className="bg-white border border-border rounded p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-xs text-text-muted">{metric.label}</span>
                </div>
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-accent-green">{metric.change}</div>
              </div>
            );
          })}
        </div>

        {/* e-Services Performance */}
        <div className="bg-white border border-border rounded">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-text-primary flex items-center gap-2">
              <Activity size={16} />
              e-Services Performance
            </h2>
          </div>
          <div className="p-6">
            {/* Simple bar visualization */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              {departmentPerformance.map((dept) => (
                <div key={dept.department} className="text-center">
                  <div className="h-32 flex flex-col justify-end items-center mb-2">
                    <div
                      className="w-10 bg-primary/80 rounded-t"
                      style={{
                        height: `${(dept.completed / 100) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-text-muted leading-tight">
                    {dept.department}
                  </div>
                  <div className="text-xs font-semibold text-text-primary">
                    {dept.completed}
                  </div>
                </div>
              ))}
            </div>

            {/* Department Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
                    Department
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
                    Pending
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
                    Completed
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
                    Avg. Time
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-text-muted uppercase tracking-wide">
                    Bottleneck
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((dept) => (
                  <tr
                    key={dept.department}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-2 px-3 font-medium">{dept.department}</td>
                    <td className="py-2 px-3 text-text-secondary">
                      {dept.pending}
                    </td>
                    <td className="py-2 px-3 text-text-secondary">
                      {dept.completed}
                    </td>
                    <td className="py-2 px-3 text-text-secondary">
                      {dept.avgTime}
                    </td>
                    <td className="py-2 px-3">
                      {dept.bottleneck ? (
                        <span className="inline-flex items-center gap-1 text-xs text-accent-amber font-medium">
                          <AlertTriangle size={12} />
                          High pending
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Disaster Preparedness */}
          <div className="bg-white border border-border rounded">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-text-primary flex items-center gap-2">
                <Shield size={16} />
                Disaster Preparedness Status
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <InfoRow label="IoT Sensors Online" value={disasterStatus.sensorsOnline} />
              <InfoRow
                label="Last Flood Alert"
                value={disasterStatus.lastFloodAlert}
              />
              <InfoRow
                label="Citizen Reports (This Month)"
                value={`${disasterStatus.citizenReports.processed} processed, ${disasterStatus.citizenReports.unclassified} unclassified`}
              />
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">DRRM Fund Utilization</span>
                  <span className="font-medium text-text-primary">
                    ₱{disasterStatus.drrmFund.used}M of ₱{disasterStatus.drrmFund.total}M ({disasterStatus.drrmFund.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-surface rounded overflow-hidden">
                  <div
                    className="h-full bg-primary rounded"
                    style={{ width: `${disasterStatus.drrmFund.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Staff & System Metrics */}
          <div className="bg-white border border-border rounded">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-text-primary flex items-center gap-2">
                <Users size={16} />
                Staff & System Metrics
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <InfoRow
                label="Active Staff Users"
                value={String(systemMetrics.activeStaff)}
              />
              <InfoRow label="System Uptime" value={systemMetrics.uptime} />
              <div className="flex items-center gap-2 px-3 py-2 bg-accent-green/5 border border-accent-green/10 rounded">
                <Wifi size={14} className="text-accent-green" />
                <span className="text-sm text-text-secondary">
                  Data Sync: {systemMetrics.lastSync}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium text-text-primary">{value}</span>
    </div>
  );
}
