// components/HomeCardDemo.js
import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function HomeCardDemo() {
  return (
    <Box sx={{
      width: '100%', // Responsive width
      borderRadius: '8px', 
      overflow: 'hidden', 
      cursor: 'pointer', 
      // boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // subtle shadow
    }}>
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '56.25%', // 16:9 aspect ratio
        }}>
        <img 
          src="https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=3487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Product" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', // This ensures the image covers the area without stretching
            borderRadius: '8px', // Rounded corners only at the top
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
          }}
        />
      </Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">White meeting chair</Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: 1 }}>ATASCADERO</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>$30</Typography>
        <Badge color="success" overlap="circular" sx={{ marginRight: 1 }}>
          <Typography variant="caption">AVAILABLE FOR PICKUP</Typography>
        </Badge>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
          <LocationOnIcon fontSize="small" color="primary" />
          <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 1 }}>1632 Foreman Ct</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HomeCardDemo;
