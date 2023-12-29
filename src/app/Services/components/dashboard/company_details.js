"use client";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PaidIcon from "@mui/icons-material/Paid";

const Company_details = () => {
  const [loading, setLoading] = useState(true);
  const [company, setcompany] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/get_company",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setcompany(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <CircularProgress color="primary" variant="indeterminate" />
      </Box>
    );
  }

  return (
    <div>
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src="https://picsum.photos/200"
        alt="Profile picture"
      ></img>
      {company.map((company, index) => (
        <>
          <h2 key={index} className="text-center text-2xl font-semibold mt-3">
            {company.name}
          </h2>
          <div className="flex items-center mt-6">
            <EmailIcon sx={{ color: "#6B7280", fontSize: 18 }} />
            <p className="text-gray-600 mt-1 ml-2">{company.email}</p>
          </div>

          <div className="flex items-center">
            <AddLocationAltIcon sx={{ color: "#6B7280", fontSize: 18 }} />
            <p className="text-gray-600 mt-1 ml-2">London, Morgon LM-1890</p>
          </div>

          <div className="flex items-center">
            <PaidIcon sx={{ color: "#6B7280", fontSize: 18 }} />
            <p className="text-gray-600 mt-1 ml-2">Salary: 20,000rs</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Company_details;
