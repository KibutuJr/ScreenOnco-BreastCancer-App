import express from "express";
import {
  createAppointment,
  cancelAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// POST /api/appointments/book
router.post("/book", createAppointment);

// POST /api/appointments/cancel/:id
router.post("/cancel/:id", cancelAppointment);

export default router;
