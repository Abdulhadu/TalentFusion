import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import BallotIcon from "@mui/icons-material/Ballot";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { spacing } from '@mui/system';

const UserOverview = () => {
  return (
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
            <Box  sx={{ mb: 3}}>
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
                    background: "#eeeeee",
                    letterSpacing: "2px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "3px",
                    borderRadius: "8px",
                  }}
                >
                  Abdul Hadi
                </span>
              </Typography>
            </Box>
            <Box  sx={{ mb: 3}}>
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
                    background: "#eeeeee",
                    letterSpacing: "2px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "3px",
                    borderRadius: "8px",
                  }}
                >
                  Hadi@27767@gmail.com
                </span>
              </Typography>
            </Box>
            <Box  sx={{ mb: 3}}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <ArrowCircleRightIcon color="secondary" />
                PHone No:{" "}
                <span
                  style={{
                    background: "#eeeeee",
                    letterSpacing: "2px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "3px",
                    borderRadius: "8px",
                  }}
                >
                  0313 7707410
                </span>
              </Typography>
            </Box>
            <Box  sx={{ mb: 3}}>
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
                    background: "#eeeeee",
                    letterSpacing: "2px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "3px",
                    borderRadius: "8px",
                  }}
                >
                  2 Pages
                </span>
              </Typography>
            </Box>
            <Box  sx={{ mb: 3}}>
              <Typography
                variant="subtitle1"
                display="flex"
                alignItems="center"
                gutterBottom
              >
                <ArrowCircleRightIcon color="secondary" />
                Catergory:{" "}
                <span
                  style={{
                    background: "#eeeeee",
                    letterSpacing: "2px",
                    marginLeft: "3px",
                    paddingLeft: "5px",
                    paddingRight: "3px",
                    borderRadius: "8px",
                  }}
                >
                  Fresh
                </span>
              </Typography>
            </Box>
            <Box sx={{ mb: 3}}>
              <Alert severity="success">
                Our Analysis Say that You are a Web Developer...!
              </Alert>
            </Box>
          </TableHead>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default UserOverview;
