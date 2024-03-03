"use client";
import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import BaseCard from "../shared/DashboardCard";

const SoftSkills = ({ data }) => {
  const skills = data && data.recomended_skills ? data.recomended_skills : [];
  const peachColor = "#FFDAB9";
  return (
    <BaseCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          Recomended Skills
          <Chip
            sx={{
              pl: "4px",
              pr: "4px",
              ml: "20px",
              backgroundColor: "#424242",
              color: "#fff",
            }}
            size="small"
            label="LOW SCORE IMPACT"
          />
        </div>
      }
    >
      {" "}
      <Paper
        elevation={3}
        sx={{
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {skills.map((skill, index) => (
            <Chip
              sx={{ backgroundColor: peachColor }}
              key={index}
              label={skill}
            />
          ))}
        </div>
      </Paper>
    </BaseCard>
  );
};

export default SoftSkills;
