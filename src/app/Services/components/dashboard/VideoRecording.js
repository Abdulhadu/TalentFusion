"use client"
import React, { useEffect, useState } from "react";
import "/public/questionPageStyle.css";
import { Paper, Grid, Stack, TextField, Button } from "@mui/material";
import BaseCard from "@/app/Services/components/shared/BaseCard";
import Questions from "@/app/Services/components/dashboard/Questions";
import { useSpeechSynthesis } from "react-speech-kit";

const VideoRecording = () => {
  const [question, setQuestion] = useState("");
  const { speak } = useSpeechSynthesis(); 
  useEffect(() => {
    // Import the JavaScript file dynamically
    import("/public/questionPagescript.js")
      .then((module) => {
        // Access the module if needed
        // For example, if your script exports a function:
        // module.default();
      })
      .catch((error) => {
        console.error("Error loading script:", error);
      });
  }, []);
  // const handleNextQuestion = () => {
  //   if (count < questions.length) {
  //     setQuestion(question[count]);
  //     console.log("the next question is saved..", question[count])
  //     speakQuestion(question[count]);
  //     count++;
  //   } else {
  //     count = 0;
  //     setQuestion(question[count]);
  //   }
  // };

  // const speakQuestion = (text) => {
  //   console.log("speaking")
  //   speak({ text }); // Use the speak function from useSpeechSynthesis hook
  // };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
        <BaseCard title="Video Recorded">
          <div id="container">
            <video id="gum" playsInline autoPlay muted></video>

            <div>
              <button id="start">Start camera</button>
            </div>
            <div id="buttons">
              <button id="next" style={{ display: "none" }}>
                Next Question
              </button>
              <button id="record" disabled>
                Record
              </button>
              <button id="download" disabled>
                Submit
              </button>
            </div>

            <div>
              <h4>Audio constraints options</h4>
              <p>
                Echo cancellation:{" "}
                <input type="checkbox" id="echoCancellation" />
              </p>
              <p>
                Noise Suppression:{" "}
                <input type="checkbox" id="noiseSuppression" />
              </p>
              <p>
                Auto gain control :{" "}
                <input type="checkbox" id="autogaincontrol" />
              </p>
            </div>

            <div>
              <span id="errorMsg"></span>
            </div>
          </div>
          </BaseCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <BaseCard title="Questionaries">
            <div id="question">
            <Questions
                question={question}
                // onNext={handleNextQuestion}
             
              />
            </div>
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default VideoRecording;
