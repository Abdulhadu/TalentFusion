"use client";
import React, { useState } from "react";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import Job_resume_matching from "@/app/Services/components/dashboard/Job_resume_matching";
<<<<<<< HEAD
import PrivateRoute from "../../components/dashboard/PrivateRoute";
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131

const HirringStep2 = () => {
  return (
    <>
    <Grid item xs={12} lg={12}>
      <BaseCard title="Step #2">
        <Job_resume_matching />
      </BaseCard>
    </Grid>
  </>
  )
}

export default HirringStep2