// HomeSubAction.js
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid, Stack } from '@mui/material';

function HomeSubAction() {
  return (
    <Box
      sx={{
        padding: 3,
        margin: 8,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={8}>
          <Stack spacing={2}>
            <Typography variant="h6">
              Have items you want to get rid of?
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Turn your unwanted items into campus treasures on SLOMarket, the marketplace where 'out with the old' meets 'in with the new'.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="flex-end">
          <Button href='create-listing' variant="contained" color="primary" sx={{color:'white', width:'200px'}}>
            Start now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeSubAction;
