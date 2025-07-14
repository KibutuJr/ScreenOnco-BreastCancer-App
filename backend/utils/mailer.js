import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, text, html }) {
  await transporter.sendMail({
    from: `"ScreenOnco" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
