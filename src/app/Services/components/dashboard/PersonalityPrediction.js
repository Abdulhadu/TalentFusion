"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PersonalityPrediction = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    resume: null,
    openness: "",
    neuroticism: "",
    conscientiousness: "",
    agreeableness: "",
    extraversion: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData to handle file upload
      const formDataToSend = new FormData();

      // Append form data to FormData object
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Send form data to the "/recruiter/prediction" API endpoint
      const response = await fetch(
        "http://127.0.0.1:5328/recruiter/prediction",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        // Handle success (redirect, show success message, etc.)
        router.push("/Interview")
      } else {
        // Handle error (show error message, etc.)
        console.error("Prediction submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="w-full h-auto overflow-scroll block bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center">
        <div className="bg-white py-6 px-10 sm:max-w-2xl w-full ">
          <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
            Personality Prediction
          </div>
          <div className="">
            <div className="flex mb-8">
              <div className="mr-4 w-1/2">
                <label className="block text-sky-600 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sky-600 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex mb-8">
              <div className="mr-4 w-1/2">
                <label className="block text-sky-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Email Address"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sky-600 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="Age"
                />
              </div>
            </div>
            <div className="flex mb-8">
              <div className="mr-4 w-1/2">
                <label className="block text-sky-600 mb-2">Gender</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="mr-4">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Female</span>
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-sky-600 mb-2">Upload Resume</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-sky-600 mb-4">
                Give rating 1 to 10 to the following questions
              </h3>
              <div>
                <p className="mb-2">Enjoy new experience or thing (openness)</p>
                <input
                  type="number"
                  name="openness"
                  value={formData.openness}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="1-10"
                />
              </div>
              <div>
                <p className="mb-2">
                  How often do you feel negativity (neuroticism)
                </p>
                <input
                  type="number"
                  name="neuroticism"
                  value={formData.neuroticism}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="1-10"
                />
              </div>
              <div>
                <p className="mb-2">
                  Wishing to do one's work well and thoroughly
                  (conscientiousness)
                </p>
                <input
                  type="number"
                  name="conscientiousness"
                  value={formData.conscientiousness}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="1-10"
                />
              </div>
              <div>
                <p className="mb-2">
                  How much would you like to work with your peers
                  (agreeableness)
                </p>
                <input
                  type="number"
                  name="agreeableness"
                  value={formData.agreeableness}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="1-10"
                />
              </div>
              <div>
                <p className="mb-2">
                  How outgoing and social interaction do you like (extraversion)
                </p>
                <input
                  type="number"
                  name="extraversion"
                  value={formData.extraversion}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="1"
                  className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
                  placeholder="1-10"
                />
              </div>
            </div>
            <div class="flex justify-center my-6">
              <button
                class="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalityPrediction;
