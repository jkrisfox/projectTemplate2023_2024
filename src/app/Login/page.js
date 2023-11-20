"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import { auth } from "../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  //   const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  function reset() {
    setError(false);
    setFormValues({ email: "", password: "" });
  }

  function handleSignin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        setError(true)
        console.log(error);
      });

    // signIn("normal", { ...formValues, redirect: false }).then((result) => {
    //   if (!result.error) {
    //     // Successful login
    //     setOpen(false);
    //     reset();
    //     window.location.href = "../"    // Reroute to home page
    //   } else {
    //     setError(true);
    //   }
    // });
  }

  function handleChange({ field, value }) {
    setFormValues({ ...formValues, [field]: value });
  }

  return (
    <>
      <Box sx={{ width: 0.5, margin: "auto", textAlign: "center" }}>
        <Box
          component="img"
          alt="SLO Marketplace Logo"
          src="/logo-192x192.png"
        />
        <h1>Log In</h1>
        <form>
          {error ? (
            <Alert severity="error">
              There was an issue signing in! Check email and password.
            </Alert>
          ) : null}

          <TextField
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
            variant="standard"
            error={formValues.email?.error}
          />
          <br></br>
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={formValues.password}
            onChange={(e) =>
              handleChange({ field: "password", value: e.target.value })
            }
            variant="standard"
          />
          <br></br>
          <br></br>
        </form>
        <Button onClick={(e) => handleSignin(e)}>Log In</Button>
      </Box>
    </>
  );
}
