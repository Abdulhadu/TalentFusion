'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <Typography>
        © 2024 All rights reserved by{" "}
        <Link href="/Services">
          TelentFussion.com
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
    