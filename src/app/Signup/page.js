'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import { signIn } from 'next-auth/react';
import Alert from '@mui/material/Alert';

export default function Signup() {
  const [ open, setOpen ] = useState(false);
  const [ formState, setFormState ] = useState({});
  const [ error, setError ] = useState(false);

  const router = useRouter();

  function handleSignup(event) {
    event.preventDefault();
    let valid  = event.currentTarget.reportValidity();
    const data = new FormData(event.currentTarget);
    valid = valid && data.get('password') == data.get('passwordConfirmation');
    if (valid) {
      const signUpData = {};
      signUpData['email'] = data.get('email');
      signUpData['password'] = data.get('password');
      // submit form
      fetch("/api/users", {
        method: 'post',
        body: JSON.stringify(signUpData)
      }).then(async (res) => {
        if (res.ok) {
          let resData = await res.json();
          let userId = resData.id;
          signIn("normal", {...signUpData, redirect: false}).then((result) => {
            if (!result.error) {
              setOpen(false);
              setError(false);
              // Send to profile setup page
              router.push(`/profile/${userId}/setup`);
            } else {
              setError(true);
            }
          });
        } else {
          setError(true);
          res.json().then((j) => console.log('error:' + j));
        }
      })
    } else {
      setFormState({...formState, passwordConfirmation: { error: true, message: "You're passwords don't match." }})
    }
    return false;
  }

  function validate(input) {
    const name = input.name;
    const valid = input.reportValidity();
    setFormState({...formState, [name]: { error: valid }});
  }

  return (
    <>
      <Box sx={{width: 0.5, margin: 'auto', textAlign: 'center'}}>
      <Box
        component="img"
        alt="SLO Marketplace Logo"
        src="/logo-192x192.png"
      />
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          { error ? (
            <Alert severity="error">
              There was an issue signing up, please adjust email and password and try again.
            </Alert>
          ) : null }

          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
            error={formState.email?.error}
          />
          <br></br>
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            fullWidth
            variant='standard'
          />
          <br></br>
          <TextField
            margin="dense"
            name="passwordConfirmation"
            id="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            required
            fullWidth
            error={formState.passwordConfirmation?.error}
            helperText={formState.passwordConfirmation?.message}
            variant='standard'
          />
          <br></br>
          <br></br>
          <Button type="submit">Sign Up</Button>
        </form>
      </Box>
    </>
  );
}