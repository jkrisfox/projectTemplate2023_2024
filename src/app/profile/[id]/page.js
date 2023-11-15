'use client'

import React, { useCallback, useState, useEffect } from 'react';
import { 
  Avatar, Button, Divider, IconButton, Typography,
  Box, Grid, Tabs, Tab, Paper, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress 
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';
import MyListings from '../../../components/MyListings';
import Settings from '../../../components/Settings';

export default function Profile({ params }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [heroImage, setHeroImage] = useState('https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog's visibility

  const defaultHeroImage = "https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg";

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

  const userId = parseInt(params.id);

  // Get user data
  useEffect(() => {
    fetch(`/api/users/${userId}`, { method: "get" }).then((response) => response.ok && response.json()).then(
      userData => {
        setUser(userData);
        setIsLoading(false);
      }
    );
  }, []);

  if (!isLoading) {
    if (!user) {
      return (
        <Typography>User not found!</Typography>
      )
    }

    if (!user.name) {
      return (
        <Typography>User has not set up their page yet!</Typography>
      )
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Hero Section */}
      {!isLoading &&
      <Paper
        elevation={1}
        sx={{ 
          width: '100%', 
          height: 300, 
          backgroundImage: user.heroImageName ? `url(http://slomarket.shnibl.com:5000/${user.heroImageName})` : `url(${defaultHeroImage})`,
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
      </Paper>}

      {/* Profile Info */}
      {isLoading ? <CircularProgress /> :
      <Grid container spacing={2} alignItems="center" justifyContent="center" mt={3}>
        <Grid item>
          <Avatar alt="Profile Picture" src={user.profileImageName && `http://slomarket.shnibl.com:5000/${user.profileImageName}`} sx={{ width: 80, height: 80 }}>
            <PersonIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            {user.name} {user.isVerified && <VerifiedIcon color="primary" />}
          </Typography>
          <Typography variant="subtitle1">
            Seller
          </Typography>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          {/* Other buttons/actions for profile can be added here */}
        </Grid>
      </Grid>}
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

      {/* Settings Section - Only display if the Settings tab is active */}
      {currentTab === 2 && <Settings />}


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
