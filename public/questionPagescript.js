"use strict";

/* globals MediaRecorder */

let mediaRecorder;
let recordedBlobs;
let count = 1;

const Starting = ["Thank you for coming in today. I am a TelentFussion AI Interviewer Let's dive right in. I'd like to start by asking you about your question reguarding you skills. Click the Record button to start the Test. We also Analyze your Tone and Face Expression"];
const questions = [
  "Question 1: Tell something about yourself",
  "Question 2: Why should we hire you?",
  "Question 3: Where Do You See Yourself Five Years From Now?",
];
const Ending = ["Thank you for your time and thoughtful responses. We appreciate your interest in joining our team. We will be in touch regarding the next steps in the hiring process."];
const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#record");
const downloadButton = document.querySelector("button#download");
const nextButton = document.getElementById("next");
const time = [];
let userStream;
let filedat;
const numrec = [];
import ThankYou from "../src/app/Services/components/dashboard/ThankYou";
import { jwtDecode } from "jwt-decode";
// import { SpeechSynthesisUtterance } from 'web-speech-api';
// Function to speak a given text
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
  window.speechSynthesis.speak(utterance);
}

// nextButton.addEventListener("click", () => {
//   //Button for next question to be asked
//   if (count <= questions.length - 1) {

//     document.getElementById("question").innerText = questions[count];
//     time.push(Date());
//     count++;
//     mediaRecorder.stop();
//     mediaRecorder.start();
//   } else {
//     recordButton.disabled = false;
//     time.push(Date());
//     nextButton.style.display = "none";
//     speakText(Ending[0]);
//     document.getElementById("question").innerText = Ending[0];
//     count = 1;
//     mediaRecorder.stop();
//     mediaRecorder.start();
//   }
// });

nextButton.addEventListener("click", async () => {
  // Button for next question to be asked
  if (count <= questions.length - 1) {
    // Stop recording before speaking the next question
    mediaRecorder.stop();
    time.push(Date());
    count++;
    // Speak the next question
    await speakText(questions[count - 1]);
    document.getElementById("question").innerText = questions[count - 1];
    // Start recording after the speech ends
    speakText("Recording will start shortly."); // Provide a cue for the user
    const utterance = new SpeechSynthesisUtterance("");
    utterance.onend = () => {
      
      mediaRecorder.start();
    };
    window.speechSynthesis.speak(utterance);
  } else {
    recordButton.disabled = false;
    time.push(Date());
    nextButton.style.display = "none";
    // Stop recording before speaking the ending message
    mediaRecorder.stop();
    // Speak the ending message
    await speakText(Ending[0]);
    document.getElementById("question").innerText = Ending[0];
    // Start recording after the speech ends
    speakText("Recording will start shortly."); // Provide a cue for the user
    const utterance = new SpeechSynthesisUtterance("");
    utterance.onend = () => {
      mediaRecorder.start();
    };
    window.speechSynthesis.speak(utterance);
    count = 1;
  }
});

recordButton.addEventListener("click", async () => {
  // to start the camera for recording
  
  if (recordButton.textContent === "Record") {
    await speakText(questions[0]);
    const utterance = new SpeechSynthesisUtterance("");
    utterance.onend = () => {
      time.push(Date());
      console.log(time);
      startRecording();
    };
    window.speechSynthesis.speak(utterance);
  } else {
    stopRecording();
    time.push(Date());
    recordButton.textContent = "Record";
    downloadButton.disabled = false;
  }
});

// playButton.addEventListener('click', () => {
//   const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
//   recordedVideo.src = null;
//   recordedVideo.srcObject = null;
//   recordedVideo.src = window.URL.createObjectURL(superBuzffer);
//   recordedVideo.controls = true;
//   recordedVideo.play();
// });

function decodeTokenAndGetUserId() {
  const authToken = localStorage.getItem('jwtToken');

  if (!authToken) {
    throw new Error('Authentication token not found');
  }

  // Replace the following line with your actual JWT decoding logic
  const decodedToken = jwtDecode(authToken);

  if (!decodedToken || !decodedToken.user_id) {
    throw new Error('Failed to extract user_id from the token');
  }

  return decodedToken.user_id;
}



downloadButton.addEventListener("click", () => {

  const userId = decodeTokenAndGetUserId();

  // send data to server
  var data = new FormData();
  recordedBlobs.forEach((blob, index) => {
    const arr = [];
    arr.push(blob);
    if (index < 3) {
      const blobdata = new Blob(arr, { type: "video/webm" });
      data.append(`question${index + 1}`, blobdata);
    }
  });
  data.append('user_id', userId);

  fetch(`http://127.0.0.1:5328/recruiter/analysis`, {
    method: "POST",
    body: data,
  })
  .then(response => {
    console.log(response);
    return response.json(); // Assuming the response is in JSON format
  })
   .then(data => {
    console.log(data);
    if (data.success) {
      <ThankYou text="Thank you for the interview. Your interview is successfully taken by our AI system. You'll hear from us after a while via email." />;
    } else {
      alert("Failed to record interview.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Failed to communicate with the server.");
  });
});
   

function handleDataAvailable(event) {
  // push data to blob or video data
  console.log("handleDataAvailable", event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}
function showNextBtn() {
  document.getElementById("next").style.display = "block";
  document.getElementById("question").innerText = questions[0];
  recordButton.disabled = true;
}
function startRecording() {
  // start camera
  showNextBtn();
  recordedBlobs = [];
  let options = {
    mimeType: "video/webm;codecs=vp9,opus",
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
  };
  try {
    mediaRecorder = new MediaRecorder(userStream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
      e
    )}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  recordButton.textContent = "Stop Recording";
  downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log("Recorder stopped: ", event);
    console.log("Recorded Blobs: ", recordedBlobs);
  };

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

function stopRecording() {
  // stop recording answered question
  console.log("iniside stop");
  console.log(userStream);
  mediaRecorder.stop();
  // speakText(Ending[0]);
  // document.getElementById("question").innerText = Ending[0];
  recordButton.style.display = "none";
  const gumVideo = document.querySelector("video#gum");
  userStream.getTracks()[0].enabled = false;
  userStream.getTracks()[1].enabled = false;
  // console.log(userStream);
  // delete userStream.getTracks()[0];
  // delete userStream.getTracks()[1];

  // gumVideo.pause();
  // gumVideo.src='';
  // gumVideo.style.display='none';
}

function handleSuccess(stream) {
  // set video stream to video tag
  recordButton.disabled = false;
  console.log("getUserMedia() got stream:", stream);

  const gumVideo = document.querySelector("video#gum");
  gumVideo.srcObject = stream;
}

async function init(constraints) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    userStream = stream;
    handleSuccess(stream);
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

document.querySelector("button#start").addEventListener("click", async () => {
  // start button to trigger camera
  const hasEchoCancellation =
    document.querySelector("#echoCancellation").checked;
  const hasnoiseSuppression =
    document.querySelector("#noiseSuppression").checked;
  const hasAutoGainControl = document.querySelector("#autogaincontrol").checked;
  console.log(hasEchoCancellation);
  console.log(hasnoiseSuppression);
  console.log(hasAutoGainControl);
  document.querySelector("button#start").style.display = "none";
  speakText(Starting[0]);
  document.getElementById("question").innerText = Starting[0];
  const constraints = {
    audio: {
      echoCancellation: { exact: hasEchoCancellation },
      autoGainControl: { exact: hasAutoGainControl },
      noiseSupperssion: { exact: hasnoiseSuppression },
    },
    video: {
      width: 1280,
      height: 720,
    },
  };
  console.log("Using media constraints:", constraints);
  await init(constraints);
});
