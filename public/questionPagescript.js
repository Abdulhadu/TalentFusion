"use strict";
<<<<<<< HEAD
let mediaRecorder;
let recordedBlobs;
let count = 1;
const Starting = [
  "Thank you for coming in today. I am a TelentFussion AI Interviewer Let's dive right in. I'd like to start by asking some questions reguarding you skills. We also Analyze your Tone and Face Expression. Click the Record button to start the Test.",
];
const questions = await fetchQuestionsFromBackend();
const Ending = [
  "Thank you for your time and thoughtful responses. We appreciate your interest in joining our team. We will be in touch regarding the next steps in the hiring process.",
];
=======

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
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
const errorMsgElement = document.querySelector("span#errorMsg");
const recordedVideo = document.querySelector("video#recorded");
const recordButton = document.querySelector("button#record");
const downloadButton = document.querySelector("button#download");
const nextButton = document.getElementById("next");
const time = [];
let userStream;
let filedat;
const numrec = [];
<<<<<<< HEAD
import { jwtDecode } from "jwt-decode";
import lottie from "lottie-web";
import animationData from "/public/Animation - 1710093016864";

function displayAnimation() {
  const animationContainer = document.getElementById("animationContainer");

  const animationElement = document.createElement("div");
  animationElement.setAttribute("id", "animationElement");
  animationContainer.appendChild(animationElement);
  // Display the animation using Lottie
  lottie.loadAnimation({
    container: animationElement,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: animationData,
  });
  animationElement.style.width = "200px";
  animationElement.style.height = "200px";
  animationContainer.style.display = "flex";
  animationContainer.style.justifyContent = "center";
  animationContainer.style.alignItems = "center";
}

function clearAnimation() {
  const animationContainer = document.getElementById("animationContainer");
  animationContainer.innerHTML = "";
}

// Function to speak text
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis
    .getVoices()
    .find((voice) => voice.name === "Google US English");
=======
import ThankYou from "../src/app/Services/components/dashboard/ThankYou";
import { jwtDecode } from "jwt-decode";
// import { SpeechSynthesisUtterance } from 'web-speech-api';
// Function to speak a given text
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
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
<<<<<<< HEAD
async function fetchQuestionsFromBackend() {
  try {
    const response = await fetch(`http://127.0.0.1:5328/recruiter/generate_questions`, {
      method: "GET",
    });
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131

nextButton.addEventListener("click", async () => {
  // Button for next question to be asked
  if (count <= questions.length - 1) {
    // Stop recording before speaking the next question
    mediaRecorder.stop();
    time.push(Date());
    count++;
<<<<<<< HEAD

    clearAnimation();
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
    // Speak the next question
    await speakText(questions[count - 1]);
    document.getElementById("question").innerText = questions[count - 1];
    // Start recording after the speech ends
    speakText("Recording will start shortly."); // Provide a cue for the user
    const utterance = new SpeechSynthesisUtterance("");
    utterance.onend = () => {
<<<<<<< HEAD
      mediaRecorder.start();
      displayAnimation();
=======
      
      mediaRecorder.start();
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
    };
    window.speechSynthesis.speak(utterance);
  } else {
    recordButton.disabled = false;
    time.push(Date());
    nextButton.style.display = "none";
    // Stop recording before speaking the ending message
    mediaRecorder.stop();
<<<<<<< HEAD

    clearAnimation();
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
    // Speak the ending message
    await speakText(Ending[0]);
    document.getElementById("question").innerText = Ending[0];
    // Start recording after the speech ends
<<<<<<< HEAD
=======
    speakText("Recording will start shortly."); // Provide a cue for the user
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
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
<<<<<<< HEAD


  console.log(questions)
  if (questions.length === 0) {
      alert('Failed to fetch questions. Please try again later.');
      return;
  }

  if (recordButton.textContent === "Record") {
    await speakText(questions[0]);
    document.getElementById("question").innerText = questions[0];

    speakText("Recording will start shortly.");
=======
  
  if (recordButton.textContent === "Record") {
    await speakText(questions[0]);
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
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
<<<<<<< HEAD
  const authToken = localStorage.getItem("jwtToken");

  if (!authToken) {
    throw new Error("Authentication token not found");
=======
  const authToken = localStorage.getItem('jwtToken');

  if (!authToken) {
    throw new Error('Authentication token not found');
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  }

  // Replace the following line with your actual JWT decoding logic
  const decodedToken = jwtDecode(authToken);

  if (!decodedToken || !decodedToken.user_id) {
<<<<<<< HEAD
    throw new Error("Failed to extract user_id from the token");
=======
    throw new Error('Failed to extract user_id from the token');
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  }

  return decodedToken.user_id;
}

<<<<<<< HEAD
downloadButton.addEventListener("click", () => {
=======


downloadButton.addEventListener("click", () => {

>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
  const userId = decodeTokenAndGetUserId();

  // send data to server
  var data = new FormData();
  recordedBlobs.forEach((blob, index) => {
    const arr = [];
    arr.push(blob);
<<<<<<< HEAD
    if (index < questions.length) {
=======
    if (index < 3) {
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
      const blobdata = new Blob(arr, { type: "video/webm" });
      data.append(`question${index + 1}`, blobdata);
    }
  });
<<<<<<< HEAD
  data.append("user_id", userId);
  // Include the generated questions in the request payload
  data.append("questions", JSON.stringify(questions));
  const url1 = `/recorded`;
=======
  data.append('user_id', userId);
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131

  fetch(`http://127.0.0.1:5328/recruiter/analysis`, {
    method: "POST",
    body: data,
  })
<<<<<<< HEAD
    .then((response) => {
      console.log(response);
      return response.json(); // Assuming the response is in JSON format
    })
    .then((data) => {
      console.log(data);
      if (data.success) {
        const a = document.createElement("a");
        a.style.display = "none";
        a.target = "_self";
        a.href = url1;
        document.body.appendChild(a);
        a.click();
      } else {
        alert("Failed to record interview.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to communicate with the server.");
    });
});
=======
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
   
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131

function handleDataAvailable(event) {
  // push data to blob or video data
  console.log("handleDataAvailable", event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}
function showNextBtn() {
  document.getElementById("next").style.display = "block";
<<<<<<< HEAD
=======
  document.getElementById("question").innerText = questions[0];
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
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
<<<<<<< HEAD
  displayAnimation();
=======
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
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
