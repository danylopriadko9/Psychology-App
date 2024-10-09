import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error(
          `[server:nomemailer]: New error ocuured ${error.message}`
        );
      } else {
        console.log(
          '[server:nodemailer]: Email was send successful',
          info.response
        );
      }
    });
  } catch (error) {
    throw new Error(`[server/nodemailer]: ${String(error)}`);
  }
};
