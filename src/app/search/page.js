"use client";

// pages/search.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import HomeCard from "../../components/HomeCard";
import NewItems from "../../components/NewItems";
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

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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
        // Adjusting to the database fields: 'description' and 'category'
        if (
          data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          matches.push({ id: doc.id, ...data });
        }
      });

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
        <Box>
          <Grid container spacing={2}>
            {/* Use slice for pagination */}
            {searchResults
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((result, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={result.id}>
                  <HomeCard
                    title={result.title} // Using the 'description' field as the title
                    location={`${result.location.latitude}, ${result.location.longitude}`} // Adjusted to handle the location object
                    price={result.price}
                    imageUrl={(result.images && result.images[0]) || ""} // Assuming you want to use the first image
                    // Removed status and address fields, add them back if they are available in your data structure
                  />
                </Grid>
              ))}
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
