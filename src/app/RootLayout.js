"use client";
import React, { useState } from "react";
import Footer from "./Footer";
import Searchbar from "../components/Searchbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import localFont from "next/font/local";
import Link from "next/link";
import {
  AppBar,
  CssBaseline,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import AdbIcon from "@mui/icons-material/Adb";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Configure sans font
const sans = localFont({
  src: "../../public/fonts/PTSans-Regular.ttf", // Adjust the path to where you've stored your font files
  weight: "400",
  style: "normal",
});

export default function RootLayout({ children, title }) {
  const { isLoggedIn, getUser, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const router = useRouter();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfileClick = () => {
    handleMenuClose();
    const userId = getUser().uid;
    router.push(`/profile/${userId}`);
  }

  const renderMenu = () => (
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
      {isLoggedIn() ? (
        <>
          <MenuItem onClick={handleViewProfileClick}>
            View Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              signOut();
            }}
          >
            Log Out
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={Link} href="/Login" onClick={handleMenuClose}>
            Log In
          </MenuItem>
          <MenuItem component={Link} href="/Signup" onClick={handleMenuClose}>
            Sign Up
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const handleCreateListingClick = () => {
    if (isLoggedIn()) {
      router.push("/CreateListing");
    } else {
      router.push("/Signup");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <main className={sans.className}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <AdbIcon
                    sx={{
                      display: { xs: "none", md: "flex" },
                      mr: 1,
                      color: "white",
                    }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    {title}
                  </Typography>

                  <Box
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "flex" },
                      justifyContent: "center",
                    }}
                  >
                    <Searchbar />
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ mx: 4 }}
                      onClick={handleCreateListingClick}
                    >
                      <strong>Create Listing</strong>
                    </Button>
                    <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                      <AccountCircleIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                      <ArrowDropDownIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    </IconButton>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            {renderMenu()}
            <Box component="main">{children}</Box>
          </Box>
          {/* <Footer /> */}
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}
