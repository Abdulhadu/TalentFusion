"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Paper, Grid, Stack, TextField } from "@mui/material";
import { Dialog, DialogContent, Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const LoadingBar = ({ progress }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    width: "80%", // Adjust the width as needed
    height: 18,
    borderRadius: 5,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prevProgress) =>
        prevProgress < progress ? prevProgress + 1 : prevProgress
      );
    }, 150);

    return () => {
      if (currentProgress > 100) {
        clearInterval(interval);
      }
    };
  }, [progress, currentProgress]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs mt-6 font-semibold text-cyan-600 mb-1">
        Uploading...
      </p>
      <BorderLinearProgress variant="determinate" value={currentProgress} />;
      <p className="text-lg font-semibold text-blue-700 mt-1">{`${currentProgress}%`}</p>
    </div>
  );
};
const Modal = ({ open, onClose, onSubmit }) => {
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];

    // Set the file name in the state
    setResumeFileName(selectedFile ? selectedFile.name : "");
    setResumeFile(selectedFile);
    // setResumeFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (resumeFile) {
      const formData = new FormData();
      formData.append("resume", resumeFile);

      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:5328/user/Job_Recomendation",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAnalysisResult(result);
          onSubmit(result);
          onClose();
        } else {
          console.error("Error analyzing resume");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No resume file selected");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent>
        <Box sx={{ width: 800 }}>
          <h2 className="text-center font-semibold">
            Search Job by Submiting your Resume
          </h2>
          <form
            method="POST"
            onSubmit={handleUpload}
            encType="multipart/form-data"
          >
            <div className="mt-4 relative">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-500 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="relative flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-cyan-100">
                  {/* Cyan-200 colored circle */}
                  <img
                    src="https://static.jobscan.co/images/homePage/document.svg"
                    alt="Document"
                    className="w-8 h-8 text-gray-500"
                  />
                </div>
                {loading ? (
                  <>
                    <LoadingBar progress={100} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center mb-4 justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-500 ">
                        {resumeFileName ? (
                          <span className="font-semibold">
                            {resumeFileName}
                          </span>
                        ) : (
                          <span className="font-semibold ">
                            Click to upload
                          </span>
                        )}
                        <br />
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 ">
                        PDF, Docs, JPG (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <button
                      className="absolute bottom-4 mt-4 bg-gray-50 hover:bg-cyan-600 focus:bg-cyan-500 text-cyan-500 hover:text-white focus:text-white border border-cyan-500 font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Analyze Resume
                    </button>
                  </>
                )}
              </label>

              <img
                src="https://static.jobscan.co/images/homePage/joe_bot.png"
                alt="Joe Bot"
                className="absolute bottom-0 right-0 w-40 h-40"
              />
            </div>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
