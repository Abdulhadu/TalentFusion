// Recomendation.js

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DashboardCard from "../shared/DashboardCard";
import Chip from "@mui/material/Chip";

const Recomendation = ({ data }) => {
  const { recommendations } = data;

  return (
    <DashboardCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          Recommended Updates
          <Chip
            sx={{
              pl: "4px",
              pr: "4px",
              ml: "20px",
              backgroundColor: "primary.main",
              color: "#fff",
            }}
            size="small"
            label="IMPORTANT"
          />
        </div>
      }
    >
      <Timeline
        sx={{
          p: 0,
        }}
      >
        {recommendations.map((recommendation, index) => (
          <TimelineItem key={index}>
            {/* You may adjust the following styling as needed */}
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {/* You may adjust the styling as needed */}
              {/* Display time or any other information if available */}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  borderColor: "primary.main", // You may adjust the color as needed
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              {recommendation}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default Recomendation;
