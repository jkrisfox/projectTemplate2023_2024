"use client";
// pages/search.js
import { useRouter, useSearchParams  } from "next/navigation"; // correct the import for useRouter
import { useEffect, useState } from "react";
import { Typography, Box, Pagination, Grid } from '@mui/material';
import HomeCard from '../../components/HomeCard';

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

// A hook to simulate search results
const useSearchResults = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data); // Assuming your API returns the data in the format that your component expects
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [query]);

  return { results, loading };
};

const Search = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('query'); // get the search query from the URL
    const { results, loading } = useSearchResults(query);
    const itemsPerPage = 16;
    const [page, setPage] = useState(1);
  
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