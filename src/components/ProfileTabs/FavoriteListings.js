import React, { useEffect, useState } from "react";
import { Grid, Box, Stack, Pagination } from "@mui/material";
import ListingCard from "../ListingCard";
import { collection, query, orderBy, getDocs, where, limit, documentId } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export default function FavoriteListings( {user} ) {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // Pagination change handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchListingsByIds = async (ids) => {
    const q = query(
      collection(db, "listings"),
      where(documentId(), "in", ids),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  };

  useEffect(() => {
    const fetchListings = async () => {
      const ids = user.favoriteListings;

      // Split favorite listings into groups of 10, the limit firebase allows for withIn
      let idGroups = [];
      for (let i = 0; i < ids.length; i += 10) {
        idGroups.push(ids.slice(i, Math.min(i + 10, ids.length)));
      }

      let listingGroups = [];
      for (const ids of idGroups) {
        await fetchListingsByIds(ids).then(listingGroupRes => {
          listingGroups.push(listingGroupRes);
        }).catch(err => {
          console.error(err);
        });
      }

      let allListings = listingGroups.flat();

      // Sort listings by creation time, since orderBy is not allowed
      allListings.sort((a, b) => {
        return (b.createdAt.seconds - a.createdAt.seconds);
      });
      
      setListings(allListings);
    }

    fetchListings();
  }, []);

  return (
    <Box px={3} py={2}>
      {/* Listing Section */}
      <Grid container spacing={2}>
        {listings.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item) => {
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
    </Box>
  );
}
