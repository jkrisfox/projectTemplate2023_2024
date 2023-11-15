'use client'

import React, { useCallback, useState } from 'react';
import { Alert, Avatar, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Grid, IconButton, TextField, Typography, Paper
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

export default function Profile({ params }) {
  const [ formState, setFormState ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState();
  const [profileImage, setProfileImage] = useState([]); // Stored as [file, objectUrl]
  const [heroImage, setHeroImage] = useState([]); // Stored as [file, objectUrl]
  const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState(false);
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);

  const router = useRouter();

  const onProfileImageDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setProfileImage([file, objectUrl]); // Set the uploaded image as the hero image
    setIsProfileImageDialogOpen(false); // Close the dialog
  }, []);

  const onHeroDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setHeroImage([file, objectUrl]); // Set the uploaded image as the hero image
    setIsHeroDialogOpen(false); // Close the dialog
  }, []);

  const { getRootProps:getProfileImageRootProps, getInputProps:getProfileImageInputProps } = useDropzone({
    onDrop: onProfileImageDrop,
    maxFiles: 1,
    accept: 'image/*'
  });

  const { getRootProps:getHeroRootProps, getInputProps:getHeroInputProps } = useDropzone({
    onDrop: onHeroDrop,
    maxFiles: 1,
    accept: 'image/*'
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

  function handleSetupSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = parseInt(params.id);

    // Add images to form
    if (profileImage.length != 0) {
      data.append('profileImage', profileImage[0])
    }
    if (heroImage.length != 0) {
      data.append('heroImage', heroImage[0])
    }

    // Remove blank inputs
    let toRemove = [];
    data.forEach((val, key) => {
      if (val == "") {
        toRemove.push(key);
      }
    });
    toRemove.forEach(key => {
      data.delete(key);
    });

    // Validate phone number with regex
    if (data.get('phoneNumber') &&
       (!event.currentTarget.reportValidity() ||
        !data.get('phoneNumber').match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/))) {
      setFormState({...formState, phoneNumber: { error: true, message: "You're phone number is not formatted correctly." }});
      return false;
    }
    
    // Submit form
    fetch(`/api/users/${userId}`, {
      method: 'put',
      body: data
    }).then((res) => {
      if (res.ok) {
        // Send to profile page
        router.push(`/profile/${userId}`);
      } else {
        res.json().then(err => {
          setErrorMessage(err.error);
        });
      }
    });

    return false;
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Set Up Profile</h1>
        <form onSubmit={handleSetupSubmit} style={{padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          { errorMessage ? (
          <Alert severity="error">
              {errorMessage}
          </Alert>
          ) : null }

          <Grid container spacing={2} columnSpacing={8} alignItems="center" justifyContent="center" mt={3}>

            <Grid item>
              <Typography align='center'>Profile Picture</Typography>
              <IconButton onClick={handleChangeProfileImage}>
                <Paper elevation={3}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundImage: `url(${profileImage[1]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    borderRadius: '50%'
                  }}
                >
                  {!profileImage[1] &&
                  <Avatar alt="Banner" sx={{ width: 100, height: 100 }} variant='circular'>
                    <PersonIcon />
                  </Avatar>}
                </Paper>
              </IconButton>
            </Grid>

            <Grid item>
              <Typography align='center'>Banner Image</Typography>
              <IconButton onClick={handleChangeHero} sx={{borderRadius: 0}}>
                <Paper elevation={3}
                  sx={{
                    width: 200,
                    height: 100,
                    backgroundImage: `url(${heroImage[1]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  {!heroImage[1] &&
                  <Avatar alt="Banner" sx={{ width: 200, height: 100 }} variant='square'>
                    <ImageIcon />
                  </Avatar>}
                </Paper>
              </IconButton>
            </Grid>

          </Grid>

          <br></br>
          <div style={{width: '30%'}}>
            <TextField
              margin="dense"
              variant="standard"
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
              error={formState.phoneNumber?.error}
              helperText={formState.phoneNumber?.message}
              variant='standard'
              inputProps={{ maxLength: 16 }}
            />
            <br></br>
            <TextField
              margin="dense"
              variant="standard"
              id="location"
              name="location"
              label="Location"
              type="text"
              fullWidth
              inputProps={{ maxLength: 64 }}
            />
            <br></br>
            <br></br>
            <Button type="submit">Complete Setup</Button>
          </div>
        </form>

      <Dialog
        open={isProfileImageDialogOpen}
        onClose={handleProfileImageDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Upload Profile Image"}</DialogTitle>
        <DialogContent>
          <div {...getProfileImageRootProps()} style={{ border: '1px dashed gray', padding: '20px', cursor: 'pointer' }}>
            <input {...getProfileImageInputProps()} />
            <Typography variant="body1">Drag & drop an image here, or click to select one</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleProfileImageDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isHeroDialogOpen}
        onClose={handleHeroDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Upload Banner Image"}</DialogTitle>
        <DialogContent>
          <div {...getHeroRootProps()} style={{ border: '1px dashed gray', padding: '20px', cursor: 'pointer' }}>
            <input {...getHeroInputProps()} />
            <Typography variant="body1">Drag & drop an image here, or click to select one</Typography>
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
