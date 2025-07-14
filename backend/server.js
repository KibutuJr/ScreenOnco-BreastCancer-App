// backend/server.js

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Import routers
import adminRouter from "./routes/adminRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import mlRouter from "./routes/mlRoute.js";
import riskAssessmentRoute from "./routes/riskAssessmentRoute.js";
const app = express();
const PORT = process.env.PORT || 4000;

// Connect services
connectDB();
connectCloudinary();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/appointments", appointmentRouter);
app.use("/api", mlRouter);
app.use("/api/risk", riskAssessmentRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
