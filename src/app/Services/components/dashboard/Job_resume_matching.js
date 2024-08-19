'use client'
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  TableContainer,
  LinearProgress,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======


>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
const Job_resume_matching = () => {
  const [cvData, setCVData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/matching",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
<<<<<<< HEAD
        toast.success('Resume Job Matching Completed Successfully..!');
        setCVData(data);
      } catch (error) {
        console.error("Error fetching CV data:", error.message);
        toast.error("Failed to fetch matching results. Please try again later.");
=======
        setCVData(data);
      } catch (error) {
        console.error("Error fetching CV data:", error.message);
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (

    <>
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
      <BaseCard title="Job & Resume Application Matching Stats">
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
                    Name
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
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Degree & Job Matching
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Major & Job Matching
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Skill Job Semantic Matching
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Matching Scores
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    Job index
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cvData.map((cv) => (
                <TableRow key={cv.ID}>
                  <TableCell>
                    <Typography fontSize="15px" fontWeight={500}>
                      {cv.ID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {cv.name}
                        </Typography>
                        <Typography color="textSecondary" fontSize="13px">
                          {cv.email}
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
                      {cv.skills.join(", ")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {cv.degree_level}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6"
                      sx={{
                        maxWidth: "80px", // Adjust the value as needed
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {cv["matching score job 0"]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6"
                      sx={{
                        maxWidth: "80px", // Adjust the value as needed
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {cv["Major job 0 matching"]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6"
                      sx={{
                        maxWidth: "80px", // Adjust the value as needed
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {cv["Skills job 0 semantic matching"]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6"
                      sx={{
                        maxWidth: "80px", // Adjust the value as needed
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {cv["matching score job 0"]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6"
                      sx={{
                        maxWidth: "80px", // Adjust the value as needed
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {cv["job index"]}
                    </Typography>
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

export default Job_resume_matching;
