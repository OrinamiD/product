import nodemailer from "nodemailer";

const forgotPasswordEmail = async (email, otp) => {
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
    subject: "FORGOT PASSWORD MAIL",
    html: `

   Here is your otp to reset your password ${otp}
   

      <br>

      <hr>

      <p>If you are not the one that requested for the otp, Please contact customer care on: +634876327838923249234789</p>
      
      
      
      `,
  };
  await emailTransport.sendMail(emailDetails);
};

export default forgotPasswordEmail;
