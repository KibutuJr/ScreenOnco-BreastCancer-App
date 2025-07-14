import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/patientModel.js";
import { sendEmail } from "../utils/mailer.js";
import { createInAppMessage } from "../utils/messages.js";
import { scheduleReminders } from "../utils/scheduler.js";
import { sendSMS, sendWhatsApp } from "../utils/notify.js";
import { z } from "zod";

// 📌 Zod schema validation
const appointmentSchema = z.object({
  patientId: z.string().length(24),
  doctorId: z.string().length(24),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  fees: z.number().positive("Fees must be a positive number"),
  reminderOffset: z.number().min(10).max(1440).optional(), // in minutes
});

// 📅 Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const result = appointmentSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, errors: result.error.flatten() });
    }

    const { patientId, doctorId, date, time, fees, reminderOffset } =
      result.data;

    // 🚫 Prevent duplicate booking
    const exists = await Appointment.findOne({ doctorId, date, time });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "This timeslot is already booked with the selected doctor.",
      });
    }

    // ✅ Create appointment
    const appt = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      fees,
    });

    // Fetch doctor & patient
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    // 💬 In-app message to doctor
    await createInAppMessage({
      to: doctorId,
      from: patientId,
      subject: "New Appointment",
      body: `You have a new appointment on ${date} at ${time}.`,
    });

    // 📧 Email to doctor
    await sendEmail({
      to: doctor.email,
      subject: "📅 New Appointment Booked",
      text: `Hello Dr. ${doctor.name}, you have a new appointment with ${patient.name} on ${date} at ${time}.`,
    });

    // 📢 Notify admin
    await sendEmail({
      to: process.env.ADMIN_NOTIFY_EMAIL,
      subject: "🛎️ New Appointment Booked",
      text: `New appointment booked:\nDoctor: Dr. ${doctor.name}\nPatient: ${patient.name}\nDate: ${date}\nTime: ${time}`,
    });

    // 📱 SMS & WhatsApp to patient
    if (patient.phone) {
      await sendSMS({
        to: patient.phone,
        body: `Hi ${patient.name}, your appointment with Dr. ${doctor.name} is confirmed on ${date} at ${time}.`,
      });
      await sendWhatsApp({
        to: patient.phone,
        body: `WhatsApp: Your appointment with Dr. ${doctor.name} is set for ${date} at ${time}.`,
      });
    }

    // 📱 SMS & WhatsApp to doctor
    if (doctor.phone) {
      await sendSMS({
        to: doctor.phone,
        body: `Dr. ${doctor.name}, you have a new appointment with ${patient.name} on ${date} at ${time}.`,
      });
      await sendWhatsApp({
        to: doctor.phone,
        body: `WhatsApp: Appointment with ${patient.name} on ${date} at ${time}.`,
      });
    }

    // ⏰ Schedule reminders
    scheduleReminders(appt, reminderOffset);

    return res.status(201).json({ success: true, data: appt });
  } catch (err) {
    console.error("Appointment Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
};

// ❌ Cancel Appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("doctorId")
      .populate("patientId");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.status === "cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Appointment is already cancelled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    const { doctorId: doctor, patientId: patient, date, time } = appointment;

    // 📧 Email notifications
    await sendEmail({
      to: doctor.email,
      subject: "❌ Appointment Cancelled",
      text: `Your appointment with ${patient.name} on ${date} at ${time} has been cancelled.`,
    });

    await sendEmail({
      to: patient.email,
      subject: "❌ Appointment Cancelled",
      text: `Your appointment with Dr. ${doctor.name} on ${date} at ${time} has been cancelled.`,
    });

    // 📱 SMS & WhatsApp
    if (doctor.phone) {
      await sendSMS({
        to: doctor.phone,
        body: `❌ Appointment with ${patient.name} on ${date} at ${time} has been cancelled.`,
      });
      await sendWhatsApp({
        to: doctor.phone,
        body: `WhatsApp: Appointment with ${patient.name} on ${date} at ${time} has been cancelled.`,
      });
    }

    if (patient.phone) {
      await sendSMS({
        to: patient.phone,
        body: `❌ Your appointment with Dr. ${doctor.name} on ${date} at ${time} is cancelled.`,
      });
      await sendWhatsApp({
        to: patient.phone,
        body: `WhatsApp: Your appointment with Dr. ${doctor.name} on ${date} at ${time} is cancelled.`,
      });
    }

    return res.json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment,
    });
  } catch (err) {
    console.error("Cancel Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};
