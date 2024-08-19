"use client";
import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";

const Joblist = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5328/recruiter/extractJob",
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJobData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExpandToggle = (index) => {
    setExpandedDescriptions((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

<<<<<<< HEAD
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // or use a more specific format like date.toISOString().slice(0, 19).replace('T', ' ')
  };

=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  if (loading) {
    return (
      <Box sx={{ width: "100%", position: "relative" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <div className="max-w-5xl">
        <div className="p-4 border-b">
          <h2 className="text-2xl ">Job Information</h2>
          <p className="text-sm text-gray-500">Details of the job position.</p>
        </div>
        <div>
          {jobData.map((job, index) => (
            <>
              <div
<<<<<<< HEAD
                key={`job-title-${index}`}
=======
                key={index}
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
              >
                <p className="text-gray-600">Job Title</p>
                <p>{job.job_title}</p>
              </div>
              <div
<<<<<<< HEAD
                key={`application-for-${index}`}
=======
                key={index}
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
              >
                <p className="text-gray-600">Application for</p>
                <p>{job.job_title}</p>
              </div>
              <div
<<<<<<< HEAD
                key={`job-location-${index}`}
=======
                key={index}
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
              >
                <p className="text-gray-600">Job Location</p>
                <p>{job["job-location"]}</p>
              </div>
              <div
<<<<<<< HEAD
                key={`job-salary-${index}`}
=======
                key={index}
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
              >
                <p className="text-gray-600">Job Salary</p>
                <p>{`$ ${job.job_salary}`}</p>
              </div>
              <div
<<<<<<< HEAD
                key={`job-description-${index}`}
=======
                key={index}
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
              >
                <p className="text-gray-600">Job Description</p>
                <div className="job-description">
                  {expandedDescriptions[index]
                    ? job.job_description
                    : `${job.job_description.substring(0, 8 * 50)}...`}
                  <span
<<<<<<< HEAD
                    className="read-more cursor-pointer text-blue-500 hover:text-blue-800 hover:underline"
=======
                    className="read-more cursor-pointer text-blue-500 hover:text-blue-800 hower:underline"
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
                    onClick={() => handleExpandToggle(index)}
                  >
                    {expandedDescriptions[index] ? "Read Less" : "Read More"}
                  </span>
                </div>
              </div>
              <div
<<<<<<< HEAD
                key={`posted-at-${index}`}
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4"
              >
                <p className="text-gray-600">Posted At</p>
                <div className="space-y-2">{formatDate(job.timestamp)}</div>
=======
                key={index}
                className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4"
              >
                <p className="text-gray-600">Posted At</p>
                <div className="space-y-2">{job.timestamp}</div>
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Joblist;
