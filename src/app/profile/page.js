'use client'

import React, { useState } from 'react';
import { 
  Avatar, Button, Divider, List, ListItem, ListItemText, 
  ListItemAvatar, ListItemSecondaryAction, IconButton, Typography,
  Box, Grid, Tabs, Tab 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import MyListings from '../../components/MyListings';

export default function Profile() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Profile Info */}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Avatar alt="John Doe" src="/path/to/johndoe.jpg" sx={{ width: 80, height: 80 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            John Doe <VerifiedIcon color="primary" />
          </Typography>
          <Typography variant="subtitle1">
            Seller
          </Typography>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          {/* <IconButton color="primary">
            <EditIcon />
          </IconButton> */}
        </Grid>
      </Grid>
      <Divider sx={{ my: 2, width: '100%' }} />

      {/* Tabs */}
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Overview" />
        <Tab label="My Listings" />
        <Tab label="Settings" />
        <Tab label="Favorites" />
        <Tab label="Purchase History" />
      </Tabs>

      {/* My Listings Section - Only display if the My Listings tab is active */}
      {currentTab === 1 && <MyListings />}
    </Box>
  );
}
