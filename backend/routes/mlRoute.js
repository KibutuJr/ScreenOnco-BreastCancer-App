// backend/routes/mlRoute.js

import express from "express";
import axios from "axios";

const router = express.Router();

// Proxy route to forward requests to the Flask API
router.post("/predict", async (req, res) => {
  try {
    const flaskResponse = await axios.post(
      "http://localhost:6000/predict",
      req.body
    );
    res.json(flaskResponse.data);
  } catch (error) {
    console.error("Error forwarding request to Flask API:", error.message);
    res.status(500).json({ error: "Failed to get prediction from ML model." });
  }
});

export default router;
