// backend/controllers/adminController.js
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

import doctorModel from "../models/doctorModel.js";
import Appointment from "../models/Appointment.js";
import Patient from "../models/patientModel.js";

// ─────────────────────────────────────────────
// Controller: Add a new doctor
export const addDoctor = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image under the field name 'image'",
      });
    }

    const imageFile = req.file;
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: uploadResult.secure_url,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: parsedAddress,
      date: Date.now(),
    });

    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// ─────────────────────────────────────────────
// Controller: Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ success: true, message: "Login successful", token });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// ─────────────────────────────────────────────
// Controller: Get all appointments (Admin only)
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email phone")
      .populate("doctorId", "name email speciality");

    res.json({ success: true, data: appointments });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments" });
  }
};

// ─────────────────────────────────────────────
// Controller: Confirm appointment
export const confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctorId")
      .populate("patientId");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    // ✅ Optionally: send SMS/WhatsApp/email notification here

    res.json({
      success: true,
      message: "Appointment confirmed",
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Confirmation failed" });
  }
};
