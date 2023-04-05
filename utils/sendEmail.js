const nodemailer = require("nodemailer");
const nodeMailerConfig = require("./nodeMailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodeMailerConfig);

  return transporter.sendMail({
    from: '"Lodge Finder" <support@lodge-finder.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
