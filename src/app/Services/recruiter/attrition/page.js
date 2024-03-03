"use client";
import React, { useState, useEffect } from "react";
import PrivateRoute from "../../components/dashboard/PrivateRoute";

const Page = () => {
 
  return (
    <PrivateRoute userType="recruiter">
      <div>
        <h1>Welcome to the Attrition page</h1>
      </div>
    </PrivateRoute>
  );
};

export default Page;
