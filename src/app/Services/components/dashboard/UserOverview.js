import React from "react";
import {
  Typography,
  Box,
  Table,
  TableHead,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Alert from "@mui/material/Alert";
import { Helmet } from "react-helmet-async";

const UserOverview = ({ data }) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sometype+Mono:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <BaseCard title="User Overview">
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
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                  gutterBottom
                >
                  <ArrowCircleRightIcon color="secondary" />
                  User Name:{" "}
                  <span
                    style={{
                      fontFamily: "Sometype Mono",
                      background: "#eeeeee",
                      letterSpacing: "2px",
                      marginLeft: "3px",
                      paddingLeft: "5px",
                      paddingRight: "3px",
                      borderRadius: "8px",
                    }}
                  >
                    {data.name}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                  gutterBottom
                >
                  <ArrowCircleRightIcon color="secondary" />
                  Email Address:{" "}
                  <span
                    style={{
                      fontFamily: "Sometype Mono",
                      background: "#eeeeee",
                      letterSpacing: "2px",
                      marginLeft: "3px",
                      paddingLeft: "5px",
                      paddingRight: "3px",
                      borderRadius: "8px",
                    }}
                  >
                    {data.email}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                  gutterBottom
                >
                  <ArrowCircleRightIcon color="secondary" />
                  Phone No:{" "}
                  <span
                    style={{
                      fontFamily: "Sometype Mono",
                      background: "#eeeeee",
                      letterSpacing: "2px",
                      marginLeft: "3px",
                      paddingLeft: "5px",
                      paddingRight: "3px",
                      borderRadius: "8px",
                    }}
                  >
                    {data.mobile_number}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                  gutterBottom
                >
                  <ArrowCircleRightIcon color="secondary" />
                  No Of Pages:{" "}
                  <span
                    style={{
                      fontFamily: "Sometype Mono",
                      background: "#eeeeee",
                      letterSpacing: "2px",
                      marginLeft: "3px",
                      paddingLeft: "5px",
                      paddingRight: "3px",
                      borderRadius: "8px",
                    }}
                  >
                    {data.no_of_pages} Pages
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  display="flex"
                  alignItems="center"
                  gutterBottom
                >
                  <ArrowCircleRightIcon color="secondary" />
                  Category:{" "}
                  <span
                    style={{
                      fontFamily: "Sometype Mono",
                      background: "#eeeeee",
                      letterSpacing: "2px",
                      marginLeft: "3px",
                      paddingLeft: "5px",
                      paddingRight: "3px",
                      borderRadius: "8px",
                    }}
                  >
                    {data.category}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Alert severity="success">
                  Our Analysis Say that You are a {data.reco_field}...!
                </Alert>
              </Box>
            </TableHead>
          </Table>
        </TableContainer>
      </BaseCard>
    </>
  );
};

export default UserOverview;
