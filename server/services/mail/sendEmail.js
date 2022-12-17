const createError = require("http-errors");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL_ADD,
        pass: process.env.SENDER_APP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.SENDER_EMAIL_ADD,
      to: email,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError.InternalServerError();
  }
};

module.exports = sendEmail;
