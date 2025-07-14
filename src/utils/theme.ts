import type { ThemeOptions } from '@mui/material/styles';

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#1e88e5' },
    secondary: { main: '#ff9800' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#ffb74d' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
};
