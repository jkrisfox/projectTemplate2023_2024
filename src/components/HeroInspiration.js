import React from 'react';
import { Typography, Button, Box } from '@mui/material';

function HeroInspiration() {
  return (
    <Box 
      sx={{
        position: 'relative',
        height: '600px',
        backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(https://images.unsplash.com/photo-1578422558405-bd41637e2f41?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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

        <Typography variant="h2" width='70%' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Clean up clutter, connect with your{' '}
          <span style={{ color: '#4FB18C' }}>Cal Poly</span> community, and contribute to a 
          greener world on SLOMarket, where sustainable swaps build a brighter future.
        </Typography>

        <Box sx={{ alignSelf: 'flex-end', mt: 2 }}>
          <Button 
            href="create-listing"
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
