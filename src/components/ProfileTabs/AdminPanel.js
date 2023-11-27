import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebaseConfig";
import {
  Box,
  Typography,
  Tooltip,
  CircularProgress,
  Button,
  Grid,
  Autocomplete,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import LockIcon from "@mui/icons-material/Lock";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [searchUser, setSearchUser] = useState(null);
  const [searchTitle, setSearchTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userPage, setUserPage] = useState(1);
  const [listingPage, setListingPage] = useState(1);
  const itemsPerPage = 5; // Set items per page for pagination

  useEffect(() => {
    const fetchUsersAndListings = async () => {
      setIsLoading(true);
      try {
        // Fetch users
        const usersCollectionRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollectionRef);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);

        // Fetch listings
        const listingsCollectionRef = collection(db, "listings");
        const listingsSnapshot = await getDocs(listingsCollectionRef);
        const listingsData = listingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listingsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setIsLoading(false);
    };

    fetchUsersAndListings();
  }, []);

  const handleSearchUser = async () => {
    setIsLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", "==", searchUser));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log("No matching users.");
      } else {
        const userData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      }
    } catch (error) {
      console.error("Error searching users: ", error);
    }
    setIsLoading(false);
  };

  const handleRestrictUser = async (userId) => {
    try {
      // Logic to restrict the user
      console.log(`Restricting user with ID: ${userId}`);
      // Update the user's status in the database
    } catch (error) {
      console.error("Error restricting user: ", error);
    }
  };

  const handleSearchListing = async () => {
    setIsLoading(true);
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, where("title", "==", searchTitle));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.log("No matching listings.");
      } else {
        const listingsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listingsData);
      }
    } catch (error) {
      console.error("Error searching listings: ", error);
    }
    setIsLoading(false);
  };

  const handleBanUser = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { banned: true });
    } catch (error) {
      console.error("Error banning user: ", error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const listingRef = doc(db, "listings", listingId);
      await deleteDoc(listingRef);
    } catch (error) {
      console.error("Error deleting listing: ", error);
    }
  };

  const handleChangeUserPage = (event, value) => {
    setUserPage(value);
  };

  const handleChangeListingPage = (event, value) => {
    setListingPage(value);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: "16px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={users.map((option) => option.name)}
            value={searchUser}
            onChange={(event, newValue) => {
              setSearchUser(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search User" margin="normal" />
            )}
          />
          <Button startIcon={<SearchIcon />} onClick={handleSearchUser}>
            Search
          </Button>
          <List>
            {users
              .slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage)
              .map((user) => (
                <ListItem key={user.id}>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Restrict User">
                      <IconButton
                        edge="end"
                        onClick={() => handleRestrictUser(user.id)}
                      >
                        <LockIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
          <Pagination
            count={Math.ceil(users.length / itemsPerPage)}
            page={userPage}
            onChange={handleChangeUserPage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={listings.map((option) => option.title)}
            value={searchTitle}
            onChange={(event, newValue) => {
              setSearchTitle(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search Listing" margin="normal" />
            )}
          />
          <Button startIcon={<SearchIcon />} onClick={handleSearchListing}>
            Search
          </Button>
          <List>
            {listings
              .slice(
                (listingPage - 1) * itemsPerPage,
                listingPage * itemsPerPage
              )
              .map((listing) => (
                <ListItem key={listing.id}>
                  <ListItemText primary={listing.title} />
                  <ListItemSecondaryAction>
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
          <Pagination
            count={Math.ceil(listings.length / itemsPerPage)}
            page={listingPage}
            onChange={handleChangeListingPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPanel;
