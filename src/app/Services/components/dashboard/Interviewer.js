"use client"
import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Interviewer = () => {
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
        <p className="text-gray-600 mt-2">+92 313 7707 410</p>
        <p className="text-gray-600 mt-2">Hadi37767@gmail.com</p>
        <p className="text-gray-600 mt-2">Degree BS Computer Science</p>
      </div>
      <div>
        <div className="mx-auto lg:mt-8 max-w-xs">
          <div className="border border-gray-300 p-4 mt-5">
            {/* Skills container */}
            <div className="mb-2">
              <p className="text-gray-600 font-semibold mb-1">Skills:</p>
              <Stack direction="row" flexWrap="wrap">
              {/* Replace these dummy skills with your actual skills */}
              <Chip label="React" color="primary" sx={{ margin: "4px" }} />
              <Chip label="JavaScript" color="primary" sx={{ margin: "4px" }} />
              <Chip label="Node.js" color="primary" sx={{ margin: "4px" }} />
              <Chip label="React" color="primary" sx={{ margin: "4px" }} />
              <Chip label="JavaScript" color="primary" sx={{ margin: "4px" }} />
              <Chip label="Node.js" color="primary" sx={{ margin: "4px" }} />
              <Chip label="React" color="primary" sx={{ margin: "4px" }} />
              <Chip label="JavaScript" color="primary" sx={{ margin: "4px" }} />
              <Chip label="Node.js" color="primary" sx={{ margin: "4px" }} />
            </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interviewer;
