import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import hero from "../../public/assets/hero.jpg";

function Hero() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        padding: isMobile ? theme.spacing(1) : theme.spacing(3), // Add responsive padding
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
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
              width: "40%", // Ensure the card takes the full width of the grid item
              margin: isMobile ? "10% 0" : "auto", // Center card on mobile
            }}
            elevation={4}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant={isMobile ? "fullWidth" : "standard"}
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
                variant={isMobile ? "h6" : "h4"}
                sx={{ fontWeight: 600, mt: 2 }} // Added margin-top for better spacing
              >
                The <span style={{ color: "#4FB18C" }}>easiest</span> way to buy
                and sell undesired items and products
              </Typography>
              {renderCardContent()}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row", // Stack buttons vertically on mobile
                  justifyContent: "space-between",
                  "& > Button": {
                    mt: isMobile ? 2 : 0, // Add top margin to buttons on mobile
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ color: "white" }}
                  href="create-listing"
                >
                  Get started now
                </Button>
                <Button variant="outlined" color="primary" href="about">
                  See benefits
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Hero;
