"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Login from "./Login";
import Searchbar from "../components/Searchbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./Signup";
import { useSession } from "next-auth/react";
import { Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { usePathname } from "next/navigation";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const theme = createTheme({
  palette: {
    nav: {
      main: "#FFFFFF",
    },
    primary: {
      main: "#4FB18C",
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#black",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function RootLayout({ children, title }) {
  const pathname = usePathname(); // Use the hook here

  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [authUser, setAuthUser] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  let loginSection;

  if (authUser) {
    loginSection = (
      <Button
        variant="outlined"
        color="nav"
        sx={{ color: "white" }}
        onClick={() => userSignOut()}
      >
        Sign Out
      </Button>
    );
  } else {
    loginSection = (
      <>
        <Login />
        <Signup />
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon
                sx={{
                  display: { xs: "none", md: "flex", color: "white" },
                  mr: 1,
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
              <Box width="400px">
                <Searchbar />
              </Box>
              <NavBar />
              <Box pr={6}>
                <IconButton color="inherit">
                  <FavoriteIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircleIcon sx={{ color: "white" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                >
                  <Link
                    href="/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem component="a" onClick={handleMenuClose}>
                      View Profile
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      signOut();
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Stack direction="row" spacing={2}>
                  {loginSection}
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 0, height: "100vh" }}>
        {children}
      </Box>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}
