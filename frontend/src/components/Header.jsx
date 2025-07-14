// src/components/Header.jsx

import React from "react";
import assets from "../assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p>
            Simply browse through our extensive list of trusted{" "}
            <br className="hidden sm:block" />
            doctors, schedule your appointment and get the care you need.
          </p>
        </div>
        <a
          href="#speciality"
          className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-full mt-6 hover:scale-105 transition duration-300 ease-in-out"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-1 h-auto rounded-lg"
          src={assets.header_img}
          alt="Header Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
