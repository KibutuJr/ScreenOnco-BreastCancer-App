import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  to: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  from: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Message", MessageSchema);
