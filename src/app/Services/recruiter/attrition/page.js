"use client";
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Grid, Box } from "@mui/material";
import PrivateRoute from "../../components/dashboard/PrivateRoute";
import AttritonForm from "../../components/dashboard/AttritionForm";

const Page = () => {
  return (
    <PrivateRoute userType="recruiter">
      <Grid item xs={12} lg={12}>
          <AttritonForm />
      </Grid>
=======
import PrivateRoute from "../../components/dashboard/PrivateRoute";

const Page = () => {
 
  return (
    <PrivateRoute userType="recruiter">
      <div>
        <h1>Welcome to the Attrition page</h1>
      </div>
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
    </PrivateRoute>
  );
};

export default Page;
