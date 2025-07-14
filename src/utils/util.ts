// utils/api.ts

export default interface Shipment {
  id: number;
  location: string;              // Display name for city/port/warehouse
  lat: number;
  lng: number;
  updatedAt: string;            // ISO date string, e.g., '2023-10-01T12:00:00Z'
  status: 'Active' | 'Delayed' | 'Blocked' | 'Delivered';
  priority: 'High' | 'Medium' | 'Low';

  eta: string;                   // e.g., '2h', '--'
}


  export function latLngToVector3(lat: number, lng: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
  
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
  
    return [x, y, z] as const;
  }