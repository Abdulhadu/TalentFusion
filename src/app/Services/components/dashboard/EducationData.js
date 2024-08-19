"use client";
import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const EducationData = ({ data }) => {
  return (
    <>
      <div className="mt-5">
        <div className="flex items-center">
          <WorkspacePremiumIcon sx={{ color: "#6B7280", fontSize: 18 }} />
          <h2 className="text-gray-700 mt-1 ml-2 font-semibold">
            Degree Level:{" "}
          </h2>
          <p className="text-gray-600 mt-1 ml-2">{data.Degree}</p>
        </div>
        <div className="flex items-center">
          <WorkHistoryIcon sx={{ color: "#6B7280", fontSize: 18 }} />
          <h2 className="text-gray-700 mt-1 ml-2 font-semibold">
            Work Experience:{" "}
          </h2>
          <p className="text-gray-600 mt-1 ml-2">{data.total_experience} Years</p>
        </div>
        <div className="flex items-center">
          <PersonSearchIcon sx={{ color: "#6B7280", fontSize: 18 }} />
          <h2 className="text-gray-700 mt-1 ml-2 font-semibold">
            Major Subjects:{" "}
          </h2>
          <p className="text-gray-600 mt-1 ml-2">
          {data.majors.length !==0  ? data.majors : "Not Specified"} </p>
        </div>
      </div>
    </>
  );
};

export default EducationData;
