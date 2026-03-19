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
    sms: "Umaalon na po ang tubig sa may drainage ng aming barangay. Maingay na ang agos.",
    nlp: { location: "Brgy Riverside drainage", hazard: "Flooding", urgency: "Low" },
    timestamp: "14:24:18",
    lat: 14.851,
    lng: 120.947,
  },
  {
    id: 3,
    sms: "Nagbaha na po dito sa Purok 3, Brgy Riverside. Hindi na makalabas mga tao.",
    nlp: { location: "Purok 3, Brgy Riverside", hazard: "Flooding", urgency: "Critical" },
    timestamp: "14:25:12",
    lat: 14.847,
    lng: 120.946,
  },
  {
    id: 4,
    sms: "Patuloy na tumaas ang tubig sa ilog. Alarma na kami dito sa Sitio Maliwanag.",
    nlp: { location: "Sitio Maliwanag", hazard: "Flooding", urgency: "Moderate" },
    timestamp: "14:26:30",
    lat: 14.846,
    lng: 120.954,
  },
  {
    id: 5,
    sms: "May nakita po akong landslide sa gilid ng burol malapit sa Hilltop Elementary.",
    nlp: { location: "Near Hilltop Elementary", hazard: "Landslide", urgency: "Critical" },
    timestamp: "14:27:38",
    lat: 14.861,
    lng: 120.960,
  },
  {
    id: 6,
    sms: "Medyo mataas na tubig sa creek sa may palengke. Dahan dahan pa naman.",
    nlp: { location: "Near public market, Poblacion", hazard: "Flooding", urgency: "Low" },
    timestamp: "14:29:01",
    lat: 14.853,
    lng: 120.956,
  },
  {
    id: 7,
    sms: "Yung bangketa sa Roxas Ave. hindi na makita. Umaabot na sa malaking daan.",
    nlp: { location: "Roxas Ave., Poblacion", hazard: "Flooding", urgency: "Moderate" },
    timestamp: "14:29:55",
    lat: 14.854,
    lng: 120.952,
  },
  {
    id: 8,
    sms: "Lumusob na ang baha sa aming bahay sa Phase 2. Nasa segundo piso na kami.",
    nlp: { location: "Phase 2, Brgy Riverside", hazard: "Flooding", urgency: "Critical" },
    timestamp: "14:30:22",
    lat: 14.845,
    lng: 120.949,
  },
  {
    id: 9,
    sms: "Rumaragasa na po ang tubig sa ilog. Kailangan ng tulong sa Sitio Bagong Silang.",
    nlp: { location: "Sitio Bagong Silang", hazard: "Flash Flood", urgency: "Critical" },
    timestamp: "14:31:44",
    lat: 14.845,
    lng: 120.952,
  },
  {
    id: 10,
    sms: "Naputol na ang tulay sa likod ng eskwelahan. Hindi na makabalik ang mga bata.",
    nlp: { location: "Bridge near Bagong Pag-asa Elementary", hazard: "Flash Flood", urgency: "Critical" },
    timestamp: "14:32:10",
    lat: 14.856,
    lng: 120.944,
  },
  {
    id: 11,
    sms: "Ang tubig sa Riverside Canal ay masyadong mabilis na. Huwag pumunta dito.",
    nlp: { location: "Riverside Canal", hazard: "Flooding", urgency: "Critical" },
    timestamp: "14:33:05",
    lat: 14.848,
    lng: 120.948,
  },
  {
    id: 12,
    sms: "May gumuho pong bahagi ng lupa sa tabi ng bundok sa Sitio Mataas. Malaking bato.",
    nlp: { location: "Sitio Mataas", hazard: "Landslide", urgency: "Moderate" },
    timestamp: "14:34:20",
    lat: 14.864,
    lng: 120.963,
  },
  {
    id: 13,
    sms: "Hindi na po mapasok ang main road papuntang Riverside. Nakatakip ng tubig.",
    nlp: { location: "Main road to Brgy Riverside", hazard: "Flooding", urgency: "Moderate" },
    timestamp: "14:35:03",
    lat: 14.850,
    lng: 120.943,
  },
  {
    id: 14,
    sms: "Nawalan na po kami ng kuryente. Nasa bakuran pa lang ang tubig pero mabilis dumarating.",
    nlp: { location: "Purok 5, Brgy Riverside", hazard: "Flooding", urgency: "Low" },
    timestamp: "14:36:15",
    lat: 14.843,
    lng: 120.955,
  },
  {
    id: 15,
    sms: "Nagtayo na po kami sa bubong. Maraming nangangailangan ng rescue sa Purok 3. Pakiusap.",
    nlp: { location: "Purok 3, Brgy Riverside", hazard: "Flash Flood", urgency: "Critical" },
    timestamp: "14:37:30",
    lat: 14.847,
    lng: 120.951,
  },
];
