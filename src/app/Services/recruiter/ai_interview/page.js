"use client";
import React, { useState, useEffect } from "react";
import { Paper, Grid, Card, CardContent, Typography, Button, IconButton, Stack ,Box, CircularProgress} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

// UserCard component
const UserCard = ({ candidate }) => {
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
          <Button variant="contained" color="primary">
            Evaluate Now
          </Button>
          <Stack direction="row" spacing={2}>
            <IconButton color="primary">
              <MailOutlineIcon />
            </IconButton>
            <IconButton color="error">
              <ThumbDownAltIcon />
            </IconButton>
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
        console.error("Error fetching shortlisted candidates data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
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