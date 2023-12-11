'use client'
import { useState } from "react";
import React from "react";

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
      <img
        className="w-32 h-32 rounded-full mx-auto"
        src="https://picsum.photos/200"
        alt="Profile picture"
      ></img>
      <h2 className="text-center text-2xl font-semibold mt-3">John Doe</h2>
      <p className="text-center text-gray-600 mt-1">Software Engineer</p>

      <div className="mt-5">
        <p className="text-gray-600 mt-2">24 August 2024</p>
        <p className="text-gray-600 mt-2">London, Morgon LM-1890</p>
        <p className="text-gray-600 mt-2">Salary: 20,000rs</p>
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
              className=" mx-auto lg:mt-5 max-w-xs nline-flex items-center h-10 w-full px-5 text-indigo-100 transition-colors duration-150 bg-teal-500 rounded-lg focus:shadow-outline hover:bg-teal-600"
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
