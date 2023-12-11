"use client";
import React, { useState } from "react";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import CandidateSelection from "@/app/Services/components/dashboard/CandidateSelection";

const HirringStep3 = () => {
  return (
    <>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Step #2">
          <CandidateSelection />
        </BaseCard>
      </Grid>
    </>
  );
};

export default HirringStep3;
