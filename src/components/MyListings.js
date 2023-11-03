import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Grid,
  IconButton,
  Box,
  Stack,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MyListings() {
  // This can be your data fetched from an API
  const listings = [
    { title: "AirPods Max", description: "Listing for free!" },
    { title: "AirPods Max", description: "Listing for free!" },
    { title: "AirPods Max", description: "Listing for free!" },
    { title: "AirPods Max", description: "Listing for free!" },
    // ... add more listings as needed
  ];

  return (
    <Box px={3} py={2}>
      <Grid container spacing={3} justifyContent="center" pt={6}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography variant="h5" gutterBottom align="center">
            My Listings
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button variant="contained" color="primary" sx={{color:'white'}} fullWidth>
            List An Item
          </Button>
        </Grid>
      </Grid>

      {/* Listing Section */}
      <Grid container spacing={4} justifyContent="center" pt={12}>
        {listings.map((listing, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper elevation={3}>
              <Card sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="/path/to/airpods.jpg"
                  alt="Customer picture"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      AirPods Max
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      $400
                    </Typography>
                    <Stack direction="column" spacing={2} pt={4}>
                      <Button variant="contained" color="primary" sx={{color:'white'}}>
                        LABEL
                      </Button>
                      <Button variant="contained" color="primary" sx={{color:'white'}}>
                        LABEL
                      </Button>
                    </Stack>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  ></Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
