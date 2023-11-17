"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/Services/components/container/PageContainer";
import Recomendation from "@/app/Services/components/dashboard/Recomendation";
import UserOverview from "@/app/Services/components/dashboard/UserOverview";
import HardSkills from "@/app/Services/components/dashboard/HardSkills";
import SoftSkills from "@/app/Services/components/dashboard/SoftSkills";
import BaseCard from "../../components/shared/BaseCard";
import CoursesRecomendation from "@/app/Services/components/dashboard/CoursesRecomendation";
import Progress from "../../components/dashboard/Preogress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React from "react";

const page = () => {
  const steps = [
    "Add resume For Analyzing",
    "Add suggestions below to your resume",
    "Upload resume & rescan",
  ];
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={12}>
          <BaseCard 
     >
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            </BaseCard>
           
          </Grid>
          <Grid item xs={12} lg={8}>
            <UserOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Progress />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Recomendation />
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={8}>
            <HardSkills />
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={8}>
            <SoftSkills />
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={8}>
            <CoursesRecomendation />
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default page;
