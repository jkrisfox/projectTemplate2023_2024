"use client";

import Image from "next/image";
import { Box, Typography, Grid, Button, Link, Paper } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ flexGrow: 1, p: 12, height: "100vh" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src="/college-student-packed.jpg"
              alt="Image of students packing"
              layout="responsive"
              width={750}
              height={750}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            component="div"
            color="secondary.main"
            gutterBottom
          >
            <strong>BUY · SELL</strong>
          </Typography>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            The easiest way to buy and sell undesired items and products
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ mb: 4 }}>
            SLOMarket: A digital marketplace by Cal Poly students, for Cal Poly
            students, where your old stuff finds new homes and your next
            treasure is just a click away.
          </Typography>
          <Button href="create-listing" variant="contained" sx={{ mb: 2 }}>
            Get Started
          </Button>
          <Typography variant="body2" component="div">
            Already a member?{" "}
            <Link href="/signin" underline="hover">
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
