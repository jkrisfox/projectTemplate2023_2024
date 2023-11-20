
// components/VerifiedFilter.js

import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const VerifiedFilter = ({ checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label="Verified User Only"
    />
  );
};

export default VerifiedFilter;
