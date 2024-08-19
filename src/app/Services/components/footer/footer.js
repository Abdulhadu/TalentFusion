import React from "react";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-100 dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-20">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 sm:w-2/3 lg:w-4/12">
            <div className="w-full mb-10 lg:ml-10 lg:pr-4">
              <a
                href="javascript:void(0)"
                className="mb-6 inline-block max-w-[160px]"
              >
                <img
                  src="/images/logos/telent-fussion-logo.png"
                  alt="logo"
                  className="max-w-full dark:hidden"
                />
                <img
                  src="/images/logos/telent-fussion-logo.png"
                  alt="logo"
                  className="max-w-full pl-5 hidden dark:block"
                />
              </a>
              <p className="text-base text-body-color dark:text-dark-6 p-5 mb-7">
                Experience the complete whirring process with our cutting-edge
                service solutions at Telent Fussion, where we ignite brilliance
                and fuse success.
              </p>
              <p className="flex items-center text-sm font-medium text-dark dark:text-white">
                <span className="mr-3 text-primary">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_941_15626)">
                      <path
                        d="M15.1875 19.4688C14.3438 19.4688 13.375 19.25 12.3125 18.8438C10.1875 18 7.84377 16.375 5.75002 14.2813C3.65627 12.1875 2.03127 9.84377 1.18752 7.68752C0.250019 5.37502 0.343769 3.46877 1.43752 2.40627C1.46877 2.37502 1.53127 2.34377 1.56252 2.31252L4.18752 0.750025C4.84377 0.375025 5.68752 0.562525 6.12502 1.18752L7.96877 3.93753C8.40627 4.59378 8.21877 5.46877 7.59377 5.90627L6.46877 6.68752C7.28127 8.00002 9.59377 11.2188 13.2813 13.5313L13.9688 12.5313C14.5 11.7813 15.3438 11.5625 16.0313 12.0313L18.7813 13.875C19.4063 14.3125 19.5938 15.1563 19.2188 15.8125L17.6563 18.4375C17.625 18.5 17.5938 18.5313 17.5625 18.5625C17 19.1563 16.1875 19.4688 15.1875 19.4688ZM2.37502 3.46878C1.78127 4.12503 1.81252 5.46877 2.50002 7.18752C3.28127 9.15627 4.78127 11.3125 6.75002 13.2813C8.68752 15.2188 10.875 16.7188 12.8125 17.5C14.5 18.1875 15.8438 18.2188 16.5313 17.625L18.0313 15.0625C18.0313 15.0313 18.0313 15.0313 18.0313 15L15.2813 13.1563C15.2813 13.1563 15.2188 13.1875 15.1563 13.2813L14.4688 14.2813C14.0313 14.9063 13.1875 15.0938 12.5625 14.6875C8.62502 12.25 6.18752 8.84377 5.31252 7.46877C4.90627 6.81252 5.06252 5.96878 5.68752 5.53128L6.81252 4.75002V4.71878L4.96877 1.96877C4.96877 1.93752 4.93752 1.93752 4.90627 1.96877L2.37502 3.46878Z"
                        fill="currentColor"
                      />
                      <path
                        d="M18.3125 8.90633C17.9375 8.90633 17.6563 8.62508 17.625 8.25008C17.375 5.09383 14.7813 2.56258 11.5938 2.34383C11.2188 2.31258 10.9063 2.00008 10.9375 1.59383C10.9688 1.21883 11.2813 0.906333 11.6875 0.937583C15.5625 1.18758 18.7188 4.25008 19.0313 8.12508C19.0625 8.50008 18.7813 8.84383 18.375 8.87508C18.375 8.90633 18.3438 8.90633 18.3125 8.90633Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15.2187 9.18755C14.875 9.18755 14.5625 8.93755 14.5312 8.56255C14.3437 6.87505 13.0312 5.56255 11.3437 5.3438C10.9687 5.31255 10.6875 4.93755 10.7187 4.56255C10.75 4.18755 11.125 3.9063 11.5 3.93755C13.8437 4.2188 15.6562 6.0313 15.9375 8.37505C15.9687 8.75005 15.7187 9.0938 15.3125 9.1563C15.25 9.18755 15.2187 9.18755 15.2187 9.18755Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_941_15626">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span class="text-black">+92 313 7707410</span>
              </p>
            </div>
          </div>
          <div className="w-full sm:mb-10 ml-10 lg:ml-2 sm:w-1/2 lg:w-2/12">
            <div className="w-full mb-10">
              <h4 className="text-lg font-semibold text-dark  mb-9">
                HR Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    Job Application
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    Job-Resume Matching
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    AI-Interview
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    CV-Selection
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:mb-10 ml-10 lg:ml-2 sm:w-1/2 lg:w-2/12">
            <div className="w-full mb-10">
              <h4 className="text-lg font-semibold text-dark mb-9">
                User Portal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    Resume Analyzer
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    Job Recomendations
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    Job Application
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
                  >
                    Contact and Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full sm:mb-10 ml-10 lg:ml-2 sm:w-1/2 lg:w-2/12">
            <div className="w-full mb-10">
              <h4 className="text-lg font-semibold text-dark mb-9">
                Follow Us On
              </h4>
              <p className="text-base text-body-color dark:text-dark-6">
                &copy; TelentFussion #2024
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="absolute left-0 bottom-0 z-[-1]">
          <svg
            width="217"
            height="229"
            viewBox="0 0 217 229"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
              fill="url(#paint0_linear_1179_5)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1179_5"
                x1="76.5"
                y1="281"
                x2="76.5"
                y2="1.22829e-05"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#3056D3" stop-opacity="0.08" />
                <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute top-10 right-10 z-[-1]">
          <svg
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
              fill="url(#paint0_linear_1179_4)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1179_4"
                x1="-1.63917e-06"
                y1="37.5"
                x2="75"
                y2="37.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#13C296" stop-opacity="0.31" />
                <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
