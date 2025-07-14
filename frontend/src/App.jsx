// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Page imports
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import EducationalInsights from "./pages/EducationalInsights";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import RiskAssessment from "./pages/RiskAssessment";
import RiskHistory from "./pages/RiskHistory";
import AdminLogin from "./pages/AdminLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <div className="container mx-auto px-4 relative">
      <Navbar />

      <main className="py-8">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />{" "}
          {/* Add this line for the Privacy Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* Admin route */}
          {/* Doctors listing & filtering */}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:slug" element={<Doctors />} />
          <Route path="/doctors/:slug/:docId" element={<Doctors />} />
          {/* AI & Data */}
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/risk-history" element={<RiskHistory />} />
          <Route
            path="/educational-insights"
            element={<EducationalInsights />}
          />
          {/* User */}
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
