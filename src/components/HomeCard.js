import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function HomeCard() {
  return (
    <Box sx={{ width: '100%', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
      <Box sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px' }}>
        <img 
          src="https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=3487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Product" 
          width="100%" 
          height='250px' 
          style={{ borderRadius: '8px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', }}
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

export default HomeCard;
