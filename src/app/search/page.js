"use client";
// pages/search.js
import { useRouter, useSearchParams  } from "next/navigation"; // correct the import for useRouter
import { useEffect, useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Link } from "@mui/material";

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
  
    if (loading) return <Typography>Loading...</Typography>;
  
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>

        {categories.map((category, index) => (
        <Link key={index} href="#" sx={{ marginRight: 2, cursor: "pointer" }}>
          {category}
        </Link>
      ))}

        {results.length > 0 ? (
          <List>
            {results.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No results found.</Typography>
        )}
      </Box>
    );
  };
  
  export default Search;