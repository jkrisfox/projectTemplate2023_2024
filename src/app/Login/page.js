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
import { auth } from "../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.svg";

export default function Signin() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const router = useRouter();

  function reset() {
    setError(false);
    setFormValues({ email: "", password: "" });
  }

  async function handleSignin(event) {
    event.preventDefault();
    const email = formValues.email;
    const password = formValues.password;

    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const userid = res.user.uid;
        router.push("/profile/" + userid);
      })
      .catch((err) => {
        reset();
        console.log(err);
        setError(err.message);
      });
  }

  function handleChange({ field, value }) {
    setFormValues({ ...formValues, [field]: value });
  }

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* You can keep the background image or remove it */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
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
              style={{ width: "300px" }} // Adjust the height as needed
            />
            <Typography variant="h5" pb={6}>
              <strong>Log into your account.</strong>
            </Typography>
            <form>
              {error ? (
                <Alert severity="error">
                  There was an issue signing in! Check email and password.
                </Alert>
              ) : null}

              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={formValues.email}
                onChange={(e) =>
                  handleChange({ field: "email", value: e.target.value })
                }
                error={formValues.email?.error}
              />
              <br></br>
              <TextField
                variant="outlined"
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={formValues.password}
                onChange={(e) =>
                  handleChange({ field: "password", value: e.target.value })
                }
              />
              <br></br>
              <br></br>
              {/* Add the "Don't have an account?" link */}
              <Typography variant="body2">
                Dont have an account? <Link href="/Signup">Create one</Link>
              </Typography>
            </form>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={(e) => handleSignin(e)}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
