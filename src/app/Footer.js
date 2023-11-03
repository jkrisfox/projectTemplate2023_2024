import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import footer    from '../../public/footer.png';
import logo from '../../public/logo.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Lift Media
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundImage: `url(${footer})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xl" style={{ position: 'relative' }}>
          <img src={logo} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px' }} />
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body1">
                123 Market St. #22B
              </Typography>
              <Typography variant="body1">
                Charlottesville, California 44635
              </Typography>
              <Typography variant="body1">
                (434) 546-4356
              </Typography>
              <Typography variant="body1">
                contact@lift.agency
              </Typography>
            </Grid>
            <Grid item>
              <Link href="#" color="inherit">About</Link>
              <Link href="#" color="inherit">Growers</Link>
              <Link href="#" color="inherit">Merchants</Link>
              <Link href="#" color="inherit">Partners</Link>
              <Link href="#" color="inherit">Contact</Link>
            </Grid>
            <Grid item>
              <Link href="#" color="inherit">Facebook</Link>
              <Link href="#" color="inherit">Twitter</Link>
              <Link href="#" color="inherit">LinkedIn</Link>
              <Link href="#" color="inherit">Instagram</Link>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
