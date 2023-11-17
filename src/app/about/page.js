"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Box padding="40px">
        <div align="center">
          <Image
            src="/college-student-packed.jpg"
            alt="Image of stuckents packing"
            width={750}
            height={500}
          />
        </div>
        <h1 style={{ textAlign: "center" }}>
          <strong>About Us</strong>
        </h1>
        <p style={{ textAlign: "center" }}>
          Have you ever moved out of your dorm or apartment and realized that
          you're throwing away a lot of stuff that can be reused? Have you tried
          to give away your stuff but struggled finding someone that wants it?
          SLOMarketplace is here to help! Initially though up by Jadon,
          SLOMarketpalce serves as a digital market platform tailored
          specifically for the student body of California Polytechnic State
          University, San Luis Obispo. We aim to facilitate peer-to-peer
          transactions, primarily focusing on the trade and giveaway of
          furnishings, home appliances, decoratives, and similar material
          assets. Designed with a community-centric ethos, the platform aspires
          not only to simplify asset exchange but also to foster a tightly-knit
          network of trust and cooperation among its user base. Sign up and
          connect with other Cal Poly students that are in the same position.
          Look for students that want your stuff or browse what other students
          are giving away!
        </p>
      </Box>
    </>
  );
}
