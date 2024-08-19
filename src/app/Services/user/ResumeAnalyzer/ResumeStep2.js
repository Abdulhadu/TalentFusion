import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/Services/components/container/PageContainer";
import Recomendation from "@/app/Services/components/dashboard/Recomendation";
import UserOverview from "@/app/Services/components/dashboard/UserOverview";
import HardSkills from "@/app/Services/components/dashboard/HardSkills";
import SoftSkills from "@/app/Services/components/dashboard/SoftSkills";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import CoursesRecomendation from "@/app/Services/components/dashboard/CoursesRecomendation";
import Progress from "../../components/dashboard/Preogress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EducationData from "../../components/dashboard/EducationData";

const ResumeStep2 = ({ analysisResult }) => {
  useEffect(() => {
    // Scroll the page to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const userOverviewData = {
    name: analysisResult.resume_data.name || "",
    email: analysisResult.resume_data.email || "",
    mobile_number: analysisResult.resume_data.mobile_number || "",
    no_of_pages: analysisResult.resume_data.no_of_pages || 0,
    total_experience: analysisResult.resume_data.total_experience || 0,
    category: analysisResult.cand_level || "",
    reco_field: analysisResult.reco_field || "",
  };

  const progressData = {
    resume_score: analysisResult.resume_score || 0,
  };

  const education = {
    Degree: analysisResult.Degree || [],
    majors: analysisResult.Major_Subject || [],
    total_experience: analysisResult.resume_data.total_experience || 0,
  };

  const recommendationData = {
    recommendations: analysisResult.recommendations || [],
  };

  const actualSkills = {
    actual_skills: analysisResult.resume_data.skills || [],
  };

  const recomendedSkills = {
    recomended_skills: analysisResult.recommended_skills || [],
  };

  const coursesRecommendationData = {
    rec_course: analysisResult.rec_course || [],
  };

  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {userOverviewData.no_of_pages !== 0 && (
              <UserOverview data={userOverviewData} />
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            {progressData.resume_score !== 0 && (
              <Progress resume_score={progressData.resume_score} />
            )}
          </Grid>
          <Grid item xs={12} lg={8}>
            {recommendationData.recommendations.length !== 0 && (
              <Recomendation data={recommendationData} />
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            <BaseCard title="Education Details">
              {education.Degree.length !== 0 && (
                <EducationData data={education} />
              )}
            </BaseCard>
          </Grid>
          <Grid item xs={12} lg={8}>
            {actualSkills.actual_skills.length !== 0 && (
              <HardSkills data={actualSkills} />
            )}
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={8}>
            {recomendedSkills.recomended_skills.length !== 0 && (
              <SoftSkills data={recomendedSkills} />
            )}
          </Grid>
          <Grid item xs={12} lg={4}></Grid>
          <Grid item xs={12} lg={8}>
            {coursesRecommendationData.rec_course.length !== 0 && (
              <CoursesRecomendation data={coursesRecommendationData} />
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ResumeStep2;
