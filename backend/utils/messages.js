import Message from "../models/Message.js";

export async function createInAppMessage({ to, from, subject, body }) {
  return Message.create({ to, from, subject, body });
}
