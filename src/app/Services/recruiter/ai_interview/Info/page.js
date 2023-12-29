"use client";
import React from "react";
import Interviewer from "../../../components/dashboard/Interviewer";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import Image from "next/image";
import ToneAnalysis from "public/images/fer_output.png";
const page = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <BaseCard title="Tone Analysis">
            <Image
              src={ToneAnalysis}
              alt="Tone Nalysis Report"
              style={{ width: "100%", height: "100%" }}
            />
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <BaseCard title="Candidates Details">
            <Interviewer />
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Questionaries Responces"></BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default page;
