"use client";

import React, { useState, useEffect } from 'react';
import { 
  Avatar, Alert, Button, Divider, Typography,
  Box, Grid, Tabs, Tab, Paper, CircularProgress 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../AuthProvider';
import { sendEmailVerification } from 'firebase/auth';
import { getUser } from '@/lib/firebaseUtils';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from "@mui/icons-material/School";
import MyListings from '../../../components/ProfileTabs/MyListings';
import Settings from '../../../components/ProfileTabs/Settings';
import FavoriteListings from '../../../components/ProfileTabs/FavoriteListings';

export default function Profile({ params }) {
  const [user, setUser] = useState();
  const [currentUserOwnsProfile, setCurrentUserOwnsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [heroImage, setHeroImage] = useState('https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog's visibility

  const defaultHeroImage = "https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg";

  const { getUser:getCurrentUser, isLoggedIn, isAdmin } = useAuth();
  const router = useRouter();

  const userId = params.id;

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const resendVerificationEmail = async () => {
    const currentUser = getCurrentUser();
    await sendEmailVerification(currentUser).catch(err => {
      console.error(err);
      setErrorMessage(err.message);
    });
  };

  // Get user data
  useEffect(() => {
    getUser(userId).then(userData => {
      if (!userData) {
        setUser(userData);
        setIsLoading(false);
        return;
      }

      if (userData.profileImage == "") {
        userData.profileImage = null;
      }
      if (userData.heroImage == "") {
        userData.heroImage = null;
      }
      userData['uid'] = userId;
      
      if (isLoggedIn()) {
        const currentUser = getCurrentUser();
        if (currentUser.uid == userId) {
          setCurrentUserOwnsProfile(true);
          
          if (currentUser.emailVerified
            && (currentUser.email.split('@').pop() == "calpoly.edu")
            && !userData.isStudent) {
              // Tell server to set user as student
              fetch(`/api/verify/${userId}`, {method: 'put'}).catch(err => {
                console.error(err);
                setErrorMessage(err.message);
              });
            }
        } else {
          isAdmin().then(admin => {
            if (admin) {
              setCurrentUserOwnsProfile(true);
            }
          }).catch(err => {
            console.error(err);
            setErrorMessage(err.message);
          })
        }
      }

      setUser(userData);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setErrorMessage(err.message);
    });
  }, []);

  if (!isLoading) {
    if (!user) {
      return <Typography>User not found!</Typography>;
    }

    if (user.name == "") {
      if (currentUserOwnsProfile) {
        // Send to profile setup page
        router.push(`/setup`);
        return;
      }
      
      return (
        <Typography>User has not set up their page yet!</Typography>
      )
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Hero Section */}
      {!isLoading &&
      <Paper
        elevation={1}
        sx={{ 
          width: '100%', 
          height: 300, 
          backgroundImage: user.heroImage ? `url(${user.heroImage})` : `url(${defaultHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      />}

      {/* Error Messages */}
      { errorMessage && (
          <Alert severity="error">
            {errorMessage}
          </Alert>
      )}

      {/* Profile Info */}
      {isLoading ? <CircularProgress /> :
      <Grid container spacing={2} alignItems="center" justifyContent="center" mt={3}>
        <Grid item>
          <Avatar alt="Profile Picture" src={user.profileImage} sx={{ width: 80, height: 80 }}>
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
        <Tab label="My Listings" />
        {currentUserOwnsProfile && <Tab label="Settings" />}
        {currentUserOwnsProfile && <Tab label="Favorites" />}
        {currentUserOwnsProfile && <Tab label="Purchase History" />}
      </Tabs>

      {/* My Listings Section - Only display if the My Listings tab is active */}
      {currentTab === 0 && !isLoading && <MyListings user={user} />}

      {/* Settings Section - Only display if the Settings tab is active */}
      {currentTab === 1 && !isLoading && <Settings user={user} setUser={setUser} setCurrentTab={setCurrentTab} />}

      {/* Favorite Listings Section - Only display if the Favorites tab is active */}
      {currentTab === 2 && !isLoading && <FavoriteListings user={user} />}
    </Box>
  );
}