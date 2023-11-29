// components/FilterComponent.js

import React, { useState, useEffect } from "react";
import { Stack, Button, Snackbar, Alert, TextField } from "@mui/material";
import SortFilter from "./Filters/SortFilter";
import VerifiedFilter from "./Filters/VerifiedFilter";

const FilterComponent = ({ onFilterChange }) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [radius, setRadius] = useState("");
  const [verified, setVerified] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (radius !== "") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, [radius]); // Fetch location when radius is interacted with

  const applyFilters = () => {
    if (radius !== "" && !userLocation) {
      alert("Location is not available.");
      return;
    }

    onFilterChange({
      sort: selectedSort,
      radius: radius !== "" ? radius : null,
      verified: verified,
      userLocation: radius !== "" ? userLocation : null,
    });
    setOpenAlert(true);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  return (
    <Stack
      direction="row"
      spacing={3}
      display="flex"
      flexDirection="row"
      p={2}
      alignItems="center"
    >
      <SortFilter value={selectedSort} onChange={setSelectedSort} />
      <TextField
        type="number"
        label="Radius (miles)"
        value={radius}
        onChange={handleRadiusChange}
        variant="outlined"
        sx={{
          mb: 2,
          width: "150px",
          ...(radius !== "" && { color: "primary.main" }),
        }}
        placeholder="Enter radius"
      />
      <VerifiedFilter checked={verified} onChange={setVerified} />
      <Button
        onClick={applyFilters}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Apply Filters
      </Button>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Filters applied successfully!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default FilterComponent;

// components/SortFilter.js
// components/RadiusFilter.js
// components/VerifiedFilter.js
