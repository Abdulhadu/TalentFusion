"use client";
import React, { useState } from "react";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import ApplicationCandidate from "@/app/Services/components/dashboard/AppliedCandidate";

const HirringStep1 = () => {
  return (
    <>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Step #1">
          <ApplicationCandidate />
        </BaseCard>
      </Grid>
    </>
  );
};

export default HirringStep1;
