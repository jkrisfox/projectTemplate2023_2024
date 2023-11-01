import React from 'react';
import { Card, CardContent, Typography, Button, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '500px',
    width: '100%',
    background: `url('https://images.unsplash.com/photo-1560223716-0be2cdfa9b42?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fG1hcmtldHBsYWNlfGVufDB8fDB8fHww') center / cover no-repeat`,
    position: 'relative'
  },
  card: {
    position: 'absolute',
    top: '40%',
    left: '5%',
    width: '40%',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  title: {
    fontWeight: 600,
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.card} elevation={4}>
        <CardContent>
          <Typography variant="h5" className={classes.title}>SLOMARKETPLACE</Typography>
          <Typography variant="subtitle1" className={classes.description}>
            A digital marketplace by Cal Poly students, for Cal Poly students, where your old stuff finds new homes and your next treasure is just a click away.
          </Typography>
          <Box>
            <Button variant="contained" sx={{color:'#4FB18C'}} p={4}>
              Get started now
            </Button>
            <Button variant="outlined" sx={{color:'#4FB18C'}}>
              Discover our origins
            </Button>
          </Box>
        </CardContent>
      </div>
    </div>
  );
}

export default Hero;
