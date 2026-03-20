export interface BarangayRiskScore {
  rank: number;
  barangay: string;
  riskScore: number;
  maxScore: number;
  sensorAlerts: string;
  citizenReports: number;
  dominantHazard: string;
  householdsAffected: number;
  aidPriority: "Critical" | "High" | "Moderate" | "Low";
}

export const eventSummary = {
  eventType: "Flash Flood",
  date: "March 15, 2026, 13:00–18:00",
  duration: "~5 hours",
  affectedBarangays: "4 of 12",
  totalReports: 47,
  classifiedByNlp: 43,
  classificationRate: "91.5%",
  unclassified: 4,
  smsAlertsDispatched: "3 rounds to 4,200+ residents",
  sensorTriggers: "2 of 4 sensors breached threshold",
};

export const barangayRiskScores: BarangayRiskScore[] = [
  {
    rank: 1,
    barangay: "Brgy. Riverside",
    riskScore: 92,
    maxScore: 100,
    sensorAlerts: "2 (both breached)",
    citizenReports: 18,
    dominantHazard: "Flash Flood",
    householdsAffected: 1240,
    aidPriority: "Critical",
  },
  {
    rank: 2,
    barangay: "Brgy. Bagong Silang",
    riskScore: 78,
    maxScore: 100,
    sensorAlerts: "1 (elevated)",
    citizenReports: 12,
    dominantHazard: "Flash Flood",
    householdsAffected: 890,
    aidPriority: "Critical",
  },
  {
    rank: 3,
    barangay: "Brgy. Hilltop",
    riskScore: 61,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 8,
    dominantHazard: "Landslide",
    householdsAffected: 340,
    aidPriority: "High",
  },
  {
    rank: 4,
    barangay: "Brgy. Poblacion",
    riskScore: 45,
    maxScore: 100,
    sensorAlerts: "1 (normal range)",
    citizenReports: 5,
    dominantHazard: "Flooding (minor)",
    householdsAffected: 210,
    aidPriority: "Moderate",
  },
  {
    rank: 5,
    barangay: "Brgy. Centro",
    riskScore: 12,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 2,
    dominantHazard: "None significant",
    householdsAffected: 45,
    aidPriority: "Low",
  },
  {
    rank: 6,
    barangay: "Brgy. Maligaya",
    riskScore: 10,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 1,
    dominantHazard: "None",
    householdsAffected: 20,
    aidPriority: "Low",
  },
  {
    rank: 7,
    barangay: "Brgy. Maunlad",
    riskScore: 8,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 1,
    dominantHazard: "None",
    householdsAffected: 15,
    aidPriority: "Low",
  },
  {
    rank: 8,
    barangay: "Brgy. Masagana",
    riskScore: 7,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 0,
    dominantHazard: "None",
    householdsAffected: 10,
    aidPriority: "Low",
  },
  {
    rank: 9,
    barangay: "Brgy. Pag-asa",
    riskScore: 6,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 0,
    dominantHazard: "None",
    householdsAffected: 5,
    aidPriority: "Low",
  },
  {
    rank: 10,
    barangay: "Brgy. Bagong Buhay",
    riskScore: 5,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 0,
    dominantHazard: "None",
    householdsAffected: 0,
    aidPriority: "Low",
  },
  {
    rank: 11,
    barangay: "Brgy. San Jose",
    riskScore: 5,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 0,
    dominantHazard: "None",
    householdsAffected: 0,
    aidPriority: "Low",
  },
  {
    rank: 12,
    barangay: "Brgy. Del Pilar",
    riskScore: 5,
    maxScore: 100,
    sensorAlerts: "0",
    citizenReports: 0,
    dominantHazard: "None",
    householdsAffected: 0,
    aidPriority: "Low",
  },
];

export interface AidPrioritization {
  priority: "Critical" | "High" | "Moderate" | "Low";
  barangay: string;
  households: number;
  recommendation: string;
}

export const aidPrioritization: AidPrioritization[] = [
  {
    priority: "Critical",
    barangay: "Brgy. Riverside",
    households: 1240,
    recommendation:
      "Immediate evacuation support + relief goods",
  },
  {
    priority: "Critical",
    barangay: "Brgy. Bagong Silang",
    households: 890,
    recommendation: "Relief goods + temporary shelter",
  },
  {
    priority: "High",
    barangay: "Brgy. Hilltop",
    households: 340,
    recommendation:
      "Structural assessment + standby evacuation",
  },
  {
    priority: "Moderate",
    barangay: "Brgy. Poblacion",
    households: 210,
    recommendation: "Monitoring, no immediate intervention",
  },
];

export const dataSources = [
  {
    label: "IoT Sensor Data",
    detail:
      "4 sensors, 5-minute polling intervals over 5 hours = ~240 readings per sensor",
  },
  {
    label: "Citizen SMS Reports",
    detail: "47 messages processed through NLP pipeline",
  },
  {
    label: "Historical Records",
    detail:
      "3 previous flood events (2023, 2024, 2025) used for baseline scoring",
  },
  {
    label: "eGovPH Citizen Registry",
    detail: "Household counts per barangay pulled from MDM",
  },
];

export const recommendations = [
  "Deploy additional IoT sensor at Brgy. Bagong Silang — high citizen report density but no sensor coverage",
  "Update SMS alert contact list for Brgy. Riverside — 12% of registered numbers returned undeliverable",
  "Conduct pre-positioned relief stocking at Brgy. Riverside and Brgy. Bagong Silang based on updated risk scores",
  "Schedule community drill for Brgy. Hilltop — landslide risk newly identified through citizen reports",
];
