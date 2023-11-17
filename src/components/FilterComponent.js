// components/FilterComponent.js

import React, { useState } from "react";
import { Stack, Box, Button, Snackbar, Alert } from "@mui/material";
import SortFilter from './Filters/SortFilter';
import RadiusFilter from './Filters/RadiusFilter';
import VerifiedFilter from './Filters/VerifiedFilter';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedSort, setSelectedSort] = useState('');
  const [radius, setRadius] = useState(5);
  const [verified, setVerified] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const applyFilters = () => {
    onFilterChange({
      sort: selectedSort,
      radius: radius,
      verified: verified,
    });
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Stack direction='row' spacing={3} display="flex" flexDirection="row" p={2} alignItems="center">
      <SortFilter value={selectedSort} onChange={setSelectedSort} />
      <RadiusFilter value={radius} onChange={setRadius} />
      <VerifiedFilter checked={verified} onChange={setVerified} />
      <Button onClick={applyFilters} variant="contained" color="primary" sx={{ mt: 2 }}>
        Apply Filters
      </Button>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
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
