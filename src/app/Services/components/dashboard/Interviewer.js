"use client";
import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const Interviewer = ({ userData }) => {
  return (
    <>
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src="/images/person-image3.jpg"
        alt="Profile picture"
      ></img>
      <h2 className="text-center text-2xl font-semibold mt-3">
        {userData.Name}
      </h2>
      <p className="text-center text-gray-600 mt-1">{userData.Designation}</p>

      <div className="mt-5">
        <div className="flex items-center mt-6">
          <EmailIcon sx={{ color: "#6B7280", fontSize: 18 }} />
          <p className="text-gray-600 mt-1 ml-2">{userData["Mobile Number"]}</p>
        </div>
        <div className="flex items-center">
          <WifiCalling3Icon sx={{ color: "#6B7280", fontSize: 18 }} />
          <p className="text-gray-600 mt-1 ml-2">{userData.Email}</p>
        </div>
        <div className="flex items-center">
          <WorkspacePremiumIcon sx={{ color: "#6B7280", fontSize: 18 }} />
          <p className="text-gray-600 mt-1 ml-2">
            {userData.Degree ? userData.Degree : "Not Specified"}
          </p>
        </div>
      </div>
      <div>
        <div className="mx-auto lg:mt-8 max-w-xs">
          <div className="border border-gray-300 p-4 mt-5">
            {/* Skills container */}
            <div className="mb-2">
              <p className="text-gray-600 font-semibold mb-1">Skills:</p>
              <Paper
                elevation={3}
                sx={{
                  padding: "16px",
                  marginTop: "16px",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {userData.Skills.split(",").map((skill, index) => (
                    <Chip key={index} label={skill} />
                  ))}
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interviewer;
