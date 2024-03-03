import React from "react";
import PersonalityPrediction from "@/app/Services/components/dashboard/PersonalityPrediction";
import PrivateRoute from "../../Services/components/dashboard/PrivateRoute";
const page = () => {
  return (
    <PrivateRoute userType="interviewer">
      <PersonalityPrediction />
    </PrivateRoute>
  );
};

export default page;
