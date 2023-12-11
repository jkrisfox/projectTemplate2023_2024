import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  Chip,
  useTheme,
  Snackbar,
  Skeleton,
  Alert,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import copy from "copy-to-clipboard";
import moment from "moment"; // Import moment library
import { doc, deleteDoc } from "firebase/firestore";
import IconButton from "@mui/material/IconButton";
import { db } from "../../firebase/firebaseConfig";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import FlagIcon from "@mui/icons-material/Flag"; // For reporting
import FileCopyIcon from "@mui/icons-material/FileCopy";

import VisibilityIcon from "@mui/icons-material/Visibility"; // For tracking

function ListingCard({
  loading,
  listingId,
  title,
  createdAt,
  updatedAt,
  description,
  images,
  isFree,
  location,
  price,
  studentVerification,
  priceHistory,
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Additional state for the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  // State for snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  const handleBoxClick = () => {
    router.push(`/listing/${listingId}`);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handlers for menu
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCopyListingId = () => {
    // Copy the listingId to the clipboard
    copy(listingId);

    // Update snackbar message and open the snackbar
    setSnackbarMessage("Listing ID copied to clipboard.");
    setSnackbarOpen(true);

    // Close the menu
    handleCloseMenu();
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const listingRef = doc(db, "listings", listingId);
      await deleteDoc(listingRef);
      // Update snackbar message and open the snackbar
      setSnackbarMessage("Listing deleted successfully.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting listing: ", error);
      // Show error alert
      setSnackbarMessage("Failed to delete listing.");
      setSnackbarOpen(true);
    }
  };

  const handleReportListing = () => {
    // Logic for reporting the listing
    console.log("Listing reported");
    setSnackbarMessage("Listing reported successfully.");
    setSnackbarOpen(true);
    handleCloseMenu();
  };

  const handleTrackListing = () => {
    // Logic for tracking the listing
    console.log("Listing tracked");
    setSnackbarMessage("Listing tracked successfully.");
    setSnackbarOpen(true);
    handleCloseMenu();
  };

  const handleShareListing = () => {
    // Logic for sharing the listing
    console.log("Listing shared");
    setSnackbarMessage("Listing shared successfully.");
    setSnackbarOpen(true);
    handleCloseMenu();
  };

  // Simulated authentication and role check (replace with your auth logic)
  const isAuthenticated = true; // Replace with actual authentication check
  const isAdmin = true; // Replace with actual admin role check

  const firstImage =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "default-image-url";

  // Modify the formatDate function to accept a timestamp object with seconds and nanoseconds
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Unknown"; // Check for null, undefined, or incomplete timestamp
    // Convert seconds to milliseconds for moment (moment uses milliseconds)
    const date = new Date(timestamp.seconds * 1000);
    const formattedDate = moment(date).format("MM/DD/YYYY"); // Use moment to format the date
    return formattedDate !== "Invalid date" ? formattedDate : "Unknown"; // Check if the date is valid
  };

  const formatPriceHistory = (history) => {
    if (!Array.isArray(history)) {
      return "No price history available";
    }
    return history
      .map((entry) => `${entry.price} on ${formatDate(entry.date)}`)
      .join("\n");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatLocation = (locationString) => {
    // Directly return the location string as it only contains the city name
    return locationString;

    // const parts = locationString.split(", ");
    // return parts.length > 2 ? `${parts[1]}, ${parts[2]}` : locationString;
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: isMobile ? "100%" : 300,
          minHeight: "420px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          marginBottom: 2,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
        </Box>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 300,
        height: "460px", // This sets a constant height for the card
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        marginBottom: 2,
        flexDirection: "column",
        display: "flex",
        backgroundColor: "white",
      }}
    >
      {/* Row for the menu icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          // p: 1,
          // boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white", // Add background color if needed
        }}
      >
        <IconButton
          aria-label="settings"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClickMenu}
          sx={{ margin: "0 8px" }} // Add some margin if needed
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
        >
          {/* <MenuItem onClick={handleShareListing}>
            <ShareIcon fontSize="small" sx={{ marginRight: 1 }} /> Copy Link to
            Share
          </MenuItem> */}
          <MenuItem onClick={handleCopyListingId}>
            <FileCopyIcon fontSize="small" sx={{ marginRight: 1 }} /> Copy
            Listing ID
          </MenuItem>

          {isAuthenticated && isAdmin && (
            <MenuItem
              onClick={() => handleDeleteListing(listingId)}
              sx={{ color: red[500] }}
            >
              <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} /> Delete
              Listing
            </MenuItem>
          )}
          {/* Add the Report Listing menu item */}
          {/* <MenuItem onClick={handleReportListing}>
            <FlagIcon fontSize="small" sx={{ marginRight: 1 }} /> Report Listing
          </MenuItem> */}
          {/* Add the Track Listing menu item */}
          {/* <MenuItem onClick={handleTrackListing}>
            <VisibilityIcon fontSize="small" sx={{ marginRight: 1 }} /> Track
            Listing
          </MenuItem> */}
        </Menu>
      </Box>

      {/* Clickable content container */}
      <Box
        sx={{
          // p: 2,
          flexGrow: 1,
          cursor: "pointer",
        }}
        onClick={handleBoxClick}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            paddingTop: "56.25%" /* 16:9 aspect ratio */,
          }}
        >
          <img
            src={firstImage}
            alt={title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          />
        </Box>

        <Box
          sx={{ p: 2, flexGrow: 1 }}
          style={{
            backgroundColor: "white", // Add background color if needed
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap", // Prevent wrapping
              overflow: "hidden", // Prevent showing overflow
              textOverflow: "ellipsis", // Add ellipsis at the end
            }}
          >
            {title}
          </Typography>

          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
            {description}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {`Created: ${formatDate(createdAt) || "Not available"}`}
          </Typography>
          {updatedAt && (
            <Typography variant="caption" color="textSecondary">
              {/* {`Updated: ${formatDate(updatedAt) || "Not available"}`} */}
            </Typography>
          )}
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: 2,
            backgroundColor: "white", // Add background color if needed
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            {price === 0 ? (
              <Chip icon={<CheckCircleIcon />} label="Free" size="large" />
            ) : (
              `$${Number(price).toFixed(2)}` // Coerce price to a number before calling toFixed
            )}
          </Typography>
          {studentVerification && (
            <Badge
              badgeContent={<SchoolIcon color="primary" />}
              sx={{ mr: 4 }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box /> {/* Placeholder for badge */}
            </Badge>
          )}
        </Stack>

        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            backgroundColor: "white", // Add background color if needed
          }}
        >
          <LocationOnIcon fontSize="small" color="primary" />
          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
            {location}
          </Typography>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Price History</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formatPriceHistory(priceHistory)}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ListingCard;
