// HardSkills.js
import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import BaseCard from "../shared/DashboardCard";

const HardSkills = ({ data }) => {
  const skills = data && data.actual_skills ? data.actual_skills : [];

  return (
    <BaseCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          User Skills
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
    >
      <Paper
        elevation={3}
        sx={{
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.map((skill, index) => (
            <Chip key={index} label={skill} />
          ))}
        </div>
      </Paper>
    </BaseCard>
  );
};

export default HardSkills;
