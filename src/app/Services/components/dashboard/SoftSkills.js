import React from "react";
import BaseCard from "../shared/DashboardCard";
import Chip from "@mui/material/Chip";

const SoftSkills = () => {
  return (
    <BaseCard
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          Soft Skills
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
    ></BaseCard>
  );
};

export default SoftSkills;
