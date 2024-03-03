"use client";
import { React, useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Stack,
  TableContainer,
  IconButton,
  LinearProgress,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";


const AppliedCandidate = () => {
  const [cvData, setCVData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/extractcv",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCVData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CV data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <BaseCard title="Application Tracking">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
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
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Major Subjects
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Actions
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
                    {cv.skills}
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
                    {cv.degree_level}
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
                    {cv.majors}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={2}>
                    <IconButton color="primary">
                      <MailOutlineIcon />
                    </IconButton>
                    <IconButton color="error">
                      <ThumbDownAltIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default AppliedCandidate;
