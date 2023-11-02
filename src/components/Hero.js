import React from 'react';
import { Card, CardContent, Typography, Button, Box, Tabs, Tab } from '@mui/material';

function Hero() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderCardContent = () => {
    if(value === 0) {
      return (
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          A digital marketplace by Cal Poly students, for Cal Poly students, where your old stuff finds new homes and your next treasure is just a click away.
        </Typography>
      );
    } else {
      // Render content for the 'Sell' tab. You can customize this content.
      return (
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>
          Sell your unwanted items and make some extra cash! List your products here and reach out to fellow students and other individuals within the community.
        </Typography>
      );
    }
  };

  return (
    <Box
      sx={{
        height: '500px',
        width: '100%',
        backgroundImage: `url('https://images.unsplash.com/photo-1560223716-0be2cdfa9b42?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1hcmtldHBsYWNlfGVufDB8fDB8fHww')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
      }}
    >
      
      <Card
        sx={{
          position: 'absolute',
          top: '35%',
          left: '5%',
          width: '40%',
          backgroundColor: 'rgba(255,255,255)',
        }}
        elevation={4}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tab label="Buy" />
          <Tab label="Sell" />
        </Tabs>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600 }}
          >
            SLOMARKETPLACE
          </Typography>
          {renderCardContent()}
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Button variant="contained" color="primary" sx={{color:'white'}}>
              Get started now
            </Button>
            <Button variant="outlined" color="primary">
              Discover our origins
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Hero;
