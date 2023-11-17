// Catalog.js
import React, { useState } from "react";
import { Box, Typography, Link, IconButton, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeCard from "./HomeCardDemo";
import Categories from "./Categories"; // Import the Categories compone
import NewItems from "./NewItems"; // Import the Categories compone

function Catalog() {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(3); // New state for end index

  const handleNextClick = () => {
    // Update the starting and ending indices to show the next set of cards
    const newStartIdx = startIdx + 1;
    const newEndIdx = endIdx + 1;

    setStartIdx(newStartIdx);
    setEndIdx(newEndIdx);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" sx={{ marginBottom: 2, color: "#2B7257" }}>
        <strong>Available now on the platform</strong>
      </Typography>
      {/* Use the Categories component */}
      <Categories />
      <Grid container spacing={3} sx={{ marginTop: 3, position: "relative" }}>
          <NewItems isHomePage={true} />
      </Grid>
    </Box>
  );
}

export default Catalog;
