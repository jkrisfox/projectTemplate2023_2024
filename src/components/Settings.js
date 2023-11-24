import React, { useState } from "react";
import {
  Alert,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Box,
  Radio,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/firebaseUtils";

export default function Settings({ user }) {
  const [formState, setFormState] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  const router = useRouter();

  // RADIO HANDLERS
  const [selectedOption1, setSelectedOption1] = useState(null);
  const handleChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };
  const [selectedOption2, setSelectedOption2] = useState(null);
  const handleChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };
  const [selectedOption3, setSelectedOption3] = useState(null);
  const handleChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  function handleSetupSubmit(event) {
    if (event.nativeEvent.submitter.name == "saveSettings") {
      handleSaveSettings(event);
    } /*else if (event.nativeEvent.submitter.name == "resetPassword") {
        handleResetPassword(event);
    } else if (event.nativeEvent.submitter.name == "deleteAccount") {
        handleDeleteAccount(event);
    }*/
  }

  async function handleSaveSettings(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = user.uid;
    const name = data.get("name");
    const location = data.get("location");
    const phoneNumber = data.get("phoneNumber");

    // Validate phone number with regex
    if (
      phoneNumber &&
      (!event.currentTarget.reportValidity() ||
        !phoneNumber.match(
          /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
        ))
    ) {
      setFormState({
        ...formState,
        phoneNumber: {
          error: true,
          message: "You're phone number is not formatted correctly.",
        },
      });
      return false;
    }

    await updateUser(userId, {
      name,
      location,
      phoneNumber,
    })
      .then(() => {
        // Send to profile page
        router.push(`/profile/${userId}`);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });

    return false;
  }

  function handleResetPassword(event) {
    event.preventDefault();
    const userId = user.uid;

    // Submit form
    fetch(`/api/users/${userId}/resetPassword`, {
      method: "put",
    }).then((res) => {
      if (res.ok) {
        // Send to profile page
        router.push(`/profile/${userId}`);
      } else {
        setError(true);
        res.json().then((err) => console.error(err));
      }
    });

    return false;
  }

  function handleDeleteAccount(event) {
    event.preventDefault();
    const userId = user.uid;

    // Submit form
    fetch(`/api/users/${userId}`, {
      method: "delete",
    }).then((res) => {
      if (res.ok) {
        // Send to profile page
        router.push(`/profile/${userId}`);
      } else {
        setError(true);
        res.json().then((err) => console.error(err));
      }
    });

    return false;
  }

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      <form
        onSubmit={handleSetupSubmit}
        style={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

        <br></br>
        <div style={{ width: "30%" }}>
          {/* NAME */}
          <TextField
            margin="dense"
            variant="standard"
            id="fname"
            name="name"
            label="Name"
            defaultValue={user.name}
            type="text"
            required
            fullWidth
            inputProps={{ maxLength: 64 }}
          />
          <br></br>

          <Box sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedOption1 === "option1"}
                  onChange={handleChange1}
                  value="option1"
                />
              }
              label="Show Email to Registered Users"
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedOption1 === "option2"}
                  onChange={handleChange1}
                  value="option2"
                />
              }
              label="Verified Students Only"
            />
          </Box>

          <br></br>

          {/* LOCATION */}
          <TextField
            margin="dense"
            variant="standard"
            id="location"
            name="location"
            label="Location"
            type="text"
            defaultValue={user.location}
            fullWidth
            inputProps={{ maxLength: 64 }}
          />
          <br></br>
          <Box sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedOption2 === "option1"}
                  onChange={handleChange2}
                  value="option1"
                />
              }
              label="Show Location to Registered Users"
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedOption2 === "option2"}
                  onChange={handleChange2}
                  value="option2"
                />
              }
              label="Verified Students Only"
            />
          </Box>
          <br></br>

          {/* PHONE */}
          <TextField
            margin="dense"
            name="phoneNumber"
            id="phoneNumber"
            label="Phone Number"
            defaultValue={user.phoneNumber}
            type="tel"
            fullWidth
            error={formState.phoneNumber?.error}
            helperText={formState.phoneNumber?.message}
            variant="standard"
            inputProps={{ maxLength: 16 }}
          />
          <br></br>
          <Box sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedOption3 === "option1"}
                  onChange={handleChange3}
                  value="option1"
                />
              }
              label="Show Phone Number to Registered Users"
            />
          </Box>
          <Box sx={{ ml: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={selectedOption3 === "option2"}
                  onChange={handleChange3}
                  value="option2"
                />
              }
              label="Verified Students Only"
            />
          </Box>
          <br></br>
          <br></br>
          <Button
            type="submit"
            name="saveSettings"
            variant="contained"
            color="primary"
            sx={{ color: "white" }}
            fullWidth
          >
            Save Settings
          </Button>

          {/* RED BUTTONS */}
          <Grid container spacing={3} justifyContent="center" pt={6}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Button
                type="submit"
                name="resetPassword"
                variant="contained"
                color="error"
                sx={{ color: "white" }}
                fullWidth
              >
                Reset Password
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Button
                type="submit"
                name="deleteAccount"
                variant="contained"
                color="error"
                sx={{ color: "white" }}
                fullWidth
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
          <br></br>
        </div>
      </form>
    </div>
  );
}
