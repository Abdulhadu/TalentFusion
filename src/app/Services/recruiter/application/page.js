'use client'
import React, { useState } from "react";
import {
  Paper,
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";


const Page = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    jobTitle: "Nirav Joshi",
    venue: "",
    description: "Default Value",
    salary: "",
  });

  // State to manage API response
  const [apiResponse, setApiResponse] = useState(null);

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Make API request using fetch
      const response = await fetch("http://127.0.0.1:5328/recruiter/post_job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse and set the API response
      const data = await response.json();
      setApiResponse(data);

      // Clear the form data if needed
      // setFormData({
      //   jobTitle: "",
      //   venue: "",
      //   description: "",
      //   salary: "",
      // });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Post Job Vacancy">
          <>
            <Stack spacing={3}>
              <TextField
                name="jobTitle"
                label="Job Title"
                variant="outlined"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />

              <TextField
                name="venue"
                label="Venue"
                type="text"
                variant="outlined"
                value={formData.venue}
                onChange={handleInputChange}
              />
              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={formData.description}
                onChange={handleInputChange}
              />
              <TextField
                name="salary"
                label="Salary"
                type="number"
                variant="outlined"
                value={formData.salary}
                onChange={handleInputChange}
              />
            </Stack>
            <br />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </>
        </BaseCard>
      </Grid>

     

      {/* Display API response if available */}
      {apiResponse && (
        <Grid item xs={12}>
          <Paper>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default Page;
