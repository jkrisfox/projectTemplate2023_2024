'use client'
import {useState, useEffect} from "react";
//import {Form, Input, TextArea, Message} from "semantic-ui-react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Input } from "semantic-ui-react";




export default function CreateListing(){

    const [listing, setListing] = useState({
        name: "",
        price: 0,
        location: "",
        desc: "",
    });


    function handleChange(event) {
        event.preventDefault();
        const {id, value} = event.target
            setListing({ [id]: value });
            console.log(listing);
             
    }   

    return (
        <form 
            style = {{padding: "40px", display:"flex", flexDirection: "column"}}
        >
            <h1>New Listing</h1>                
            <TextField
                autoFocus
                margin="dense"
                id="listname"
                name="listname"
                label="Listing Name"
                type="listname"
                halfWidth
                variant="standard"
                onChange={handleChange}
                required
            />
            
            <TextField
                autoFocus
                margin="dense"
                id="Price"
                name="price"
                label="Price"
                type="price"
                halfWidth
                variant="standard"
                onChange={handleChange}
                required
            />        
        
    
            <TextField
                autoFocus
                margin="dense"
                id="location"
                name="location"
                label="Location"
                type="location"
                fullWidth
                variant="standard"
                onChange={handleChange}
                required
            />        
        
            <TextField
                autoFocus
                margin="dense"
                id="desc"
                name="description"
                label="Description"
                type="desc"
                fullWidth
                variant="standard"
                onChange={handleChange}
                multiline={true}
                rows={5}                
                required
            /> 
            
            <h3>Upload Images</h3>
            <Input 
                sx={{margin: "40px", padding: "40px"}}
                type="file" 
                multiple
            />

            <div align="center">
                <Button sx={{margin: "40px", backgroundColor: "grey"}} variant="contained">Cancel</Button>
                <Button sx={{margin: "40px", backgroundColor: "4FB18C"}} type="submit" variant="contained">Signup</Button>
            </div>
     
        </form>

    )
}