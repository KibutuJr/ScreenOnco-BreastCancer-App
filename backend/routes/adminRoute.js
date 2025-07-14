import express from "express";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import {
  addDoctor,
  loginAdmin,
  getAppointments,
  confirmAppointment,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// DEBUG: echo route for testing file uploads
adminRouter.post("/echo", upload.single("image"), (req, res) => {
  return res.json({
    contentType: req.headers["content-type"],
    file: req.file,
    body: req.body,
  });
});

// Admin login (public)
adminRouter.post("/login", loginAdmin);

// Add a new doctor (protected, with image upload)
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

// ✅ New: Get all appointments (protected)
adminRouter.get("/appointments", authAdmin, getAppointments);

// ✅ New: Confirm an appointment (protected)
adminRouter.post("/appointments/:id/confirm", authAdmin, confirmAppointment);

export default adminRouter;
