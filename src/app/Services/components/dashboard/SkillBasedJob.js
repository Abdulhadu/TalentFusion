"use client";
import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import TagInput from "../dashboard/TagInput";
import { Button, IconButton, Typography } from "@mui/material";
import Modal from "../dashboard/Modal";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import JobListing from "../dashboard/JobListing";

const SkillBasedJob = () => {
  const [skills, setSkills] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (newSkills) => {
    setSkills(newSkills);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleResumeSubmit = (result) => {
    setAnalysisResult(result);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (skills) {
      const formData = new FormData();
      formData.append("skills", skills.join(",")); // Assuming skills is an array

      try {
        const response = await fetch(
          "http://127.0.0.1:5328/user/Skill_based_recomendation",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAnalysisResult(result);
        } else {
          console.error("Error analyzing resume");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("No skills selected");
    }
  };

  return (
    <>
      <div
        style={{
          background_color: "#4158D0",
          background: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
          width: "100%",
          height: "500px",
          margin: "auto",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            padding: "20px",
            marginTop: "40px",
            display: "flex", // Add this line to make it a flex container
            flexDirection: "column", // Align items vertically
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
              <img
              src="/images/logos/telent-fussion-logo.png"
              alt="Your Avatar"
              style={{
                width: 200,
                height: "auto",
                marginTop: 15,
                marginBottom: 15,
              }}
            />
        <Typography variant="h1" style={{ fontWeight: "bold", color: "white" }}>
          Search Your Job Faster..
        </Typography>
        <Typography variant="h3" style={{ color: "white" }}>
          The best way to find jobs using your skills or by uploading you resume
        </Typography>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            width: "80%",
            margin: "auto", // Center along the x-axis
          }}
        >
          <form
            method="POST"
            onSubmit={handleUpload}
            encType="multipart/form-data"
            className="flex items-center relative"
          >
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>

            <div className="w-full relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <TagInput value={skills} onChange={handleChange} />{" "}
              <div className="absolute inset-y-0 end-0  flex items-center pr-3 pointer-events-none">
                <div className="pointer-events-auto">
                  <IconButton color="primary" onClick={handleOpenModal}>
                    <InsertPhotoIcon />
                  </IconButton>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center py-4 px-4 ms-2 text-sm font-medium text-white bg-cyan-500 rounded-lg border border-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </form>
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleResumeSubmit}
        />
      </div>

      {analysisResult && <JobListing jobData={analysisResult} />}
    </>
  );
};

export default SkillBasedJob;
