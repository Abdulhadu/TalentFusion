"use client";
import React, { useState } from "react";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import Joblist from "@/app/Services/components/dashboard/Joblist";
import Jobapplication from "@/app/Services/components/dashboard/Jobapplication";

const Page = () => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <BaseCard title="Job Vacancy"><Joblist/> </BaseCard>
      </Grid>
      <Grid item xs={12} lg={4}>
        <BaseCard title="Apply For JOB"> <Jobapplication/></BaseCard>
      </Grid>
    </Grid>
  );
};

export default Page;
