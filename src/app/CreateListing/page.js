'use client'
import {useState, useEffect, useCallback} from "react";
//import {Form, Input, TextArea, Message} from "semantic-ui-react";
import { Alert, Avatar, Dialog, DialogActions, DialogContent,
    DialogTitle, Grid, IconButton, Typography, Paper
  } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Input } from "semantic-ui-react";
import { doc, addDoc, collection, Timestamp } from "firebase/firestore"; 
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from '../AuthProvider';
import { useDropzone } from 'react-dropzone';
import { updateUser, uploadImage } from '../../lib/firebaseUtils';





export default function CreateListing(){
    const { getUser, isLoggedIn } = useAuth();

    const [listing, setListing] = useState({
        name: "",
        price: 0,
        location: "",
        desc: "",
        images: ""
    });
    const [isListingImageDialogOpen, setIsListingImageDialogOpen] = useState(false);
    const [listingImage, setListingImage] = useState([]); // Stored as [file, objectUrl]
    const [ errorMessage, setErrorMessage ] = useState();


    const handleChangeListingImage = () => {
        setIsListingImageDialogOpen(true);
    };

    const handleListingImageDialogClose = () => {
        setIsListingImageDialogOpen(false);
      };

    const onListingImageDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const objectUrl = URL.createObjectURL(file);
        setListingImage([file, objectUrl]); // Set the uploaded image as the hero image
        setIsListingImageDialogOpen(false); // Close the dialog
    }, []);

    const { getRootProps:getListingImageRootProps, getInputProps:getListingImageInputProps } = useDropzone({
        onDrop: onListingImageDrop,
        maxFiles: 1,
        accept: {
          'image/*': ['.jpeg', '.jpg', '.png']
        }
      });

      

    function handleChange(event) {
        event.preventDefault();
        const {id, value} = event.target
            setListing({ ...listing, [id]: value });
            console.log(listing)
            
             
    }; 

    const handleSubmit = async () => {

   

        const user = getUser();
        const userId = user.uid
        let listingImageURL = "";

        if (listingImage.length != 0) {
            try {
              listingImageURL = await uploadImage(userId, listingImage[0]);
            } catch (err) {
              console.error(err);
              setErrorMessage(err.message);
              return false;
            }
        }

        console.log(listing)
        console.log(userId)
        console.log(Date.now())

        const docRef = await addDoc(collection(db, "listings"), {
            title: listing.name,
            price: listing.price,
            location: listing.location,
            images: [listingImageURL],
            description: listing.desc,
            createdAt: Timestamp.fromDate(new Date()),
            sellerId: userId
    
        })            

        console.log(docRef.id)
    };

    return (
        <form 
            style = {{padding: "40px", display:"flex", flexDirection: "column"}}
        >
            <h1>New Listing</h1>                
            <TextField
                autoFocus
                margin="dense"
                id="name"
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
                id="price"
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

            <Grid item>
              <IconButton onClick={handleChangeListingImage}>
                <Paper elevation={3}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundImage: `url(${listingImage[1]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: '50%'
                  }}
                >
                </Paper>
              </IconButton>
            </Grid>

            <Dialog
                open={isListingImageDialogOpen}
                onClose={handleListingImageDialogClose}
                aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">{"Upload Listing Image"}</DialogTitle>
                <DialogContent>
                <div {...getListingImageRootProps()} style={{ border: '1px dashed gray', padding: '20px', cursor: 'pointer' }}>
                <input {...getListingImageInputProps()} />
                <Typography variant="body1">Drag & drop an image here, or click to select one</Typography>
                </div>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleListingImageDialogClose} color="primary">
                Cancel
                </Button>
                </DialogActions>
            </Dialog>

            <div align="center">
                <Button sx={{margin: "40px", backgroundColor: "grey"}} variant="contained">Cancel</Button>
                <Button sx={{margin: "40px", backgroundColor: "4FB18C"}}   onClick = {handleSubmit} variant="contained">Create Listing</Button>
            </div>
     
        </form>

    )
}