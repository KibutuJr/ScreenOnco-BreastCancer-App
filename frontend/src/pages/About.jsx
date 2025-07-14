import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to ScreenOnco, your trusted partner in managing your
            healthcare needs. Our multidisciplinary team of breast cancer
            specialists—including surgical oncologists, medical oncologists,
            radiation oncologists, reconstructive surgeons, radiologists, and
            genetic counselors—works seamlessly together to deliver
            personalized, evidence-based care.
          </p>
          <p>
            {" "}
            From early detection and risk assessment through treatment planning
            and survivorship support, our experts leverage the latest advances
            in diagnostics, targeted therapies, and oncoplastic techniques to
            ensure the best possible outcomes and quality of life for every
            patient.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            To transform breast cancer care through early detection,
            personalized treatment, and unwavering support. By combining
            advanced technology with a patient-centric approach, we aim to make
            cancer care more accessible, precise, and compassionate—guiding
            every individual toward better outcomes and brighter tomorrows.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold"> CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Expert Multidisciplinary Team:</b>
          <p>
            Surgeons, medical oncologists, radiologists, reconstructive
            specialists, and genetic counselors work together seamlessly—so you
            benefit from comprehensive expertise without hopping between
            providers.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Advanced, Data-Driven Care:</b>
          <p>
            We use state-of-the-art imaging, minimally invasive techniques, and
            AI-powered risk models to catch cancer early and tailor treatments
            precisely, continually refining protocols based on outcomes.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Compassionate Patient Focus:</b>
          <p>
            Beyond clinical excellence, we offer extended consultations,
            dedicated nurse navigators, and emotional support—ensuring you feel
            informed, heard, and supported throughout your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
