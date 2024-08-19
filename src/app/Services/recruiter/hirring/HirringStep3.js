"use client";
import React, { useState } from "react";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import CandidateSelection from "@/app/Services/components/dashboard/CandidateSelection";
import PrivateRoute from "../../components/dashboard/PrivateRoute";

const HirringStep3 = () => {
  return (
    <>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Step #3">
          <CandidateSelection />
        </BaseCard>
      </Grid>
    </>
  );
};

export default HirringStep3;
