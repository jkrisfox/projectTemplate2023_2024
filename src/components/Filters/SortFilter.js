
// components/SortFilter.js

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortFilter = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
      <InputLabel>Sort By</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Sort By"
      >
        <MenuItem value="priceLowest">Price: Lowest First</MenuItem>
        <MenuItem value="priceHighest">Price: Highest First</MenuItem>
        <MenuItem value="newest">Newly Listed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortFilter;
