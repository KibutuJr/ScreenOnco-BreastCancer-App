// backend/utils/notify.js
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ✅ For regular sandbox messages (you've already done this)
export const sendWhatsApp = async ({ to, body }) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body,
    });
    console.log("✅ WhatsApp (plain) sent to", to);
  } catch (err) {
    console.error("❌ WhatsApp (plain) failed:", err.message);
  }
};

// ✅ For WhatsApp template messages
export const sendWhatsAppTemplate = async ({ to, template, params }) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      contentSid: template, // You need the SID of the template, or use messaging service (recommended)
      contentVariables: JSON.stringify(params), // Maps to {{1}}, {{2}}, etc.
    });
    console.log("✅ WhatsApp template sent to", to);
  } catch (err) {
    console.error("❌ WhatsApp template failed:", err.message);
  }
};
