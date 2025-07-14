"use client";

import React, { useState, useEffect } from "react";

export default function RiskAssessment() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [age, setAge] = useState("");
  const [familyHistory, setFamilyHistory] = useState("no");
  const [cancerType, setCancerType] = useState("");
  const [geneticMutation, setGeneticMutation] = useState("no");
  const [bmi, setBmi] = useState("");
  const [menarcheAge, setMenarcheAge] = useState("");
  const [menopauseAge, setMenopauseAge] = useState("");
  const [children, setChildren] = useState("");
  const [hormoneTherapy, setHormoneTherapy] = useState("no");

  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState(null);
  const [riskCategory, setRiskCategory] = useState("");
  const [error, setError] = useState("");
  const [showBookingPrompt, setShowBookingPrompt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setRiskScore(null);
    setRiskCategory("");
    setShowBookingPrompt(false);

    if (!age || !bmi || !menarcheAge || !children || !menopauseAge) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ml/assess-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age,
          bmi,
          familyHistory,
          geneticMutation,
          menarcheAge,
          menopauseAge,
          children,
          hormoneTherapy,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "API Error");

      setRiskScore(data.riskScore);
      setRiskCategory(data.label);

      if (data.label === "High Risk") {
        setShowBookingPrompt(true);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to calculate risk. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          AI-Powered Breast Cancer Risk Assessment
        </h1>
        <p className="mb-6 text-gray-600">
          Please complete the form below. Our AI model will estimate your 5-year
          breast cancer risk.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        {error && <div className="text-red-600 font-medium">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Age *</label>
            <input
              type="number"
              min="18"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">BMI *</label>
            <input
              type="number"
              step="0.1"
              min="10"
              max="60"
              value={bmi}
              onChange={(e) => setBmi(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Family History? *</label>
            <select
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {familyHistory === "yes" && (
            <div className="col-span-1 sm:col-span-2">
              <label className="block font-medium mb-1">
                Type of Cancer in Family
              </label>
              <input
                type="text"
                placeholder="e.g., Breast, Ovarian, Prostate"
                value={cancerType}
                onChange={(e) => setCancerType(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">
              Known Genetic Mutation? *
            </label>
            <select
              value={geneticMutation}
              onChange={(e) => setGeneticMutation(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Age at Menarche *</label>
            <input
              type="number"
              min="8"
              max="20"
              value={menarcheAge}
              onChange={(e) => setMenarcheAge(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Age at Menopause *</label>
            <select
              value={menopauseAge}
              onChange={(e) => setMenopauseAge(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">-- Select --</option>
              <option value="ongoing">Not Yet Reached</option>
              {[...Array(26)].map((_, i) => {
                const age = 35 + i;
                return (
                  <option key={age} value={age}>
                    {age}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Number of Children *
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Hormone Therapy? *</label>
            <select
              value={hormoneTherapy}
              onChange={(e) => setHormoneTherapy(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Calculating…" : "Calculate My Risk"}
        </button>
      </form>

      {riskScore !== null && (
        <div className="mt-8 bg-blue-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-2">Your Risk Score</h2>
          <p className="text-6xl font-bold text-blue-700">
            {(riskScore * 100).toFixed(0)}%
          </p>
          <p className="text-xl mt-2">
            Category:{" "}
            <span
              className={
                riskCategory === "High Risk"
                  ? "text-red-600"
                  : riskCategory === "Moderate Risk"
                  ? "text-yellow-600"
                  : "text-green-600"
              }
            >
              {riskCategory}
            </span>
          </p>
          <p className="mt-4 text-gray-700 text-sm">
            <strong>Disclaimer:</strong> This result is an automated estimation
            generated by AI based on the information you provided. It is{" "}
            <strong>not</strong> a diagnosis. Always consult with a qualified
            medical professional for comprehensive testing and expert
            evaluation.
          </p>

          {showBookingPrompt && (
            <div className="mt-6 bg-red-100 p-4 rounded text-center">
              <p className="text-red-700 font-semibold">
                Your result indicates a <strong>high risk</strong>. We strongly
                recommend scheduling a consultation with a medical professional.
              </p>
              <button
                onClick={() => (window.location.href = "/doctors")}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
