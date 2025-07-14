import schedule from "node-schedule";
import { sendEmail } from "./mailer.js";
import { createInAppMessage } from "./messages.js";
import Appointment from "../models/Appointment.js";
import doctorModel from "../models/doctorModel.js";
import Patient from "../models/patientModel.js";

// Default reminder offsets
const DEFAULT_OFFSETS = [
  { label: "1 day before", ms: 24 * 60 * 60 * 1000 },
  { label: "12 hours before", ms: 12 * 60 * 60 * 1000 },
  { label: "6 hours before", ms: 6 * 60 * 60 * 1000 },
  { label: "2 hours before", ms: 2 * 60 * 60 * 1000 },
  { label: "30 minutes before", ms: 30 * 60 * 1000 },
];

export function scheduleReminders(appt, reminderOffset = null) {
  const dt = new Date(`${appt.date}T${appt.time}`);

  // Determine reminders to schedule
  const reminders = reminderOffset
    ? [
        {
          label: `${reminderOffset} minutes before`,
          ms: reminderOffset * 60 * 1000,
        },
      ]
    : DEFAULT_OFFSETS;

  reminders.forEach(({ label, ms }) => {
    const when = new Date(dt.getTime() - ms);

    // Only schedule future reminders
    if (when > new Date()) {
      schedule.scheduleJob(when, async () => {
        const patient = await Patient.findById(appt.patientId);
        const doctor = await Doctor.findById(appt.doctorId);
        const subj = `⏰ Reminder: appointment ${label}`;
        const text = `Your appointment on ${appt.date} at ${appt.time} is coming up (${label}).`;

        // Email
        await sendEmail({ to: patient.email, subject: subj, text });
        await sendEmail({ to: doctor.email, subject: subj, text });

        // In-app messages
        await createInAppMessage({
          to: patient._id,
          from: doctor._id,
          subject: subj,
          body: text,
        });

        await createInAppMessage({
          to: doctor._id,
          from: patient._id,
          subject: subj,
          body: text,
        });
      });
    }
  });
}
