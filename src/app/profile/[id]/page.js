'use client'

import React, { useCallback, useState } from 'react';
import { 
  Avatar, Button, Divider, List, ListItem, ListItemText, 
  ListItemAvatar, ListItemSecondaryAction, IconButton, Typography,
  Box, Grid, Tabs, Tab, Paper, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';
import MyListings from '../../../components/MyListings';

export default function Profile() {
  const [currentTab, setCurrentTab] = useState(0);
  const [heroImage, setHeroImage] = useState('/path/to/default-hero-image.jpg'); // Use default image for now
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog's visibility

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setHeroImage(objectUrl); // Set the uploaded image as the hero image
    setIsDialogOpen(false); // Close the dialog
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'image/*'
  });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleChangeHero = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Hero Section */}
      <Paper 
        elevation={1}
        sx={{ 
          width: '100%', 
          height: 300, 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <IconButton 
          onClick={handleChangeHero}
          color="white"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Paper>


      {/* Profile Info */}
      <Grid container spacing={2} alignItems="center" justifyContent="center" mt={3}>
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
          {/* Other buttons/actions for profile can be added here */}
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

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Change Hero Image"}</DialogTitle>
        <DialogContent>
          <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '20px', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <Typography variant="body1">Drag & drop an image here, or click to select one</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
