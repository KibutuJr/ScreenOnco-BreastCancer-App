// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: call your register API with { name, email, password, phone }
      // const res = await api.register({ name, email, password, phone });
      navigate("/book-appointment"); // ✅ Redirect user to appointment page after registration
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto p-8 min-w-[300px] border rounded-xl shadow-lg text-zinc-700"
      >
        <h2 className="text-2xl font-semibold">Register</h2>
        <p className="text-gray-600">Please sign up to book an appointment</p>
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+254712345678"
            className="w-full border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <p className="text-xs text-gray-500 mt-1">
            Used for WhatsApp or SMS reminders for your appointments
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
