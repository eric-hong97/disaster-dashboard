import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


type FilterPanelProps = {
  onFilterChange?: (filters: { status: string; priority: string }) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>('All');
  const [priority, setPriority] = useState<string>('All');

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
    onFilterChange?.({ status: event.target.value, priority });
  };

  const handlePriorityChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
    onFilterChange?.({ status, priority: event.target.value });
  };

  const handleReset = () => {
    setStatus('All');
    setPriority('All');
    onFilterChange?.({ status: 'All', priority: 'All' });
  };

  return (
    <Box 
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      gap={2}
      mb={{ xs: 1, sm: 2 }}
      px={{ xs: 1, sm: 0 }}
      >
      <FormControl size="small" sx={{ minWidth: 120, width: { xs: '100%', sm: 'auto' } }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={handleStatusChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Delayed">Delayed</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Blocked">Blocked</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120, width: { xs: '100%', sm: 'auto' } }}>
        <InputLabel>Priority</InputLabel>
        <Select value={priority} label="Priority" onChange={handlePriorityChange}>
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" size="small" sx={{ width: { xs: '100%', sm: 'auto' } }} onClick={handleReset}  startIcon={<RestartAltIcon />}>
        Reset
      </Button>
    </Box>
  );
};

export default FilterPanel;
