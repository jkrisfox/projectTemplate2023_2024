"use client";

// pages/search.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import ListingCard from "../../components/ListingCard";
import NewItems from "../../components/NewItems";
import FilterComponent from "../../components/FilterComponent";
import Categories from "../../components/Categories";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Stack,
  Pagination,
  Button,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Helper function to calculate distance between two coordinates
function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    sort: "",
    radius: 5,
    verified: false,
  });
  const itemsPerPage = 20;

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    console.log("Search query:", searchQuery);
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchParams]); // Only re-run the effect if searchParams changes

  const performSearch = async (searchTerm) => {
    console.log("Searching");
    setLoading(true);

    try {
      const listingsRef = collection(db, "listings");
      let matches = [];

      const querySnapshot = await getDocs(listingsRef);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Apply filters here
        if (passesFilters(data, searchTerm)) {
          matches.push({ id: doc.id, ...data });
        }
      });

      // Sort and filter based on additional criteria
      matches = applyAdditionalFilters(matches);

      console.log(matches);
      setSearchResults(matches);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }

    setLoading(false);
  };

  // Pagination change handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // performSearch should be modified to take into account pagination
  };

  // Add a function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    performSearch(searchParams.get("query"));
  };

  const passesFilters = (data, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchMatch =
      data.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      data.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      data.title.toLowerCase().includes(lowerCaseSearchTerm); // Added title check

    const verifiedMatch =
      !filters.verified || (filters.verified && data.studentVerification);

    // Implement location-based matching if necessary
    const locationMatch = true;

    return searchMatch && verifiedMatch && locationMatch;
  };
  const applyAdditionalFilters = (results) => {
    // Sort by price
    if (filters.sort === "priceLowest") {
      results.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters.sort === "priceHighest") {
      results.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    // Sort by date if 'newest' is selected
    if (filters.sort === "newest") {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Apply radius-based filtering if location and radius are available and radius is set
    if (filters.userLocation && filters.radius) {
      results = results.filter((item) => {
        const distance = getDistanceFromLatLonInMiles(
          filters.userLocation.latitude,
          filters.userLocation.longitude,
          item.location.latitude, // Assuming item has a location object with latitude and longitude
          item.location.longitude
        );
        return distance <= parseFloat(filters.radius);
      });
    }

    return results;
  };
  const renderSearchResults = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      );
    } else if (searchResults.length === 0) {
      return (
        <Box textAlign="center" p={30}>
          <Typography variant="h5" gutterBottom>
            No listings for "{searchParams.get("query")}". Make one from here!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              /* Implement navigation to listing creation page */
            }}
          >
            Create Listing
          </Button>
        </Box>
      );
    } else {
      return (
        <Box p={0}>
          <Grid container spacing={2}>
            {searchResults
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((result, index) => {
                // Extract city and state from the location string
                const locationArray = result.location.split(", ");
                const cityState = `${locationArray[1]}, ${locationArray[2]}`;

                return (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={3}
                    xl={2.4}
                    key={result.id}
                  >
                    <ListingCard
                      id={result.id}
                      loading={loading}
                      listingId={result.id}
                      title={result.title}
                      createdAt={result.createdAt}
                      updatedAt={result.updatedAt}
                      description={result.description}
                      images={result.images} // images is an array of URLs
                      location={cityState} // city and state extracted from location string
                      price={result.price}
                      studentVerification={result.studentVerification}
                      priceHistory={result.priceHistory} // priceHistory is an array of objects with date and price
                    />
                  </Grid>
                );
              })}
          </Grid>
          {/* Pagination control */}
          <Stack spacing={2} alignItems="center" marginY={5}>
            <Pagination
              count={Math.ceil(searchResults.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      );
    }
  };

  return (
    <Box p={3}>
      <FilterComponent onFilterChange={handleFilterChange} />
      <Categories />
      <Typography variant="h4" sx={{ marginBottom: 2, color: "#2B7257" }}>
        <strong>Searching for: {searchParams.get("query")}</strong>
      </Typography>
      {renderSearchResults()}
      <NewItems />
    </Box>
  );
};

export default SearchPage;
