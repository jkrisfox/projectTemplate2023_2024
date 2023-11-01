'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar';
import Login from './Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signup from './Signup';
import { useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import { signOut } from "next-auth/react";
import './globals.css';

const theme = createTheme({});

export default function RootLayout({ children, title }) {

  const { data: session, status }  = useSession();

  let loginSection;

  if (status === 'authenticated') {
    loginSection = <Button variant="outlined" color="inherit" onClick={() => signOut()}>Sign Out</Button>;
  } else {
    loginSection = <>
      <Login/>
      <Signup/>
    </>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar className="fullNav" position="static">
          <Container maxWidth="xl">
          
            <Toolbar disableGutters>
              
              <Typography variant="h5" component="a" href="/" className="title-text">
              Stronger<br />Together
              </Typography>
              <Typography variant="h6" component="a" href="/" className="slogan-text">
              Lift, Laugh, Love
              </Typography>

              <NavBar />
      
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }} className="main-content">
        {children}
      </Box>
    </ThemeProvider>
  );
}

/*
<Box sx={{ flexGrow: 0 }}>
                <Stack direction='column' spacing={2}>
                  {loginSection}
                </Stack>
              </Box>
*/