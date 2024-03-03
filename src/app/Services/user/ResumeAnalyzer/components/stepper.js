// LinearStepper.js
import React, { useState } from "react";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Grid,
} from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import ResumeStep1 from "../ResumeStep1";
import ResumeStep2 from "../ResumeStep2";
import ThankYou from "@/app/Services/components/dashboard/ThankYou";

const LinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const steps = getSteps();

  function getSteps() {
    return [
      "Add resume For Analyzing",
      "Add suggestions below to your resume",
      "Upload resume & rescan",
    ];
  }

  const handleResumeSubmit = (result) => {
    setAnalysisResult(result);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };

  const handleNext = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <BaseCard>
            <Stepper activeStep={activeStep}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </BaseCard>
        </Grid>
        {activeStep === 0 && (
          <ResumeStep1 onSubmit={handleResumeSubmit} />
        )}
        {activeStep === 1 && (
          <ResumeStep2 analysisResult={analysisResult} />
        )}
        {activeStep === 2 && (
          <Grid item xs={12} lg={12}>
            <BaseCard>
              <ThankYou text="Thankyou for using Resume ANalyzer" />
            </BaseCard>
          </Grid>
        )}
        {activeStep !== 2 && activeStep !== 0 && (
          <Grid item xs={12} lg={12}>
            <BaseCard>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Rescan
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                 Finish
                </Button>
              </Stack>
            </BaseCard>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default LinearStepper;
