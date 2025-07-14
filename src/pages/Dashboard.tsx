// === Fixed: Dashboard.tsx ===
import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import StatsCard from '../components/StatsCard';
import ShipmentTable from '../components/ShipmentTable';
import ThreeDashboard from '../components/ThreeDashboard';
import FilterPanel from '../components/FilterPanel';
import { fetchShipments } from '../utils/api';
import type Shipment from '../utils/util';

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchShipments(filters)
      .then(setShipments)
      .finally(() => setLoading(false));
  }, [filters]);

  const statusCounts = shipments.reduce((acc, cur) => {
    acc[cur.status] = (acc[cur.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 2, overflow: 'auto' }}>
      <Grid container spacing={2} mb={3} justifyContent="center">
        {['📦 Active', '⏱ Delayed', '✅ Delivered', '🚫 Blocked'].map((status) => (
          <Grid key={status} size={{xs:12, sm:6, md:3}}>
            <StatsCard
              title={status}
              value={statusCounts[status] || 0}
              color={
                status === '📦 Active' ? 'primary' :
                status === '⏱ Delayed' ? 'warning' :
                status === '✅ Delivered' ? 'success' :
                'error'
              }
              trend={status === '🚫 Blocked' ? 'down' : 'up'}
              sparklineData={[8, 10, 12]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: 0 }}>
        <Grid size={{xs:12, md:7}} sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <ThreeDashboard shipments={shipments} selectedIds={selectedIds} />
          </Box>
        </Grid>
        <Grid size={{xs:12, md:5}} sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <FilterPanel onFilterChange={setFilters} />
          <Box mt={2} sx={{ flexGrow: 1, overflowY: 'auto', minHeight: 0 }}>
            <ShipmentTable
              rows={shipments.map(({ id, location, status, updatedAt }) => ({
                id: id.toString(),
                location,
                status,
                updatedAt,
              }))}
              loading={loading}
              onSelectionChange={(ids) => setSelectedIds(ids)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
