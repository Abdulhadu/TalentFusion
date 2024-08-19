"use client";
import React from "react";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import LinearStepper from "./components/stepper";
import PrivateRoute from "../../components/dashboard/PrivateRoute";

const page = () => {
  return (
    <>
    <PrivateRoute userType="recruiter">
      <LinearStepper />
      </PrivateRoute>
    </>
  );
};

export default page;
