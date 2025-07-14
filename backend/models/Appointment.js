import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: String, required: true }, // e.g. "2025-06-01"
  time: { type: String, required: true }, // e.g. "14:30"
  fees: { type: Number },
  status: { type: String, default: "scheduled" },
});

export default mongoose.model("Appointment", AppointmentSchema);
