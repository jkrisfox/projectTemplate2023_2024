import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import logo from "../../public/footerlogo.svg";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://slo.market/">
        SLOMarket
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundImage: "url(/assets/footer.png)", // Adjusted path
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item>
            <img src={logo} alt="SLOMarket Logo" style={{ maxWidth: "100%" }} />
          </Grid>
          <Grid item>
            <Typography variant="h4" align="center">
              <strong>
                Connecting local growers and merchants on one platform.
              </strong>
            </Typography>
          </Grid>
          <Grid item>
            <Stack mt={2} direction="row" spacing={6}>
              <Link href="#" color="inherit">
                About Us
              </Link>
              <Link href="#" color="inherit">
                How It Works
              </Link>
              <Link href="#" color="inherit">
                Community Guidelines
              </Link>
              <Link href="#" color="inherit">
                Support
              </Link>
            </Stack>
          </Grid>
          <Grid item>
            <Stack mt={2} direction="row" spacing={6}>
              <Link href="#" color="inherit">
                Facebook
              </Link>
              <Link href="#" color="inherit">
                Twitter
              </Link>
              <Link href="#" color="inherit">
                Instagram
              </Link>
            </Stack>
          </Grid>
          <Grid item>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
