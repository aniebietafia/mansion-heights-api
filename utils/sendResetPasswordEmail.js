const sendEmail = require("./sendEmail");

const sendResetPassswordEmail = async ({ fullName, email, token, origin }) => {
  const resetURL = `${origin}/user/reset?token=${token}&email=${email}`;
  const message = `<p>Click the link below to reset your password:
  <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${fullName}</h4>
   ${message}
   `,
  });
};

module.exports = sendResetPassswordEmail;
