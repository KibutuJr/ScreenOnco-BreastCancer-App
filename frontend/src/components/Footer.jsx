// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import assets from "../assets";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Column */}
        <div>
          <img className="mb-5 w-20" src={assets.logo} alt="ScreenOnco Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We are a team of dedicated professionals committed to providing the
            best breast cancer healthcare solutions for our patients. Our
            mission is to improve the quality of life for those we serve through
            innovative and compassionate care.
          </p>
        </div>

        {/* Center Column */}
        <div>
          <p className="text-xl font-medium mb-5">SCREENONCO</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/" onClick={scrollTop} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/educational-insights"
                onClick={scrollTop}
                className="hover:underline"
              >
                Educational Insights
              </Link>
            </li>
            <li>
              <Link
                to="/risk-history"
                onClick={scrollTop}
                className="hover:underline"
              >
                Risk History
              </Link>
            </li>
            <li>
              <Link
                to="/risk-assessment"
                onClick={scrollTop}
                className="hover:underline"
              >
                Risk Assessment
              </Link>
            </li>
            <li>
              <Link
                to="/my-appointments"
                onClick={scrollTop}
                className="hover:underline"
              >
                My Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                onClick={scrollTop}
                className="hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+254 736 421 150</li>
            <li>kibutujr@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="py-5 text-sm text-center">
        &copy; 2025{" "}
        <a
          href="https://kibutujr.github.io/Portfolio-KibutuJr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-600"
        >
          Kibutujr
        </a>{" "}
        — All Rights Reserved
      </p>
    </div>
  );
}
