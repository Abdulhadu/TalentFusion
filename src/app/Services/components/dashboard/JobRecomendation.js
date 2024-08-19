'use client'
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobRecomendation = () => {
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
          "http://127.0.0.1:5328/user/Job_Recomendation",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          toast.success('Recomended job are fetched successfully..!', {
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
          toast.error('Error Analysing the Resume for Jobs..!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("No resume file selected");
    }
  };

  return (
    <div>
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
      <form method="POST" onSubmit={handleUpload} encType="multipart/form-data">
        <input type="file" name="resume" onChange={handleChange} />
        <button type="submit">Recomend Jobs</button>
      </form>

      {analysisResult && (
        <div>
          <h2>Analysis Result:</h2>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JobRecomendation;
