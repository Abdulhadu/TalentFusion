"use client";
import React, { useEffect, useState } from "react";
import Interviewer from "../../../components/dashboard/Interviewer";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import { Grid, TextField, Tooltip, IconButton } from "@mui/material";
import Image from "next/image";
import VideoModal from "../../../components/dashboard/ModalforVideo";
import VideoCameraFrontSharpIcon from "@mui/icons-material/VideoCameraFrontSharp";

const Page = ({ params }) => {
  const userID = params.ID;
  const [userData, setUserData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getVideoURL = (question) => {
    return `/static/user_files/${userID}/${question}`;
  };

  const handleOpenModal = (question) => {
    const videoURL = getVideoURL(question);
    setSelectedQuestion(videoURL);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5328/recruiter/getUserData?id=${userID}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userID]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid spacing={2} item xs={12} lg={8}>
          {userData && (
            <BaseCard title={`Tone Analysis for User ID ${userID}`}>
              <Image
                src={`/static${userData?.toneAnalysisImage}`}
                alt={`/static${userData?.toneAnalysisImage}`}
                width={1000} 
                height={500}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </BaseCard>
          )}

          {userData && (
            <BaseCard
              title={`Face Emotional Recognition for User ID ${userID}`}
            >
              <Image
                src={`/static${userData?.ferOutputImage}`}
                alt="Fer output report"
                width={1000}
                height={500}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </BaseCard>
          )}
        </Grid>

        <Grid item xs={12} lg={4}>
          <BaseCard title="Candidates Details">
            {userData && <Interviewer userData={userData.userInfo} />}
          </BaseCard>
        </Grid>
        <Grid item xs={12} spacing={2}>
          {userData &&
            Object.entries(userData.questionsAndAnswers).map(
              ([question, answer], index) => (
                <Grid item xs={12} key={index}>
                  <div style={{ marginBottom: "20px" }}>
                    <BaseCard title={`Question ${index + 1}`}>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}
                      >
                        <Grid item xs={11}>
                          {" "}
                     
                          <TextField
                            fullWidth
                            label={
                              <span
                                style={{ fontWeight: "bold", fontSize: "22px" }}
                              >
                                {question}
                              </span>
                            }
                            variant="outlined"
                            value={answer[0]}
                            InputProps={{
                              readOnly: true,
                              style: {
                                color: "blue",
                                fontWeight: "normal",
                              },
                            }}
                            multiline
                          />
                        </Grid>
                        <Grid item xs={1}>
                          {" "}
                          <Tooltip title="Watch Video">
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenModal(answer[1])}
                              sx={{
                                bgcolor: "#e0f7fa",
                                "&:hover": {
                                  bgcolor: "#b2ebf2",
                                },
                              }}
                            >
                              <VideoCameraFrontSharpIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </BaseCard>
                  </div>
                </Grid>
              )
            )}
        </Grid>
      </Grid>
      {selectedQuestion && (
        <VideoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          video={selectedQuestion}
        />
      )}
    </>
  );
};

export default Page;
