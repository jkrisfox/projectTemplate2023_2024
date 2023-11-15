// components/NewItems.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import HomeCard from "./HomeCard";
import { Box, Grid, Typography } from "@mui/material";

const NewItems = ({ isHomePage }) => {
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const fetchNewItems = async () => {
      const q = query(collection(db, "listings"), orderBy("createdAt", "desc"), limit(10));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setNewItems(items);
    };

    fetchNewItems();
  }, []);

  return (
    <Box p={3}>
      {/* Conditionally render the title only if it's not the home page */}
      {!isHomePage && (
        <Typography variant="h4" sx={{ marginBottom: 2, color: "#2B7257" }}>
        <strong>New Listings</strong>
      </Typography>
      )}
      <Grid container spacing={2}>
        {newItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.id}>
            <HomeCard
              title={item.title}
              location={item.location}
              price={item.price}
              imageUrl={(item.images && item.images[0]) || ""}
              // ... (add other props as needed)
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewItems;
