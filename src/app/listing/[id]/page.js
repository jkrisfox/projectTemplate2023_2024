"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Breadcrumbs,
  Link,
  Card,
  CardMedia,
  CardContent,
  IconButton
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import ShareIcon from "@mui/icons-material/Share";
import { db } from "../../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GoogleMapReact from 'google-map-react';

// Virtualized SwipeableViews for better performance
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(0);

  // ... existing loading and error handling

  // Function to handle image selection
  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  // Google Maps settings
  // const mapOptions = {
  //   center: {
  //     lat: listing.location.lat, // Assuming 'location' contains 'lat' and 'lng'
  //     lng: listing.location.lng,
  //   },
  //   zoom: 11,
  // };

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "listings", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setListing({ id: docSnap.id, ...docSnap.data() });
          } else {
            setError("Listing not found");
          }
        } catch (err) {
          setError("An error occurred while fetching the listing");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchListing();
    }
  }, [id]);

  // Function to render slide
  const renderSlide = ({ index, key }) => {
    return (
      <img
        key={key}
        src={listing.images[index]}
        alt={`${listing.title} - image ${index + 1}`}
        style={{ width: "100%", height: "auto" }}
      />
    );
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  if (!listing) {
    return null;
  }

  return (
    <Box sx={{ padding: 10 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">{listing.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          {listing.title}
        </Typography>

        {listing.images && listing.images.length > 0 && (
          // This is used for efficient rendering of large sets of images.
          <VirtualizeSwipeableViews slideRenderer={renderSlide} />
        )}

        <Typography variant="body1" gutterBottom>
          {listing.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: ${listing.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Location: {listing.location}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<LocationOnIcon />}
            onClick={() => {
              /* Implement Map View */
            }}
          >
            View on Map
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={() => {
              /* Implement Share Functionality */
            }}
          >
            Share
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ListingPage;
