import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Welcome to <strong>ScreenOnco</strong>. We respect your privacy and are
        committed to protecting your personal and health-related information.
        This Privacy Policy outlines how we collect, use, and safeguard your
        data when you use our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Personal Data:</strong> Name, email address, phone number, or
          other contact details.
        </li>
        <li>
          <strong>Health Information:</strong> Symptoms, conditions, appointment
          preferences, and messages shared with the assistant.
        </li>
        <li>
          <strong>Usage Data:</strong> Device, browser, location (if permitted),
          and interaction logs.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          To provide personalized support and health education through the
          chatbot.
        </li>
        <li>To help schedule appointments with trusted doctors.</li>
        <li>To improve service quality and user experience.</li>
        <li>
          To analyze interactions (anonymously) for support and research
          purposes.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. How We Protect Your Data
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>All information is transmitted securely using HTTPS.</li>
        <li>
          We do not store sensitive data unless necessary for providing
          services.
        </li>
        <li>Access to data is limited to authorized personnel only.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do <strong>not</strong> sell or share your data with third parties
        for advertising. Your data may be shared with healthcare providers only
        when you request an appointment.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. AI Responses</h2>
      <p className="mb-4">
        Our assistant uses OpenAI’s language model to generate responses. The
        content you submit may be sent to OpenAI for processing, governed by
        their{" "}
        <a
          href="https://openai.com/policies/privacy-policy"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Access or correct your data.</li>
        <li>Request deletion of your information.</li>
        <li>Withdraw consent at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="mb-2">For any privacy concerns or questions:</p>
      <ul className="mb-4">
        <li>
          Email:{" "}
          <a
            href="mailto:kibutujr@gmail.com"
            className="text-blue-600 underline"
          >
            kibutujr@gmail.com
          </a>
        </li>
        <li>Phone: +254 736 421 150</li>
      </ul>

      <p className="text-sm text-gray-500 mt-6">Last updated: July 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
