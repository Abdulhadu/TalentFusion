'use client';
import React from 'react';
import BaseCard from '../shared/DashboardCard';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const Progress = () => {
  const currentSkill = 75; // Change this value to the desired progress percentage

  return (
    <BaseCard title="Product Performance">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            size="12rem" // Adjust the size as needed
            color="secondary"
            thickness={5}
            value={currentSkill}
            sx={{ '& svg': { animation: 'none' } }}
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
            <Typography variant="h1" color="textSecondary" fontSize="30">
              {`${currentSkill}%`}
            </Typography>
          </Box>
          
        </Box>
        <Typography variant="h1" color="textSecondary" fontSize="30">
              ATS Scores
            </Typography>

            <Box width="100%" mt={2}>
          <Typography variant="h6" color="textSecondary" align="left">
            Hard Skills
          </Typography>
          <LinearProgress
            variant="determinate"
            value={40}
            sx={{ height: 15 }}
            color="primary"
          />
        </Box>
        <Box width="100%" mt={2}>
          <Typography variant="h6" color="textSecondary" align="left">
            Soft Skills
          </Typography>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{ height: 15 }}
            color="secondary"
          />
        </Box>
      </Box>
    </BaseCard>
  );
};

export default Progress;
