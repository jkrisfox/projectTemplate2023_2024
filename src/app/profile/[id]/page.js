"use client";

import React, { useState, useEffect } from "react";
import {
  Avatar,
  Alert,
  Tooltip,
  Divider,
  Typography,
  Box,
  Grid,
  Tabs,
  Stack,
  Tab,
  Paper,
  CircularProgress,
  IconButton, // Import IconButton
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation"; 
import { useAuth } from "../../AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import { getUser } from "@/lib/firebaseUtils";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BanIcon from "@mui/icons-material/Block"; // Import the Ban icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete icon
import ReportIcon from "@mui/icons-material/Report"; // Import the Report icon
import ShareIcon from "@mui/icons-material/Share"; // Import the Share icon
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/CheckCircle"; // Make sure you have this imported if you're using a verified badge
import MyListings from "../../../components/ProfileTabs/MyListings";
import Settings from "../../../components/ProfileTabs/Settings";
import FavoriteListings from "../../../components/ProfileTabs/FavoriteListings";
import AdminPanel from "../../../components/ProfileTabs/AdminPanel"; // Assume you have a separate component for Admin functionalities

// AdminBadge component
const AdminBadge = () => (
  <Typography color="error" component="span">
    (Admin)
  </Typography>
);

export default function Profile({ params }) {
  const [user, setUser] = useState({ isAdmin: false, isStudent: false });
  const [currentUserOwnsProfile, setCurrentUserOwnsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [isAdminStatus, setIsAdminStatus] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [heroImage, setHeroImage] = useState(
    "https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog's visibility

  // Handlers for menu
  const handleClickMenu = (event) => {
    console.log(event.currentTarget); // This will log the element that was clicked
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const defaultHeroImage =
    "https://www.calpoly.edu/sites/calpoly.edu/files/inline-images/20210403-SpringScenics-JoeJ0020.jpg";

  const { getUser: getCurrentUser, isLoggedIn, isAdmin } = useAuth();
  const router = useRouter();

  const userId = params.id;

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setCurrentTab(newValue);
  };

  const resendVerificationEmail = async () => {
    const currentUser = getCurrentUser();
    await sendEmailVerification(currentUser).catch((err) => {
      console.error(err);
      setErrorMessage(err.message);
    });
  };

  // Get user data
  useEffect(() => {
    getUser(userId)
      .then((userData) => {
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
        userData["uid"] = userId;

        if (isLoggedIn()) {
          const currentUser = getCurrentUser();
          if (currentUser.uid == userId) {
            setCurrentUserOwnsProfile(true);

            if (
              currentUser.emailVerified &&
              currentUser.email.split("@").pop() == "calpoly.edu" &&
              !userData.isStudent
            ) {
              // Tell server to set user as student
              fetch(`/api/verify/${userId}`, { method: "put" }).catch((err) => {
                console.error(err);
                setErrorMessage(err.message);
              });
            }
          } else {
            isAdmin()
              .then((admin) => {
                if (admin) {
                  setCurrentUserOwnsProfile(true);
                }
              })
              .catch((err) => {
                console.error(err);
                setErrorMessage(err.message);
              });
          }
        }

        const checkAdminStatus = async () => {
          const adminStatus = await isAdmin();
          setIsAdminStatus(adminStatus);
        };

        if (isLoggedIn()) {
          checkAdminStatus();
        }

        console.log(userData);
        console.log(user);

        setUser(userData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });
  }, [isLoggedIn, isAdmin]);

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

      return <Typography>User has not set up their page yet!</Typography>;
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Hero Section */}
      {!isLoading && (
        <Box
          // elevation={1}
          sx={{
            width: "100%",
            height: 300,
            backgroundImage: user.heroImage
              ? `url(${user.heroImage})`
              : `url(${defaultHeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        />
      )}
      {/* Error Messages */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {/* Profile Info */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mt={3}
        >
          <Grid item>
            <Avatar
              alt="Profile Picture"
              src={user.profileImage}
              sx={{ width: 80, height: 80 }}
            >
              <PersonIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {user.name}
              {user.isVerified && <Tooltip title='The user is a verified student.'><VerifiedIcon color="primary" /></Tooltip>}
              {user.isAdmin && <AdminBadge />}{" "}
              {/* Display the Admin badge if user is an admin */}
            </Typography>
            <Stack direction="row">
              <Typography variant="subtitle1">Seller</Typography>
              <Tooltip title="User is a student">
                <Box pl={1}>{user.isStudent && <SchoolIcon />}</Box>
              </Tooltip>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={"auto"}>
            {/* User actions */}
            <IconButton aria-label="User Actions" onClick={handleClickMenu}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {/* {isAdminStatus && ( */}
                <>
                  <MenuItem
                    onClick={() => handleUserActions("ban")}
                    sx={{ color: "red" }}
                  >
                    <BanIcon /> Restrict User Actions
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleUserActions("delete")}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon /> Delete Account
                  </MenuItem>
                </>
              {/* )} */}
              <MenuItem onClick={() => handleUserActions("report")}>
                <ReportIcon /> Report User
              </MenuItem>
              <MenuItem onClick={() => handleUserActions("share")}>
                <ShareIcon /> Share Profile
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      )}
      <Divider sx={{ my: 2, width: "100%" }} />
      {/* Tabs */}
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="My Listings" />
        {currentUserOwnsProfile && <Tab label="Settings" />}
        {currentUserOwnsProfile && <Tab label="Favorites" />}
        {currentUserOwnsProfile && <Tab label="Purchase History" />}
        {currentUserOwnsProfile && <Tab label="Admin Panel" />}
      </Tabs>
      {/* Tab Content */}
      {currentTab === 0 && !isLoading && <MyListings user={user} />}
      {currentTab === 1 && !isLoading && currentUserOwnsProfile && (
        <Settings user={user} setUser={setUser} setCurrentTab={setCurrentTab} />
      )}
      {currentTab === 2 && !isLoading && currentUserOwnsProfile && (
        <FavoriteListings user={user} />
      )}
      {currentTab === 3 && !isLoading && currentUserOwnsProfile && (
        <div>Not implemented yet</div>
      )}
      {currentTab === 4 && !isLoading && currentUserOwnsProfile && (
        <AdminPanel user={user} />
      )}
    </Box>
  );
}
