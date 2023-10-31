'use client'

import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';

export default function LoginPage() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#333',
    }}>
      <Card sx={{ width: '70%', height: 650, borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Box sx={{
            flex: '1 1 50%',
            height: '100%', 
            backgroundImage: 'url("/images/CalPolyComplete.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <CardContent sx={{ flex: '1 1 50%', padding: '80px 120px', height: '100%' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
              <Typography variant="h4" gutterBottom sx={{ marginBottom: '60px' }}>
                Welcome back!
              </Typography>
              <TextField
                label="Cal Poly email"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>
                <Typography variant="body2">Remember 30 days</Typography>
                <Link href="#" variant="body2">Forgot password?</Link>
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 2 }}>
                Log in
              </Button>
              <Button variant="outlined" color="primary" fullWidth sx={{ borderRadius: 2, marginTop: 2 }}>
                Register
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
