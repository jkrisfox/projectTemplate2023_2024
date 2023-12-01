import React, { useEffect, useState } from "react";
import { Grid, Box, Stack, Typography, Pagination } from "@mui/material";
import ListingCard from "../ListingCard";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

import NoListingsImage from "/public/illustrations/standing-19.svg"; // Update the path if necessary

export default function MyListings({ user }) {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // Pagination change handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchListings = async () => {
      const q = query(
        collection(db, "listings"),
        where("sellerId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setListings(items);
    };

    fetchListings();
  }, []);

  return (
    <Box px={3} py={2}>
      {listings.length === 0 ? (
        // Display illustration and message when no listings are found
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pb={10}
        >
          <img src={NoListingsImage} alt="No Listings" />
          <Typography pt={5} variant="h5">
            <strong>No listings found by {user.name}</strong>{" "}
          </Typography>
        </Box>
      ) : (
        <>
          {/* Listing Section */}
          <Grid container spacing={2}>
            {listings
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item) => {
                const locationArray = item.location.split(", ");
                const cityState =
                  locationArray.length > 2
                    ? `${locationArray[1]}, ${locationArray[2]}`
                    : item.location;
      
                return (
                  <Grid item key={item.id}>
                    <ListingCard
                    listingId={item.id}
                      title={item.title}
                      createdAt={item.createdAt}
                      updatedAt={item.updatedAt}
                      description={item.description}
                      images={item.images}
                      location={cityState}
                      price={item.price}
                      studentVerification={item.studentVerification}
                      priceHistory={item.priceHistory}
                    />
                  </Grid>
                );
              })}
          </Grid>
          {/* Pagination control */}
          <Stack spacing={2} alignItems="center" marginY={5}>
            <Pagination
              count={Math.ceil(listings.length / itemsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Stack>
        </>
      )}
    </Box>
  );
}
