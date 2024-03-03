"use client"
import React from "react";

const Questions = ({ question, onNext }) => {
  return (
    <div>
      <div id="question">{question}</div>
    </div>
  );
};

export default Questions;