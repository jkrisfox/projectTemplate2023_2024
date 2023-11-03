// Catalog.js
import React, { useState } from "react";
import { Box, Typography, Link, IconButton, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeCard from "./HomeCard";

function Catalog() {
  const categories = [
    "Furniture",
    "Electronics",
    "School Supplies",
    "Home Decor",
    "Clothing and Accessories",
    "Appliances",
    "Bicycles and Transportation",
    "Textbooks",
    "Sports and Fitness Equipment",
    "Home Office",
    "Miscellaneous",
  ];

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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Available now on the platform
      </Typography>
      {categories.map((category, index) => (
        <Link key={index} href="#" sx={{ marginRight: 2, cursor: "pointer" }}>
          {category}
        </Link>
      ))}
      <Grid container spacing={3} sx={{ marginTop: 3, position: "relative" }}>
        {Array.from({ length: 4 }, (_, index) => startIdx + index).map(
          (index) => (
            <Grid item xs={3} key={index}>
              {/* Render the HomeCard here */}
              <HomeCard />
            </Grid>
          )
        )}
        {/* Move the arrow button to the rightmost part of the row */}
        <IconButton 
    sx={{ 
        position: 'absolute', 
        top: '50%', 
        right: 0, 
        transform: 'translateY(-50%)', 
        backgroundColor: 'white',
        borderRadius: '50%',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            backgroundColor: '#4FB18C',
            // Optional: Change icon color on hover
            '& .MuiSvgIcon-root': {
                color: 'white'
            }
        }
    }} 
    onClick={handleNextClick}>
    <ArrowForwardIosIcon />
</IconButton>

      </Grid>
    </Box>
  );
}

export default Catalog;
