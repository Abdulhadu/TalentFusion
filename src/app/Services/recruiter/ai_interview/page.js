"use client";
import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
<<<<<<< HEAD
import PrivateRoute from "../../components/dashboard/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131

// UserCard component
const UserCard = ({ candidate }) => {
  const [evaluationReady, setEvaluationReady] = useState(false);
<<<<<<< HEAD
  const [emailSent, setEmailSent] = useState(false);

=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  useEffect(() => {
    const checkEvaluationData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/check_evaluation_data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ candidate_id: candidate.ID }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data is", data);
        setEvaluationReady(data.evaluation_data_ready);
      } catch (error) {
        console.error("Error checking evaluation data:", error);
      }
    };

    checkEvaluationData();
  }, [candidate]);

<<<<<<< HEAD
  const handleButtonClick = async (action) => {
    try {
      const apiEndpoint =
        action === "accept"
          ? "http://127.0.0.1:5328/recruiter/accept"
          : "http://127.0.0.1:5328/recruiter/reject";

      const requestData = {
        id: candidate.ID,
        name: candidate.name,
        email: candidate.email,
        job_id: candidate.job_id, 
      };
      

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success(`Email is sent successfully to the candidate: ${candidate.name}!`);
      setEmailSent(true);
    } catch (error) {
      toast.error(`Error handling ${action} request for candidate: ${candidate.name}!`);
      console.error(`Error handling ${action} request:`, error.message);
    }
  };

  return (
    <PrivateRoute userType="recruiter">
      <Card>
        <CardContent>
          <Typography variant="h6">{candidate.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {candidate.email}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Button
              href={`/Services/recruiter/ai_interview/${candidate.ID}`}
              passHref
              variant="contained"
              color="primary"
              disabled={!evaluationReady}
            >
              Evaluate Now
            </Button>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Accept All">
                <IconButton
                  onClick={() => handleButtonClick("accept")}
                  color="primary"
                  disabled={emailSent}
                >
                  <MailOutlineIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reject All">
                <IconButton
                  onClick={() => handleButtonClick("reject")}
                  color="error"
                  disabled={emailSent}
                >
                  <ThumbDownAltIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </PrivateRoute>
=======
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{candidate.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {candidate.email}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Button
            href={`/Services/recruiter/ai_interview/${candidate.ID}`}
            passHref
            variant="contained"
            color="primary"
            disabled={!evaluationReady}
          >
            Evaluate Now
          </Button>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Accept All">
            <IconButton color="primary">
              <MailOutlineIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Reject All">
            <IconButton color="error">
              <ThumbDownAltIcon />
            </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  );
};

// DashboardPage component
const DashboardPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
=======
  // Fetch shortlisted candidates data
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/shortlisted_candidates",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCandidates(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching shortlisted candidates data:",
          error.message
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
<<<<<<< HEAD
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
=======
          height: "100vh", // Make the box cover the entire viewport height
          display: "flex",
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
        }}
      >
        <CircularProgress color="primary" variant="indeterminate" />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
<<<<<<< HEAD
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
      {candidates.map((candidate) => (
        <Grid key={candidate.id} item xs={12} sm={6} md={4}>
          <UserCard candidate={candidate} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
