"use client"
import React from "react";

const Questions = ({ question, onNext }) => {
  return (
    <div>
      <div id="question">{question}</div>
      <button id="next" onClick={onNext}>
        Next Question
      </button>
    </div>
  );
};

export default Questions;