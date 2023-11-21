"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { Box } from "@mui/material";
import { auth } from "../../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

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
        const userid = res.user.uid
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
