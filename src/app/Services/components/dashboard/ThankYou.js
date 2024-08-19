"use client";
<<<<<<< HEAD
import Lottie from "lottie-react-web";
import React from "react";
import animationData from "/public/Animation - 1710090922688.json";
import Link from "next/link";

const ThankYou = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded shadow-lg ring ring-cyan-600/50">
        <div className="flex flex-col items-center space-y-2">
          <Lottie
            options={{
              animationData: animationData,
              loop: false, // Optional
              autoplay: true, // Optional
            }}
            width={180}
            height={180}
          />
          <h1 className="text-4xl font-bold">Thank You !</h1>
          <p className="text-center px-4 py-2">
=======
import React from "react";
import Link from "next/link";
const ThankYou = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded shadow-lg ring ring-indigo-600/50">
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold">Thank You !</h1>
          <p style={{ textAlign: "center" }}>
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
            {text} <br />
            Thank you for using the Services of <b>TELENT FUSION</b>
          </p>
          <Link href="http://localhost:3000/Services" passHref>
<<<<<<< HEAD
            <button className="inline-flex items-center px-4 py-2 text-white bg-cyan-600 border border-cyan-600 rounded hover:bg-cyan-700 focus:outline-none focus:ring">
=======
            <button className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring">
>>>>>>> 2070008ba3f8d7c09ac13fc2c4f92b0dfd443131
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium">Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
