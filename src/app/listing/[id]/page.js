'use client'
import { Box, Typography, Badge } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { doc, collection, query, orderBy, limit, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

function ListingDetails({params}) {

  const [newListing, setListing] = useState([]);
  const [user, setUser] = useState([]);
  const [picture, setPicture] = useState(1)


    const fetchNewItems = async () => {
      const q = doc(db, "listings", params.id)
      const querySnapshot = await getDoc(q);
      const data = querySnapshot.data()
      setListing(data)
     // setNewItems(items);
    };

    const fetchUser = async () => {
      await fetchNewItems()
      const q = doc(db, "users", newListing.sellerId)
      const querySnapshot = await getDoc(q);
      const data = querySnapshot.data()
   
      setUser(data)
     // setNewItems(items);
     
    };

    fetchUser();

  return (
    <Box sx={{ width: '100%', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
    
        <Box align="center" justifyContent="space-between">
            <Button sx={{margin: "40px", backgroundColor: "grey", color: "white"}} variant="contained" component={Link} href={"/"}>Go Back</Button>
            <Button sx={{margin: "40px", backgroundColor: "4FB18C", color: "white"}} variant="contained">Favorite</Button>
        </Box> 
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align = "center" sx={{ fontWeight: 'bold', marginBottom: 1 }} >{newListing.title}</Typography>
        <Box align="center" sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px' }}>
            <img 
            src = {newListing.images}
            alt="Product" 
            width="60%" 
            height="60%" 
            style={{ borderRadius: '8px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}
            />
        </Box>


        <Box display="flex" alignItems="center" justifyContent="center" > 
            <Box margin="40px" sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px', marginRight: 5}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Price: ${newListing.price}</Typography>
                <Typography variant="h7">Description: {newListing.description}</Typography>
            </Box>

            <Box margin="40px" sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px', marginLeft: 85}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Contact Info</Typography> 
                
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 1 }}>
                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Name: {user.name}</Typography> 
                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Phone: {user.phone}</Typography> 
                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Email: {user.email}</Typography>      
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <LocationOnIcon fontSize="small" color="primary" />
                    <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 1 }}>{user.location}</Typography>
                </Box>
            </Box>
        </Box>          
      </Box>
    </Box>
  );
}

export default ListingDetails;