'use client'
import React, { useState, useEffect } from "react";
import BaseCard from "../shared/DashboardCard";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";

const Progress = ({ resume_score }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [finalProgress, setFinalProgress] = useState(resume_score);

  useEffect(() => {
    // Simulating data fetching or processing
    const fetchData = () => {
      let progress = 0;
      const interval = 20; // Set the desired interval in milliseconds

      const updateProgress = () => {
        setCurrentSkill((prevProgress) => {
          const newProgress = prevProgress + 1;
          return newProgress <= finalProgress ? newProgress : finalProgress;
        });
      };

      const progressInterval = setInterval(() => {
        updateProgress();
      }, interval);

      // Replace this with your actual data fetching logic
      setTimeout(() => {
        clearInterval(progressInterval);
      }, 2000); // Simulating a delay of 2 seconds
    };

    fetchData();
  }, [finalProgress]);

  const transitionDuration = 1000; // Set the desired transition duration in milliseconds

  return (
    <BaseCard title="Analyzer Scores">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Slide
          direction="up"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={transitionDuration}
        >
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              size="12rem" // Adjust the size as needed
              color="secondary"
              thickness={5}
              value={currentSkill}
              sx={{ "& svg": { animation: "none" } }}
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="absolute"
            >
              <Typography
                variant="h1"
                color="secondary"
                fontWeight="fontWeightBold"
              >
                {`${currentSkill}%`}
              </Typography>
            </Box>
          </Box>
        </Slide>
        <Typography variant="h1" color="textSecondary" fontSize="30">
          ATS Scores
        </Typography>

        <Box width="100%" mt={2}>
          <Typography variant="h6" color="textSecondary" align="left">
            Hard Skills
          </Typography>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={transitionDuration}
          >
            <LinearProgress
              variant="determinate"
              value={40}
              sx={{ height: 15 }}
              color="primary"
            />
          </Slide>
        </Box>
        <Box width="100%" mt={2}>
          <Typography variant="h6" color="textSecondary" align="left">
            Soft Skills
          </Typography>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={transitionDuration}
          >
            <LinearProgress
              variant="determinate"
              value={70}
              sx={{ height: 15 }}
              color="secondary"
            />
          </Slide>
        </Box>
      </Box>
    </BaseCard>
  );
};

export default Progress;
