import React, { useState } from "react";

const SkillBasedJob = () => {
  const [skills, setskills] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleChange = (event) => {
    setskills(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (skills) {
      const formData = new FormData();
      formData.append("skills", skills);

      try {
        const response = await fetch(
          "http://127.0.0.1:5328/Skill_based_recomendation",
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
        <label>Add Skiils to Get see the Relevant Jobs</label>
        <br></br>
        <input
          type="text"
          name="list_jobs"
          value={skills}
          onChange={handleChange}
        />
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

export default SkillBasedJob;
