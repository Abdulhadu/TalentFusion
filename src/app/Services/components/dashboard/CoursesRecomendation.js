'use client'
import React from "react";
import BaseCard from "../shared/DashboardCard";
import Chip from "@mui/material/Chip";

const CoursesRecomendation = () => {
  return (
    <BaseCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          Recomended Courses
          <Chip
            sx={{
              pl: "4px",
              pr: "4px",
              ml: "20px",
              backgroundColor: "primary.main",
              color: "#fff",
            }}
            size="small"
            label="MEDIUM SCORE IMPACT"
          />
        </div>
      }
    >
    </BaseCard>
  );
};

export default CoursesRecomendation;
