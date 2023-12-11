'use client'
import React from "react";
import BaseCard from "../shared/DashboardCard";
import Chip from "@mui/material/Chip";

const HardSkills = () => {
  return (
    <BaseCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          Hard Skills
          <Chip
            sx={{
              pl: "4px",
              pr: "4px",
              ml: "20px",
              backgroundColor: "secondary.main",
              color: "#fff",
            }}
            size="small"
            label="HIGH SCORE IMPACT"
          />
        </div>
      }
    ></BaseCard>
  );
};

export default HardSkills;
