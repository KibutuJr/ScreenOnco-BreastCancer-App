import mongoose from "mongoose";

const riskAssessmentSchema = new mongoose.Schema(
  {
    age: Number,
    bmi: Number,
    familyHistory: String,
    cancerType: String,
    geneticMutation: String,
    menarcheAge: Number,
    menopauseAge: String,
    children: String,
    hormoneTherapy: String,
    riskScore: Number,
    riskCategory: String,
    email: String,
  },
  { timestamps: true }
);

const RiskAssessment = mongoose.model("RiskAssessment", riskAssessmentSchema);
export default RiskAssessment;
