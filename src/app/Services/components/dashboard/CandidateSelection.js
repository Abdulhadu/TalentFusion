"use client";
import React, { useState, useEffect } from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Typography,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  LinearProgress,
  IconButton,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandidateSelection = () => {
  const [cvData, setCVData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/top_resumes",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        toast.success("Top Candidates are selected for the further process..!");
        setCVData(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error while selecting candidates..!");
        console.error("Error while selecting candidates data: ", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle the button click for accepting or rejecting a candidate
  const handleButtonClick = async (cv, action) => {
    try {
      // Define the API endpoint based on the action
      const apiEndpoint =
        action === "accept"
          ? "http://127.0.0.1:5328/recruiter/accept"
          : "http://127.0.0.1:5328/recruiter/reject";

      // Prepare the data to be sent in the request
      const requestData = {
        id: cv.ID,
        name: cv.Name,
        email: cv.Email,
        job_id: cv.JOb_id,
      };

      // Send the request
      const response = await fetch(apiEndpoint, {
        method: "POST", // or "PUT" or "DELETE" depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the UI or handle success as needed
      toast.success(
        "Email is Sent Succesfully to the candidate: ${cv.Name}..!"
      );
      setEmailSent((prevState) => ({ ...prevState, [cv.ID]: true }));
    } catch (error) {
      toast.error(
        "Error handling ${action} request for candidate: ${cv.Name}..!"
      );
      console.error(`Error handling ${action} request:`, error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <BaseCard title="Top Matched and Selected Resumes">
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
        <TableContainer
          sx={{
            width: {
              xs: "300px",
              sm: "100%",
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Candidate Details
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Skills
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Degree Level
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Major
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Job_ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cvData.map((cv, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {cv.ID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {cv.Name}
                        </Typography>
                        <Typography color="textSecondary" fontSize="13px">
                          {cv.Email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cv.Skills}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {cv.Degree_level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cv.Majors}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {cv.JOb_id}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Tooltip title="Accept Candidate">
                        <IconButton
                          onClick={() => handleButtonClick(cv, "accept")}
                          color="primary"
                          disabled={emailSent[cv.ID]}
                        >
                          <MailOutlineIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Reject Candidate">
                        <IconButton
                          onClick={() => handleButtonClick(cv, "reject")}
                          color="error"
                          disabled={emailSent[cv.ID]}
                        >
                          <ThumbDownAltIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseCard>
    </>
  );
};

export default CandidateSelection;
