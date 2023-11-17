import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import hero from "../../public/assets/hero.jpg";

function Hero() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderCardContent = () => {
    if (value === 0) {
      return (
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          SLOMarket: A digital marketplace by Cal Poly students, for Cal Poly
          students, where your old stuff finds new homes and your next treasure
          is just a click away.
        </Typography>
      );
    } else {
      // Render content for the 'Sell' tab. You can customize this content.
      return (
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Sell your unwanted items and make some extra cash! List your products
          here and reach out to fellow students and other individuals within the
          community.
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        height: "500px",
        width: "100%",
        //  backgroundImage: `url(../../public/assets/hero.jpg)`,
        backgroundImage: `url('https://images.unsplash.com/photo-1560223716-0be2cdfa9b42?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1hcmtldHBsYWNlfGVufDB8fDB8fHww')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
      }}
    >
      <Card
        sx={{
          color: "white",
          position: "absolute",
          top: "25%",
          left: "5%",
          width: "40%",
          backgroundColor: "rgba(255,255,255,0.99)", // Added a slight transparency for a modern look
          borderRadius: "15px", // Rounded corners
          background: "rgba( 28, 28, 28, 0.7 )",
          boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 4px )",
          webkitBackdropFilter: "blur( 4px )",
          borderRadius: "10px",
          // border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
        elevation={4}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            color: "white",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab
            label="Buy"
            sx={{
              color: "white",
            }}
          />
          <Tab
            label="Sell"
            sx={{
              color: "white",
            }}
          />
        </Tabs>
        <CardContent>
          <Typography
            variant="h4" // Made the title slightly bigger
            sx={{ fontWeight: 600, mt: 2 }} // Added margin-top for better spacing
          >
            The <span style={{ color: "#4FB18C" }}>easiest</span> way to buy and
            sell undesired items and products
          </Typography>
          {renderCardContent()}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" sx={{ color: "white" }}>
              Get started now
            </Button>
            <Button variant="outlined" color="primary" href="about">
              See benefits
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Hero;
