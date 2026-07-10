import nodemailer from "nodemailer";

const registrationEmail = async (email, otp, firstName, lastName) => {
  const emailTransport = nodemailer.createTransport({
    service: `${process.env.EMAIL}`,
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const emailDetails = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "registration Successfull",
    html: `

    Hi ${firstName} ${lastName}
    Welcome to my website. Use this code to verify your account ${otp}`,
  };
  await emailTransport.sendMail(emailDetails);
};

export default registrationEmail;
