"use client";
import { useState } from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Alert,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from '../AuthProvider';
import { createUser } from '@/lib/firebaseUtils';
import { sendEmailVerification } from 'firebase/auth';
import logo from "../../../public/logo.svg";

export default function Signup() {
  const [formState, setFormState] = useState({ email: "", password: "", passwordConfirmation: "" });
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const { signUp } = useAuth();

  async function handleSignup(event) {
    event.preventDefault();
    let validForm = event.currentTarget.reportValidity();
    
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const passwordConfirmation = data.get('passwordConfirmation');

    if (password != passwordConfirmation) {
      setErrorMessage();
      setFormState({...formState, passwordConfirmation: { error: true, message: "Your passwords don't match." }});
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

  function handleChange({ field, value }) {
    setFormState({ ...formState, [field]: value });
  }

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              width: 0.5,
              margin: "auto",
              textAlign: "center",
              height: "100vh",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "300px" }}
            />
            <Typography variant="h5" pb={6}>
              <strong>Sign Up for an account.</strong>
            </Typography>
            
            <Alert severity="info">
              Use your calpoly.edu email to get a verified account!
            </Alert>
            
            <form onSubmit={handleSignup}>
              {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert>
              )}

              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                name="email"
                fullWidth
                value={formState.email}
                onChange={(e) =>
                  handleChange({ field: "email", value: e.target.value })
                }
                error={formState.email?.error}
              />
              <br />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                name="password"
                fullWidth
                value={formState.password}
                onChange={(e) =>
                  handleChange({ field: "password", value: e.target.value })
                }
              />
              <br />
              <TextField
                margin="dense"
                id="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                name="passwordConfirmation"
                fullWidth
                value={formState.passwordConfirmation}
                onChange={(e) =>
                  handleChange({ field: "passwordConfirmation", value: e.target.value })
                }
                error={formState.passwordConfirmation?.error}
                helperText={formState.passwordConfirmation?.message}
              />
              <br /><br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </>
  );
}
