'use client'
import React from 'react';
import { Box, Typography, Badge } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import Link from 'next/link';



function ListingDetails() {

    //Using hard coded data for the time being, this will be changed to props passed down once we have the database setup

    const listing = {title: "Chair", description: "A beautiful White Chair", price: 0, image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=3487&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
    const seller = {name: "John", phone: "123.456.7890", email: "email@email.com", location: "Poly Canyon Village"}


  return (
    <Box sx={{ width: '100%', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
    
        <Box align="center" justifyContent="space-between">
            <Button sx={{margin: "40px", backgroundColor: "grey", color: "white"}} variant="contained" component={Link} href={"/"}>Go Back</Button>
            <Button sx={{margin: "40px", backgroundColor: "4FB18C", color: "white"}} variant="contained">Favorite</Button>
        </Box> 
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align = "center" sx={{ fontWeight: 'bold', marginBottom: 1 }} >{listing.title}</Typography>
        <Box align="center" sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px' }}>
            <img 
            src = {listing.image}
            alt="Product" 
            width="60%" 
            height="60%" 
            style={{ borderRadius: '8px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}
            />
        </Box>


        <Box display="flex" alignItems="center" justifyContent="center" > 
            <Box margin="40px" sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px', marginRight: 5}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Price: ${listing.price}</Typography>
                <Typography variant="h7">Description: {listing.description}</Typography>
            </Box>

            <Box margin="40px" sx={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0)', borderRadius: '8px 8px 0px 0px', marginLeft: 85}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Contact Info</Typography> 
                
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 1 }}>
                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Name: {seller.name}</Typography> 
                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Phone: {seller.phone}</Typography> 
                    <Typography variant="h7" sx={{ fontWeight: 'bold', marginLeft: 1 }}>Email: {seller.email}</Typography>      
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <LocationOnIcon fontSize="small" color="primary" />
                    <Typography variant="caption" color="textSecondary" sx={{ marginLeft: 1 }}>{seller.location}</Typography>
                </Box>
            </Box>
        </Box>          
      </Box>
    </Box>
  );
}

export default ListingDetails;
