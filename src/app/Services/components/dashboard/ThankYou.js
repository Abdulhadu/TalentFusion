"use client";
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
            {text} <br />
            Thank you for using the Services of <b>TELENT FUSION</b>
          </p>
          <Link href="http://localhost:3000/Services" passHref>
            <button className="inline-flex items-center px-4 py-2 text-white bg-cyan-600 border border-cyan-600 rounded hover:bg-cyan-700 focus:outline-none focus:ring">
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
