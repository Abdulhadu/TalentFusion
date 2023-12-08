'use client'
import React, { useState } from "react";

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
    <div>
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
