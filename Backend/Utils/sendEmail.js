const nodemailer = require("nodemailer");

const sendVerificationEmail = (user) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const verificationLink = `http://localhost:3000/verify-email/${user.id}`;  // Replace with your actual app URL

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: user.email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the following link: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending verification email:", error);
        } else {
            console.log("Verification email sent: " + info.response);
        }
    });
};

module.exports = sendVerificationEmail;
