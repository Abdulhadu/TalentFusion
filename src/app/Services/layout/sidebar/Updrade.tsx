'use client';
import React from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import sidebarBuynowsvg from "public/images/backgrounds/login-bg1 (1).png";

const Upgrade = () => (
  <Box pb={0} mt={5}>
    <Box
      pl={3}
      pr={3}
      m={3}
      textAlign="center"
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.light,
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Image
        src={sidebarBuynowsvg}
        alt="{sidebarBuynowsvg}"
        className="buyNowImg"
      />
      <Box pb={3} pt={3}>
        <Typography variant="h4" fontWeight="700" mb={2}>
          Sign Up For Free 
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          href="/Services/recruiter/c_signin"
          sx={{ marginBottom: "10px" }}
        >
          Sign IN
        </Button>

        <Button
          color="secondary"
          href="/Services/recruiter/c_signup"
          fullWidth
          disableElevation
          variant="contained"
        >
         Sign Up
        </Button>
      </Box>
    </Box>
  </Box>
);
export default Upgrade;