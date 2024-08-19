import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const AttritionTable = ({ predictionData, additionalInfo }) => {
  // Initialize state to track whether all rows are visible or not
  const [showAllRows, setShowAllRows] = useState(false);

  // Define the number of rows to initially display
  const initialRowCount = 4;

  // Check if additionalInfo is null or undefined, and return an empty object if it is
  const infoKeys = additionalInfo ? Object.keys(additionalInfo) : [];

  // Slice the keys of additionalInfo based on visibility state
  const visibleKeys = showAllRows
    ? infoKeys
    : infoKeys.slice(0, initialRowCount);

  // Function to toggle visibility of all rows
  const toggleShowAllRows = () => {
    setShowAllRows(!showAllRows);
  };

  const getChipProps = (prediction) => {
    return {
      color: prediction === 0 ? "primary" : "secondary",
      label:
        prediction === 0
          ? "Employee might Not leave the job"
          : "Employee might leave the Job",
    
    };
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ fontWeight: "bold" }}
            >
              Employee Company Records
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold" }}
            >
              Information
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render visible additional info rows */}
          {visibleKeys.map((key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell>{additionalInfo[key]}</TableCell>
            </TableRow>
          ))}
          {/* Render "Read More" button if additional rows are present */}
          {infoKeys.length > initialRowCount && (
            <TableRow>
              <TableCell>
                <button onClick={toggleShowAllRows}>
                  {showAllRows ? "Show Less" : "Read More"}
                </button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Render prediction result as table heading */}
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              style={{ fontWeight: "bold" }}
            >
              Prediction Result
            </TableCell>
            <TableCell>
              {/* Render chip with prediction result */}
              {predictionData !== null && (
                <Chip {...getChipProps(predictionData)} />
              )}
              {predictionData === 1 && <MailOutlineIcon />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttritionTable;
