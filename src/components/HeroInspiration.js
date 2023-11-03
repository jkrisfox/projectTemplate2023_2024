// HeroInspiration.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';

function HeroInspiration() {
  return (
    <Box 
      sx={{
        position: 'relative',
        height: '400px',
      }}
    >
      <Box 
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1578422558405-bd41637e2f41?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          position: 'absolute',
          width: '100%',
          zIndex: -1,
          opacity: 0.7,
          filter: 'brightness(0.5)'
        }}
      ></Box>

      <Box 
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 3,
          color: '#ffffff',
        }}
      >
        <Typography variant="overline" sx={{ fontWeight: 'bold' }}>OUR MISSION</Typography>

        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Clean up clutter, connect with your{' '}
          <span sx={{ color: '#4caf50' }}>Cal Poly</span> community, and contribute to a 
          greener world on SLOMarket, where sustainable swaps build a brighter future.
        </Typography>

        <Box sx={{ alignSelf: 'flex-end', mt: 2 }}>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: 'primary.main',
              color: 'white'
            }}
          >
            Start Selling
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroInspiration;
