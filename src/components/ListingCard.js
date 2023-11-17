import React, { useState } from "react";
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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment"; // Import moment library

function ListingCard({
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

  const firstImage =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "default-image-url";

  // Explicitly parse the date string in ISO 8601 format
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"; // Handle null, undefined, or empty strings
    const formattedDate = moment(dateString, moment.ISO_8601).format(
      "MM/DD/YYYY"
    ); // Use moment to format the date
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
    const parts = locationString.split(", ");
    return parts.length > 2 ? `${parts[1]}, ${parts[2]}` : locationString;
  };

  return (
    <Box
      sx={{
        width: 300, // Set a fixed width
        height: 420, // Set a fixed height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // This will make the card contents spaced evenly
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        marginBottom: 2,
      }}
      onClick={() => {
        /* navigate to main listings page */
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 0,
          paddingTop: "56.25%", // 16:9 aspect ratio
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
          }}
        />
      </Box>

      <Box sx={{ padding: 2, flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          sx={{ marginBottom: 1 }}
        >
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
            {`Updated: ${formatDate(updatedAt) || "Not available"}`}
          </Typography>
        )}
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingLeft: 2 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          {price === 0 ? (
            <Chip
              icon={<CheckCircleIcon />}
              label="Free"
              size="large"
            />
          ) : (
            `$${Number(price).toFixed(2)}` // Coerce price to a number before calling toFixed
          )}
        </Typography>

        {studentVerification && (
          <Badge
            badgeContent={<SchoolIcon color="primary" />}
            sx={{ marginRight: 4 }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* This empty Box acts as a placeholder for the badge to position the SchoolIcon */}
            <Box />
          </Badge>
        )}
      </Stack>

      <Box sx={{ padding: 2, display: "flex", alignItems: "center" }}>
        <LocationOnIcon fontSize="small" color="primary" />
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ marginLeft: 1 }}
        >
          {formatLocation(location)}
        </Typography>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Price History</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {formatPriceHistory(priceHistory)}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ListingCard;
