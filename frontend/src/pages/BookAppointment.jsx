// src/pages/BookAppointment.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  // Fetch doctors list from backend
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data.doctors || []);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    }

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !date || !time || !reason) {
      setError("Please fill all fields");
      return;
    }

    try {
      // Replace with actual logged-in patient's ID from auth/session
      const newAppointment = {
        doctorId: selectedDoctor,
        date,
        time,
        fees: 1000, // default fee or fetch dynamically
        patientId: "REPLACE_WITH_PATIENT_ID", // TODO: Auto-fill from token/session
      };

      const res = await fetch("/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message || "Booking failed.");
        return;
      }

      // ✅ Redirect to appointments page after success
      navigate("/my-appointments");
    } catch (err) {
      console.error("Booking error", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg border rounded-lg shadow-lg p-6 bg-white space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-zinc-700">
          Book an Appointment
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block mb-1 text-sm">Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none"
          >
            <option value="">-- Choose a doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                Dr. {doc.name} ({doc.speciality})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Reason / Symptoms</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none"
            rows={3}
            placeholder="E.g., persistent cough, pain, check-up..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}
