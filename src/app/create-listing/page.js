"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  IconButton,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useAuth } from "../AuthProvider";
import { uploadImage } from "../../lib/firebaseUtils";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import Image from "next/image";

const californiaCities = [
  "Los Angeles",
  "San Diego",
  "San Jose",
  "San Francisco",
  "San Luis Obispo",
  "Pismo Beach",
  "Morro Bay",
  "Arroyo Grande",
  "Atascadero",
  "Paso Robles",
  "Grover Beach",
  "Cambria",
  "Templeton",
  "Nipomo",
  "Cayucos",
];

// Separate component for the Image Upload square
const ImageUploadSquare = ({ image, onRemove }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 250,
        height: 250,
        backgroundImage: `url(${image.preview})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&:hover": {
          // Change the hover effect here
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <IconButton
        onClick={onRemove}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255, 255, 255, 0.7)", // semi-transparent white background
          color: "black", // black icon color
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
          zIndex: 2, // ensure it's above other elements
        }}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  );
};

export default function CreateListing() {
  const router = useRouter();
  const { getUser, isAuthenticated } = useAuth(); // Assuming useAuth provides an 'isAuthenticated' boolean
  const [listing, setListing] = useState({
    title: "",
    description: "",
    created: "",
    price: 0,
    location: "",
  });
  const [selectedCity, setSelectedCity] = useState(null);
  const [listingImage, setListingImage] = useState([]); // Initialize as an empty array
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [isListingImageDialogOpen, setIsListingImageDialogOpen] =
    useState(false);
  const [cities, setCities] = useState([]);
  const [listingCreated, setListingCreated] = useState(false);
  const [newListingId, setNewListingId] = useState(null);
  const firebaseAuth = useAuth();
  const isFirebaseLoggedIn = firebaseAuth.currentUser !== null;

  useEffect(() => {
    // Check if the user is authenticated
    if (!isFirebaseLoggedIn) {
      // User is not authenticated, navigate to the login page
      router.push("/login");
    }
  }, [isFirebaseLoggedIn, router]);

  const handleCancel = () => {
    router.push("/"); // Navigate back to the home page
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setListing({
      ...listing,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Ensure that router is defined
      if (!router) {
        console.error("Router is not defined");
        return;
      }

      const user = getUser();
      const listingImageURL = listingImage.length
        ? await uploadImage(user.uid, listingImage[0])
        : "";
      const docData = {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        location: listing.location,
        images: [listingImageURL],
        createdAt: Timestamp.fromDate(new Date()),
        sellerId: user.uid,
      };

      const docRef = await addDoc(collection(db, "listings"), docData);

      setSnackbar({ open: true, message: "Listing created successfully!" });
      setNewListingId(docRef.id);
      setListingCreated(true);

      // Use router with the check
      router.push(`/listing/${docRef.id}`);
    } catch (err) {
      console.log(err);
      setSnackbar({ open: true, message: err.message });
    }
  };
  const handleChangeListingImage = () => {
    setIsListingImageDialogOpen(true);
  };

  const handleListingImageDialogClose = () => {
    setIsListingImageDialogOpen(false);
  };

  // Function to remove an image from the list
  const removeImage = (index) => {
    setListingImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onListingImageDrop = useCallback((acceptedFiles) => {
    setListingImage((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) => ({
        file: file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onListingImageDrop,
    maxFiles: 10,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
  });

  if (listingCreated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Image
          src="/../../assets/illustrations/sitting-4.svg"
          alt="Listing Created"
          width={200} // Adjust the size as needed
          height={200}
        />
        <Typography variant="h5" style={{ marginTop: "20px" }}>
          Listing Created Successfully!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={() => router.push(`/listing/${newListingId}`)}
        >
          View Listing
        </Button>
      </div>
    );
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ padding: "40px" }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <form style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/* Form Fields here */}
          <h1>New Listing</h1>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Listing Title"
            type="text"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="price"
                name="price"
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="location"
                options={californiaCities}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a city"
                    variant="outlined"
                    fullWidth
                  />
                )}
                value={selectedCity}
                onChange={(event, newValue) => {
                  setSelectedCity(newValue);
                  setListing({ ...listing, location: newValue });
                }}
              />
            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            multiline={true}
            rows={5}
            required
          />
          <h3>Upload Images</h3>
          <Grid container spacing={2} alignItems="center">
            {listingImage.map((image, index) => (
              <Grid item key={index}>
                <ImageUploadSquare
                  image={image}
                  onRemove={() => removeImage(index)}
                />
              </Grid>
            ))}
            {listingImage.length < 10 && (
              <Grid item>
                <IconButton
                  onClick={handleChangeListingImage}
                  sx={{
                    width: 250,
                    height: 250,
                    border: "1px dashed grey",
                    borderRadius: "4px", // Adjust border radius here for square effect
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // Square hover effect
                    },
                  }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Grid>
            )}
          </Grid>
          <Dialog
            open={isListingImageDialogOpen}
            onClose={() => setIsListingImageDialogOpen(false)}
          >
            <DialogTitle id="responsive-dialog-title">
              {"Upload Listing Image"}
            </DialogTitle>
            <DialogContent>
              <div
                {...getRootProps()}
                style={{
                  border: "1px dashed gray",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <input {...getInputProps()} />{" "}
                {/* Corrected from getListingImageInputProps */}
                <Typography variant="body1">
                  Drag & drop an image here, or click to select one
                </Typography>
              </div>
            </DialogContent>

            <DialogActions>
              <Button
                autoFocus
                onClick={handleListingImageDialogClose}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <div align="left">
            <Button
              sx={{ marginTop: "3rem", backgroundColor: "grey" }}
              variant="contained"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              sx={{
                marginTop: "3rem",
                marginLeft: "3rem",
                backgroundColor: "4FB18C",
              }}
              onClick={handleSubmit}
              variant="contained"
            >
              Create Listing
            </Button>
          </div>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity="success"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </form>
      </Grid>
    </Grid>
  );
}
