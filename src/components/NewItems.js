// components/NewItems.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ListingCard from "./ListingCard";
import { Box, Grid, Typography } from "@mui/material";

const NewItems = ({ isHomePage }) => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNewItems = async () => {
      setIsLoading(true);
      const q = query(
        collection(db, "listings"),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setNewItems(items);
      setIsLoading(false);
    };

    fetchNewItems();
  }, []);

  return (
    <Box p={3}>
      {!isHomePage && (
        <Typography variant="h4" sx={{ marginBottom: 2, color: "#2B7257" }}>
          <strong>New Listings</strong>
        </Typography>
      )}
      <Grid container spacing={2}>
        {newItems.map((item) => {
          // const locationArray = item.location.split(", ");
          // const cityState =
          //   locationArray.length > 2
          //     ? `${locationArray[1]}, ${locationArray[2]}`
          //     : item.location;

          return (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={2.4} key={item.id} >
              <ListingCard
                loading={isLoading}
                listingId={item.id}
                id={item.id}
                title={item.title}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                description={item.description}
                images={item.images}
                location={item.location}          
                      price={item.price}
                studentVerification={item.studentVerification}
                priceHistory={item.priceHistory}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default NewItems;
