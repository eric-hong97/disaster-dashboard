import type Shipment from './util';

export const API_URL = 'https://dashboard-mock-api.onrender.com';

export async function fetchShipments(filters: { status?: string; priority?: string }): Promise<Shipment[]> {
  const params = new URLSearchParams();

  if (filters.status && filters.status !== 'All') {
    params.append('status', filters.status);
  }
  if (filters.priority && filters.priority !== 'All') {
    params.append('priority', filters.priority);
  }

  const res = await fetch(`${API_URL}/shipments?${params.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch shipments');
  }
  return res.json();
}
