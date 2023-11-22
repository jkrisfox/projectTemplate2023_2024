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
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo from "../../public/logo.svg";

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
  };

  const renderMenu = () => (
    <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
      {isLoggedIn() ? (
        <div>
          <MenuItem onClick={handleViewProfileClick}>View Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              signOut();
            }}
          >
            Log Out
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem component={Link} href="/Login" onClick={handleMenuClose}>
            Log In
          </MenuItem>
          <MenuItem component={Link} href="/Signup" onClick={handleMenuClose}>
            Sign Up
          </MenuItem>
        </div>
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
                <Toolbar
                  disableGutters
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Link
                      href="/"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        style={{ height: "40px", marginRight: "10px" }} // Adjust the height as needed
                      />
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                          mr: 2,
                          display: { xs: "flex", md: "flex" },
                          fontFamily: "monospace",
                          fontWeight: 700,
                          letterSpacing: ".1rem",
                          color: "white",
                          textDecoration: "none",
                          lineHeight: "inherit", // Adjust the line height to align with the logo
                        }}
                      >
                        {title}
                      </Typography>
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: { md: "center" },
                    }}
                  >
                    <Searchbar
                      sx={{
                        width: {
                          xs: "calc(100% - 120px)",
                          sm: "60%",
                          md: "40%",
                        }, // Adjust the width calculation to prevent overlap
                        // mx: { xs: 1, sm: 2 },
                      }}
                    />
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        mx: 2, // Reduced margin
                        display: { xs: "none", sm: "inline-flex" }, // Hide on xs, show on sm and above
                        maxWidth: { xs: "100px", sm: "none" },
                      }}
                      onClick={handleCreateListingClick}
                    >
                      <strong>Create Listing</strong>
                    </Button>

                    <IconButton
                      color="inherit"
                      onClick={handleProfileMenuOpen}
                      sx={{
                        p: { xs: 0, sm: 1 }, // Adjust padding
                      }}
                    >
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
          <Footer />
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}
