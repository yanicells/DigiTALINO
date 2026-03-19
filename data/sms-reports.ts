export interface SmsReport {
  id: number;
  sms: string;
  nlp: {
    location: string;
    hazard: string;
    urgency: "Low" | "Moderate" | "Critical";
  };
  timestamp: string;
  lat: number;
  lng: number;
}

export const smsReports: SmsReport[] = [
  {
    id: 1,
    sms: "Mataas na po ang tubig sa kanto ng Riverside at Mabini. Halos tuhod na.",
    nlp: { location: "Riverside & Mabini intersection", hazard: "Flooding", urgency: "Moderate" },
    timestamp: "14:23:05",
    lat: 14.849,
    lng: 120.950,
  },
  {
    id: 2,
    sms: "Nagbaha na po dito sa Purok 3, Brgy Riverside. Hindi na makalabas mga tao.",
    nlp: { location: "Purok 3, Brgy Riverside", hazard: "Flooding", urgency: "Critical" },
    timestamp: "14:25:12",
    lat: 14.847,
    lng: 120.946,
  },
  {
    id: 3,
    sms: "May nakita po akong landslide sa gilid ng burol malapit sa Hilltop Elementary.",
    nlp: { location: "Near Hilltop Elementary", hazard: "Landslide", urgency: "Critical" },
    timestamp: "14:27:38",
    lat: 14.861,
    lng: 120.960,
  },
  {
    id: 4,
    sms: "Medyo mataas na tubig sa creek sa may palengke. Dahan dahan pa naman.",
    nlp: { location: "Near public market, Poblacion", hazard: "Flooding", urgency: "Low" },
    timestamp: "14:29:01",
    lat: 14.853,
    lng: 120.956,
  },
  {
    id: 5,
    sms: "Rumaragasa na po ang tubig sa ilog. Kailangan ng tulong sa Sitio Bagong Silang.",
    nlp: { location: "Sitio Bagong Silang", hazard: "Flash Flood", urgency: "Critical" },
    timestamp: "14:31:44",
    lat: 14.845,
    lng: 120.952,
  },
];
