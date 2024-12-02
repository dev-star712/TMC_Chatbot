
import nodemailer from "nodemailer";

const sendEmail = async (subject, text, to, user) => {
    try {
        const SMTP_USER = process.env.SMTP_USER
        const SMTP_PASSWORD = process.env.SMTP_PASSWORD
      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      });
  
      const mailDetails = {
        from: `"${user || SMTP_USER}" <${SMTP_USER}>`,
        to,
        subject,
        html: text,
      };
  
      await mailTransporter.sendMail(mailDetails);
      console.log("Email sent successfully");
      return true;
    } catch (err) {
      console.log("An error occurred while sending email.");
      console.log(err);
    }
  };

 export default sendEmail