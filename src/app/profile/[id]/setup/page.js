'use client'

import React, { useCallback, useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';

export default function Profile({ params }) {
  const [ formState, setFormState ] = useState({});
  const [ error, setError ] = useState(false);

  const router = useRouter();

  function handleSetupSubmit(event) {
    event.preventDefault();
    let valid = event.currentTarget.reportValidity();
    const data = new FormData(event.currentTarget);
    const userId = parseInt(params.id);

    // Validate phone number with regex
    const numberIsValid = data.get('phoneNumber') && data.get('phoneNumber').match(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
    valid = valid && numberIsValid;

    if (valid) {
      const signUpData = {};
      signUpData['name'] = data.get('name');
      signUpData['phoneNumber'] = data.get('phoneNumber');
      signUpData['location'] = data.get('location');
      
      // Submit form
      fetch(`/api/users/${userId}`, {
        method: 'put',
        body: JSON.stringify(signUpData)
      }).then((res) => {
        if (res.ok) {
          // Send to profile page
          router.push(`/profile/${userId}`);
        } else {
          setError(true);
          res.json().then((err) => console.error(err));
        }
      });
    } else {
        setFormState({...formState, phoneNumber: { error: true, message: "You're phone number is not formatted correctly." }})
    }
    return false;
  }

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <h1>Set Up Profile</h1>
        <form onSubmit={handleSetupSubmit}>
          { error ? (
          <Alert severity="error">
              There was an issue setting up your account, please try again.
          </Alert>
          ) : null }

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
        </form>

    </Box>
  );
}
