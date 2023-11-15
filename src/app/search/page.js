"use client";
// pages/search.js
import { useRouter } from "next/navigation"; // Corrected import
import { useEffect, useState } from "react";
import { Typography, Box, Pagination, Grid } from '@mui/material';
import HomeCard from '../../components/HomeCard';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Include necessary Firestore functions

const categories = [
    "Furniture",
    "Electronics",
    "School Supplies",
    "Home Decor",
    "Clothing and Accessories",
    "Appliances",
    "Bicycles and Transportation",
    "Textbooks",
    "Sports and Fitness Equipment",
    "Home Office",
    "Miscellaneous",
  ];

  const Search = () => {
    const router = useRouter(); // Corrected usage of useRouter
    const queryParam = router.query.query; // Get the search query from the URL
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 16;
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      if (queryParam) {
        setLoading(true);
        const db = getFirestore(); // Initialize Firestore
        const listingsRef = collection(db, "listings"); // Reference to the listings collection
        // Create a Firestore query
        const q = query(listingsRef, where("description", "==", queryParam)); // Adjust the field and condition as needed
  
        getDocs(q).then(querySnapshot => {
          const items = querySnapshot.docs.map(doc => doc.data());
          setResults(items);
          setLoading(false);
          console.log("Fetched Items: ", items); // Log the fetched items
        }).catch(error => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
      }
    }, [queryParam]);
  
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const paginatedResults = results.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
    if (loading) return <Typography>Loading...</Typography>;
  
  
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>
  
        {/* Render pagination control */}
        {results.length > 0 && (
          <Pagination
            count={Math.ceil(results.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{ marginY: 3 }}
          />
        )}
  
        {results.length > 0 ? (
          <Grid container spacing={2}>
            {paginatedResults.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <HomeCard
                  title={item.title}
                  location={item.location}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  status={item.status}
                  address={item.address}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No results found.</Typography>
        )}
  
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            See Recommended Items
          </Typography>
          {/* Here you would probably have a list or grid of recommended items */}  
        </Box>
  
        {/* Render pagination control again if needed */}
        {results.length > 0 && (
          <Pagination
            count={Math.ceil(results.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            sx={{ marginY: 3 }}
          />
        )}
      </Box>
    );
  };
  
  export default Search;