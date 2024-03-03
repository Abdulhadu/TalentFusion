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

// UserCard component
const UserCard = ({ candidate }) => {
  const [evaluationReady, setEvaluationReady] = useState(false);
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
  );
};

// DashboardPage component
const DashboardPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch shortlisted candidates data
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
          height: "100vh", // Make the box cover the entire viewport height
          display: "flex",
          alignItems: "center", // Center items vertically
          justifyContent: "center", // Center items horizontally
        }}
      >
        <CircularProgress color="primary" variant="indeterminate" />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {candidates.map((candidate) => (
        <Grid key={candidate.id} item xs={12} sm={6} md={4}>
          <UserCard candidate={candidate} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
