export const topMetrics = [
  { label: "Permits Processed (This Month)", value: "347", change: "↑ 52% vs. last month", positive: true },
  { label: "Avg. Processing Time", value: "1.8 days", change: "↓ from 12.3 days (before DigiTALINO)", positive: true },
  { label: "Citizen Satisfaction", value: "87%", change: "Based on SMS feedback", positive: true },
  { label: "Active Disaster Alerts", value: "0", change: "Last alert: Mar 15, 2026", positive: true },
];

export const departmentPerformance = [
  { department: "Barangay Hall", pending: 3, completed: 89, avgTime: "2.1 hrs", bottleneck: false },
  { department: "BFP", pending: 5, completed: 85, avgTime: "4.5 hrs", bottleneck: false },
  { department: "Health Office", pending: 2, completed: 91, avgTime: "3.2 hrs", bottleneck: false },
  { department: "Zoning Office", pending: 8, completed: 78, avgTime: "6.8 hrs", bottleneck: true },
  { department: "BPLO", pending: 4, completed: 82, avgTime: "3.9 hrs", bottleneck: false },
  { department: "Treasury", pending: 1, completed: 87, avgTime: "1.1 hrs", bottleneck: false },
];

export const disasterStatus = {
  sensorsOnline: "12/12",
  lastFloodAlert: "Mar 15, 2026 — Barangay Riverside",
  citizenReports: { processed: 23, unclassified: 2 },
  drrmFund: { used: 2.1, total: 12.5, percentage: 17 },
};

export const systemMetrics = {
  activeStaff: 34,
  uptime: "99.7%",
  lastSync: "2 minutes ago — Normal (24-hour cycle)",
};
