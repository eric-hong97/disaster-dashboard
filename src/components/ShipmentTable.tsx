import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
// import { formatDistanceToNow } from 'date-fns';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'location', headerName: 'Location', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => {
      const status = params.value;
      let color: 'default' | 'primary' | 'success' | 'warning' | 'error' = 'default';
      switch (status) {
        case 'Active': color = 'primary'; break;
        case 'Delayed': color = 'warning'; break;
        case 'Delivered': color = 'success'; break;
        case 'Blocked': color = 'error'; break;
        default: color = 'default';
      }
      return <Chip label={status} color={color} size="small" />;
    },
  },
  {
    field: 'updatedAt',
    headerName: 'Last Updated',
    width: 130,
    sortable: true,
    renderCell: (params) => {
      const date = new Date(params.value);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
  
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMinutes / 60);
      const remainingMinutes = diffMinutes % 60;
  
      if (diffMinutes < 1) return <span>Just now</span>;
  
      return (
        <span>
          {diffHours > 0 ? `${diffHours}h ` : ''}
          {remainingMinutes > 0 ? `${remainingMinutes}m` : ''}
        </span>
      );
    },
  },
  
];



type Props = {
  rows: { id: string; location: string; status: string; updatedAt: string }[]; // updatedAt as ISO string
  loading?: boolean;
  onSelectionChange?: (ids: string[]) => void;
};


export default function ShipmentTable({ rows, loading, onSelectionChange }: Props) {
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(selection) => {
          let selectedIds: string[] = [];
        
          if (Array.isArray(selection)) {
            selectedIds = selection.map(String);
          } else if (typeof selection === 'object' && selection?.ids) {
            selectedIds = Array.from(selection.ids).map(String);
          }
        
          // console.log('| Step 1 | Correct Selected IDs:', selectedIds);
          onSelectionChange?.(selectedIds);
        }}
        
        
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[5, 10]}
        loading={loading}
      />
    </div>
  );
}
