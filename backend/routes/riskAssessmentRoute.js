import express from "express";
import RiskAssessment from "../models/riskAssessmentModel.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const saved = await RiskAssessment.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving risk assessment:", err);
    res.status(500).json({ error: "Failed to save risk data" });
  }
});

export default router;
