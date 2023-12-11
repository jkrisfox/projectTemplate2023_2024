"use client";

import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Autocomplete,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ImageIcon from "@mui/icons-material/Image";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import { updateUser, uploadImage } from "../../lib/firebaseUtils";

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

export default function Profile() {
  const [formState, setFormState] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [isStudent, setIsStudent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [profileImage, setProfileImage] = useState([]); // Stored as [file, objectUrl]
  const [heroImage, setHeroImage] = useState([]); // Stored as [file, objectUrl]
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] =
    useState(false);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const { getUser, isLoggedIn } = useAuth();
  const router = useRouter();

  const onProfileImageDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setProfileImage([file, objectUrl]); // Set the uploaded image as the hero image
    setIsProfileImageDialogOpen(false); // Close the dialog
  }, []);

  const onHeroDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setHeroImage([file, objectUrl]); // Set the uploaded image as the hero image
    setIsHeroDialogOpen(false); // Close the dialog
  }, []);

  const {
    getRootProps: getProfileImageRootProps,
    getInputProps: getProfileImageInputProps,
  } = useDropzone({
    onDrop: onProfileImageDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const { getRootProps: getHeroRootProps, getInputProps: getHeroInputProps } =
    useDropzone({
      onDrop: onHeroDrop,
      maxFiles: 1,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const handleChangeProfileImage = () => {
    setIsProfileImageDialogOpen(true);
  };

  const handleChangeHero = () => {
    setIsHeroDialogOpen(true);
  };

  const handleProfileImageDialogClose = () => {
    setIsProfileImageDialogOpen(false);
  };

  const handleHeroDialogClose = () => {
    setIsHeroDialogOpen(false);
  };

  const resendVerificationEmail = async () => {
    const user = getUser();
    await sendEmailVerification(user).catch((err) => {
      console.error(err);
      setErrorMessage(err.message);
    });
  };

  async function handleSetupSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name");
    const phoneNumber = data.get("phoneNumber");
    const location = data.get("location");

    const user = getUser();
    const userId = user.uid;

    if (!event.currentTarget.reportValidity()) {
      setErrorMessage(
        "Keep name and location under 64 characters, and phone number under 16 characters."
      );
      return false;
    }

    // Validate phone number with regex
    if (
      phoneNumber &&
      !phoneNumber.match(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      )
    ) {
      setErrorMessage();
      setFormState({
        ...formState,
        phoneNumber: {
          error: true,
          message: "Your phone number is not formatted correctly.",
        },
      });
      return false;
    }

    // Upload images
    let profileImageURL = "";
    let heroImageURL = "";

    if (profileImage.length != 0) {
      try {
        profileImageURL = await uploadImage(userId, profileImage[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage(err.message);
        return false;
      }
    }

    if (heroImage.length != 0) {
      try {
        heroImageURL = await uploadImage(userId, heroImage[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage(err.message);
        return false;
      }
    }

    await updateUser(userId, {
      name,
      phoneNumber,
      location,
      profileImage: profileImageURL,
      heroImage: heroImageURL,
    })
      .then(() => {
        // Send to profile page
        router.push(`/profile/${userId}`);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });

    // Check if all required fields are filled
    if (!name || !phoneNumber || !location) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    // Validate phone number with regex
    if (
      phoneNumber &&
      !phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    ) {
      setErrorMessage("Your phone number is not formatted correctly.");
      setFormState({
        ...formState,
        phoneNumber: {
          error: true,
          message: "Your phone number is not formatted correctly.",
        },
      });
      return false;
    }

    return false;
  }

  const handleLocationChange = (event, newValue) => {
    setLocationInput(newValue);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    const user = getUser();
    if (user.email.split("@").pop() == "calpoly.edu") {
      setIsStudent(true);

      // If the email has already been verified for some reason (page refresh)
      if (user.emailVerified) {
        setEmailVerified(true);
      }
    }
  }, []);

  // Email verification doesn't trigger onAuthStateChange,
  // so just check every couple seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn()) {
        getUser().reload();
        const user = getUser();
        if (user.emailVerified) {
          // Tell server to set user as student
          fetch(`/api/verify/${user.uid}`, { method: "put" }).catch((err) => {
            console.error(err);
            setErrorMessage(err.error);
          });

          setEmailVerified(true);

          // Stop checking for email verification
          clearInterval(interval);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Set Up Profile</h1>
      <form
        onSubmit={handleSetupSubmit}
        style={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isStudent && !emailVerified && (
          <>
            <Alert severity="warning">
              Check your email to verify your student status!
            </Alert>
            <Button onClick={resendVerificationEmail}>Resend email</Button>
          </>
        )}

        {isStudent && emailVerified && (
          <Alert severity="success">Your email has been verified!</Alert>
        )}

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Grid
          container
          spacing={2}
          columnSpacing={8}
          alignItems="center"
          justifyContent="center"
          mt={3}
        >
          <Grid item>
            <Typography align="center">Profile Picture</Typography>
            <IconButton onClick={handleChangeProfileImage}>
              <Paper
                elevation={3}
                sx={{
                  width: 100,
                  height: 100,
                  backgroundImage: `url(${profileImage[1]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  borderRadius: "50%",
                }}
              >
                {!profileImage[1] && (
                  <Avatar
                    alt="Banner"
                    sx={{ width: 100, height: 100 }}
                    variant="circular"
                  >
                    <PersonIcon />
                  </Avatar>
                )}
              </Paper>
            </IconButton>
          </Grid>

          <Grid item>
            <Typography align="center">Banner Image</Typography>
            <IconButton onClick={handleChangeHero} sx={{ borderRadius: 0 }}>
              <Paper
                elevation={3}
                sx={{
                  width: 200,
                  height: 100,
                  backgroundImage: `url(${heroImage[1]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                {!heroImage[1] && (
                  <Avatar
                    alt="Banner"
                    sx={{ width: 200, height: 100 }}
                    variant="square"
                  >
                    <ImageIcon />
                  </Avatar>
                )}
              </Paper>
            </IconButton>
          </Grid>
        </Grid>

        <br></br>
        <div style={{ width: "30%" }}>
          <TextField
            margin="dense"
            variant="outlined"
            id="name"
            name="name"
            label="Name"
            type="text"
            required
            fullWidth
            inputProps={{ maxLength: 64 }}
          />
          <br></br>
          <TextField
            margin="dense"
            name="phoneNumber"
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            fullWidth
            required
            error={formState.phoneNumber?.error}
            helperText={formState.phoneNumber?.message}
            variant="outlined"
            inputProps={{ maxLength: 16 }}
          />
          <br></br>
          <Autocomplete
            value={locationInput}
            onChange={handleLocationChange}
            id="location"
            options={californiaCities}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                margin="dense"
                variant="outlined"
                required
              />
            )}
          />
          <br></br>
          <br></br>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "4FB18C",
            }}
          >
            Complete Setup
          </Button>
        </div>
      </form>

      <Dialog
        open={isProfileImageDialogOpen}
        onClose={handleProfileImageDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Upload Profile Image"}
        </DialogTitle>
        <DialogContent>
          <div
            {...getProfileImageRootProps()}
            style={{
              border: "1px dashed gray",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getProfileImageInputProps()} />
            <Typography variant="body1">
              Drag & drop an image here, or click to select one
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleProfileImageDialogClose}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isHeroDialogOpen}
        onClose={handleHeroDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Upload Banner Image"}
        </DialogTitle>
        <DialogContent>
          <div
            {...getHeroRootProps()}
            style={{
              border: "1px dashed gray",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getHeroInputProps()} />
            <Typography variant="body1">
              Drag & drop an image here, or click to select one
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleHeroDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
