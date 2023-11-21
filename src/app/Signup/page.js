"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert';
import { useAuth } from '../AuthProvider';
import { createUser } from '@/lib/firebaseUtils';
import { sendEmailVerification } from 'firebase/auth';

export default function Signup() {
  const [ formState, setFormState ] = useState({});
  const [ errorMessage, setErrorMessage ] = useState();

  const { signUp } = useAuth();
  const router = useRouter();

  async function handleSignup(event) {
    event.preventDefault();
    let validForm = event.currentTarget.reportValidity();
    
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirmation = data.get('passwordConfirmation');

    if (password != passwordConfirmation) {
      setErrorMessage();
      setFormState({...formState, passwordConfirmation: { error: true, message: "You're passwords don't match." }});
    } else if (!validForm || password.length < 6) {
      setErrorMessage("Passwords must be at least 6 characters long");
      setFormState({...formState, passwordConfirmation: { error: false, message: "" }});
    } else {
      await signUp(email, password)
      .then(async res => {
        const user = res.user;
        // Create user document
        await createUser(user.uid, user.email).then(async () => {
          if (user.email.split('@').pop() == "calpoly.edu") {
            // Send verification email if user is a student
            await sendEmailVerification(user).catch(err => {
              console.error(err);
              setErrorMessage(err.message);
            });
          }

          // Send to profile setup page
          router.push(`/setup`);
        }).catch(err => {
          console.error(err);
          setErrorMessage(err.message);
        });
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(err.message);
      });
    }
    return false;
  }

  return (
    <>
      <Box sx={{ width: 0.5, margin: "auto", textAlign: "center" }}>
        <Box
          component="img"
          alt="SLO Marketplace Logo"
          src="/logo-192x192.png"
        />
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <Alert severity="info">
            If you are a student, use your calpoly.edu email to get a verified account!
          </Alert>

          { errorMessage && (
            <Alert severity="error">
              {errorMessage}
            </Alert>
          )}

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
            variant="standard"
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
            variant="standard"
          />
          <br></br>
          <br></br>
          <Button type="submit">Sign Up</Button>
        </form>
      </Box>
    </>
  );
}
