// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: call your login API with { email, password }
      // await api.login({ email, password });
      navigate("/doctors");
    } catch (err) {
      console.error("Login error:", err); // ✅ Now using 'err' to avoid warning
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto p-8 min-w-[300px] border rounded-xl shadow-lg text-zinc-700"
      >
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="text-gray-600">Please log in to book an appointment</p>
        {error && <p className="text-red-500">{error}</p>}

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

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-xs text-center text-gray-400 mt-2">
          Admin?{" "}
          <Link to="/admin-login" className="text-blue-600 hover:underline">
            Click here to log in
          </Link>
        </p>
      </form>
    </div>
  );
}
