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
import HirringStep1 from "../HirringStep1";
import HirringStep2 from "../HirringStep2";
import HirringStep3 from "../HirringStep3";
import ThankYou from "@/app/Services/components/dashboard/ThankYou";

const LinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function getSteps() {
    return [
      "Applicant Application Tracking",
      "Job-Resumes Matching",
      "Get Top Candidates",
    ];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <HirringStep1 />;
      case 1:
        return <HirringStep2 />;
      case 2:
        return <HirringStep3 />;
      default:
        return "";
    }
  }

  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
    console.log(activeStep);
  };
  const handleNext = () => {
    setActiveStep((activeStep) => activeStep + 1);
    console.log(activeStep);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <BaseCard>
            <Stepper activeStep={activeStep}>
              {steps.map((step, index) => {
                return (
                  <Step key={index}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </BaseCard>
        </Grid>
        {getStepContent(activeStep)}

        {activeStep === steps.length ? (
          <Grid item xs={12} lg={12}>
            <BaseCard>
            <ThankYou text="Email is Sent Successfully to all the selected Candidates"/>
            </BaseCard>
          </Grid>
        ) : (
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
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
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
