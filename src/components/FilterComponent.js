// components/FilterComponent.js

import React, { useState } from "react";
import { FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, Box, Button, TextField } from "@mui/material";

const FilterComponent = ({ onFilterChange }) => {
  const [selectedSort, setSelectedSort] = useState('');
  const [radius, setRadius] = useState(5);
  const [verified, setVerified] = useState(false);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleVerifiedChange = (event) => {
    setVerified(event.target.checked);
  };

  const applyFilters = () => {
    onFilterChange({
      sort: selectedSort,
      radius: radius,
      verified: verified,
    });
  };

  return (
    <Box display="flex" flexDirection="column" p={2}>
      <FormControl variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={selectedSort}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="priceLowest">Price: Lowest First</MenuItem>
          <MenuItem value="priceHighest">Price: Highest First</MenuItem>
          <MenuItem value="newest">Newly Listed</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Radius (miles)"
        value={radius}
        onChange={handleRadiusChange}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={verified}
            onChange={handleVerifiedChange}
          />
        }
        label="Verified User Only"
      />
      <Button onClick={applyFilters} variant="contained" color="primary">
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterComponent;
