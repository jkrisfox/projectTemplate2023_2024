'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const theme = createTheme({});

export default function LoginLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* This layout is specific to the login route and does not include the NavBar */}
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}
