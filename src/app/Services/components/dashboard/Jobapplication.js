"use client";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PaidIcon from "@mui/icons-material/Paid";
import Company_details from "@/app/Services/components/dashboard/company_details"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Jobapplication = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (resumeFile) {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/submitcv",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          toast.success('Your documents are submitted successfully..!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setAnalysisResult(result);

        } else {
          console.error("Error analyzing resume");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("No resume file selected");
    }
  };

  return (
    <>
     <ToastContainer
          position="bottom-center"
          autoClose={5006}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div>
       <Company_details/>
      </div>

      <div>
        <div className="mx-auto lg:mt-8 max-w-xs">
          <form
            method="POST"
            onSubmit={handleUpload}
            encType="multipart/form-data"
          >
            <label
              for="example1"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Upload file
            </label>
            <input
              id="example1"
              type="file"
              onChange={handleChange}
              className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            />
            <button
              type="submit"
              className=" mx-auto mt-5 max-w-xs nline-flex items-center h-10 w-full px-5 text-indigo-100 transition-colors duration-150 bg-teal-500 rounded-lg focus:shadow-outline hover:bg-teal-600"
            >
              <span className="m-auto text-center text-white text-lg font-medium">
                Submit Your CV{" "}
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Jobapplication;
