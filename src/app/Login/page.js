'use client'

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { signIn } from 'next-auth/react';
import { Box } from '@mui/material';

export default function Login() {

  const [ open, setOpen ] = useState(false);
  const [ formValues, setFormValues ] = useState({email: '', password: ''});
  const [ error, setError ] = useState(false);

  function handleLoginButton() {
    setOpen(true);
  }

  function handleClose() {
    reset();
    setOpen(false);
  }

  function reset() {
    setError(false);
    setFormValues({email: '', password: ''});
  }

  function handleSignin() {
    signIn("normal", {...formValues, redirect: false}).then((result) => {
      if (!result.error) {
        setOpen(false);
        reset();
      } else {
        setError(true);
      }
    })
  }

  function handleChange({field, value}) {
    setFormValues({...formValues, [field]: value});
  }
  
  return (
    <>
      <Box sx={{width: 0.5, margin: 'auto', textAlign: 'center'}}>
      <Box
        component="img"
        alt="SLO Marketplace Logo"
        src="/logo-192x192.png"
      />
        <h1>Log In</h1>
        <form onSubmit={handleSignin}>
          { error ? (
            <Alert severity="error">
              There was an issue signing in! Check email and password.
            </Alert>
          ) : null }

          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={formValues.email}
            onChange={(e) => handleChange({field: 'email', value: e.target.value })}
            variant="standard"
          />
          <br></br>
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={formValues.password}
            onChange={(e) => handleChange({field: 'password', value: e.target.value })}
            variant='standard'
          />
          <br></br>
          <br></br>
          <Button type="submit">Log In</Button>
        </form>
      </Box>
    </>
  );
}