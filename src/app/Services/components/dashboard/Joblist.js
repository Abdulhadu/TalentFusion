import React from "react";

const Joblist = () => {
  return (
    <>
      <div className="max-w-5xl">
        <div className="p-4 border-b">
          <h2 className="text-2xl ">Applicant Information</h2>
          <p className="text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Full name</p>
            <p>Jane Doe</p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Application for</p>
            <p>Product Manager</p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Email Address</p>
            <p>Janedoe@gmail.com</p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">Salary</p>
            <p>$ 12000</p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p className="text-gray-600">About</p>
            <p>
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </p>
          </div>
          <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4">
            <p className="text-gray-600">Attachments</p>
            <div className="space-y-2">
              <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                <div className="space-x-2 truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current inline text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                  </svg>
                  <span>resume_for_manager.pdf</span>
                </div>
                <a href="#" className="text-purple-700 hover:underline">
                  Download
                </a>
              </div>

              <div className="border-2 flex items-center p-2 rounded justify-between space-x-2">
                <div className="space-x-2 truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current inline text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                  </svg>
                  <span>resume_for_manager.pdf</span>
                </div>
                <a href="#" className="text-purple-700 hover:underline">
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Joblist;
