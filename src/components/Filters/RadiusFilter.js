
// components/RadiusFilter.js

import React from 'react';
import { TextField } from '@mui/material';

const RadiusFilter = ({ value, onChange }) => {
  return (
    <TextField
      type="number"
      label="Radius (miles)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={{ mb: 2 }}
    />
  );
};

export default RadiusFilter;
