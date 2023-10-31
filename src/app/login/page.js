'use client'

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Link, Checkbox, FormControlLabel } from '@mui/material';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

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
              <Typography variant="h5" gutterBottom sx={{ marginBottom: '60px' }}>
                {isRegistering ? "Register Account" : "Welcome back!"}
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label={<Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Remember 30 days</Typography>}
                />
                <Link href="#" variant="body2" sx={{ fontSize: '0.8rem', alignSelf: 'center' }}>Forgot password?</Link>
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ borderRadius: 2 }}>
                {isRegistering ? "Create Account" : "Log in"}
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                fullWidth 
                sx={{ borderRadius: 2, marginTop: 2 }}
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "Back to Login" : "Register"}
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
