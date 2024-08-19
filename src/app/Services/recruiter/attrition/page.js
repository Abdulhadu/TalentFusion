"use client";
import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import PrivateRoute from "../../components/dashboard/PrivateRoute";
import AttritonForm from "../../components/dashboard/AttritionForm";

const Page = () => {
  return (
    <PrivateRoute userType="recruiter">
      <Grid item xs={12} lg={12}>
          <AttritonForm />
      </Grid>
    </PrivateRoute>
  );
};

export default Page;
