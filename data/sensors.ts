export interface Sensor {
  id: string;
  location: string;
  waterLevel: number;
  threshold: number;
  status: "normal" | "elevated" | "critical";
  lat: number;
  lng: number;
}

export const sensors: Sensor[] = [
  { id: "S-001", location: "Pag-asa River Bridge", waterLevel: 2.1, threshold: 3.0, status: "normal", lat: 14.855, lng: 120.955 },
  { id: "S-002", location: "Riverside Canal", waterLevel: 2.7, threshold: 3.0, status: "elevated", lat: 14.848, lng: 120.948 },
  { id: "S-003", location: "Poblacion Creek", waterLevel: 1.4, threshold: 3.0, status: "normal", lat: 14.852, lng: 120.958 },
  { id: "S-004", location: "Hilltop Drainage", waterLevel: 0.8, threshold: 3.0, status: "normal", lat: 14.860, lng: 120.962 },
];
