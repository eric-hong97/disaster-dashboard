// === STARTING COMPONENT: App.tsx ===

import { useMemo, useState } from 'react';
import { CssBaseline, Container, Box, Typography, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Dashboard from './pages/Dashboard';
import { lightTheme, darkTheme } from './utils/theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => createTheme(mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box py={4} sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Disaster Response 3D — Supply Chain Tracker
            </Typography>
            <IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Dashboard />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
