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
import React, { useState } from "react";

const page = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (resumeFile) {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      try {
        const response = await fetch(
          "http://127.0.0.1:5328/user/analyze_resume",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAnalysisResult(result);
        } else {
          console.error("Error analyzing resume");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("No resume file selected");
    }
  };
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
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
