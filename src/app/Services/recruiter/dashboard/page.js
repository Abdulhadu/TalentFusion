'use client';
import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import WorkIcon from '@mui/icons-material/Work';
import StartIcon from '@mui/icons-material/PlayCircleOutline';
import ProcessIcon from '@mui/icons-material/Autorenew';
import InterviewIcon from '@mui/icons-material/RecordVoiceOver';
import SelectionIcon from '@mui/icons-material/HowToReg';
import PrivateRoute from "../../components/dashboard/PrivateRoute";

const GradientText = styled('h1')({
  background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '3rem',
  textAlign: 'center',
  marginBottom: '2rem',
});

const CardStyled = styled(Card)(({ bgcolor }) => ({
  background: bgcolor,
  color: '#fff',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  },
}));

const iconStyle = {
  fontSize: '3rem',
};

const Dashboard = () => {
  return (
    <>
    <PrivateRoute userType="recruiter">
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <GradientText>Welcome Recruiter</GradientText>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/Services/recruiter/attrition" passHref>
            <CardActionArea>
              <CardStyled bgcolor="linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)">
                <CardContent>
                  <WorkIcon style={iconStyle} />
                  <Typography variant="h5" component="div">
                    Employee Attrition
                  </Typography>
                </CardContent>
              </CardStyled>
            </CardActionArea>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/Services/recruiter/application" passHref>
            <CardActionArea>
              <CardStyled bgcolor="linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)">
                <CardContent>
                  <StartIcon style={iconStyle} />
                  <Typography variant="h5" component="div">
                    Start Application
                  </Typography>
                </CardContent>
              </CardStyled>
            </CardActionArea>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link href="/Services/recruiter/hirring" passHref>
            <CardActionArea>
              <CardStyled bgcolor="linear-gradient(45deg, #66BB6A 30%, #43A047 90%)">
                <CardContent>
                  <ProcessIcon style={iconStyle} />
                  <Typography variant="h5" component="div">
                    Ongoing Hiring Process
                  </Typography>
                </CardContent>
              </CardStyled>
            </CardActionArea>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Link href="/Services/recruiter/ai_interview" passHref>
            <CardActionArea>
              <CardStyled bgcolor="linear-gradient(45deg, #FF7043 30%, #FF5722 90%)">
                <CardContent>
                  <InterviewIcon style={iconStyle} />
                  <Typography variant="h5" component="div">
                    AI Interview
                  </Typography>
                </CardContent>
              </CardStyled>
            </CardActionArea>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Link href="/Services/recruiter/selection" passHref>
            <CardActionArea>
              <CardStyled bgcolor="linear-gradient(45deg, #AB47BC 30%, #8E24AA 90%)">
                <CardContent>
                  <SelectionIcon style={iconStyle} />
                  <Typography variant="h5" component="div">
                    Candidate Selection
                  </Typography>
                </CardContent>
              </CardStyled>
            </CardActionArea>
          </Link>
        </Grid>
      </Grid>
    </Box>
    </PrivateRoute>
    </>
  );
}

export default Dashboard;
