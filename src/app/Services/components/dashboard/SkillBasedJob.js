"use client";
import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import TagInput from "../dashboard/TagInput";
import { Button, IconButton, Typography } from "@mui/material";
import Modal from "../dashboard/Modal";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import JobListing from "../dashboard/JobListing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.success("Recomended job are fetched successfully..!");

          setAnalysisResult(result);
        } else {
          console.error("Error analyzing resume");
          toast.success("Fail to extract the jobs. Please try again..!");
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-yellow-300 w-full lg:h-2/6 mx-auto text-center py-20 rounded-lg">
  <div className="p-20 mt-30 flex flex-col items-center justify-center">
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
          <Typography
            variant="h1"
            style={{ fontWeight: "bold", color: "white" }}
          >
            Search Your Job Faster..
          </Typography>
          <Typography variant="h3" style={{ color: "white" }}>
            The best way to find jobs using your skills or by uploading you
            resume
          </Typography>
        </div>
        <div className="bg-white p-4 rounded-lg mt-4 w-80 md:w-4/5 mx-auto">
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
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <TagInput value={skills} onChange={handleChange} />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="pointer-events-auto">
                  <IconButton color="primary" onClick={handleOpenModal}>
                    <InsertPhotoIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-4 px-4 ml-2 text-sm font-medium text-white bg-cyan-500 rounded-lg border border-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-cyan-300"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
