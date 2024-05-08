const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: 'roothq.africa',
  port: 465,
  secure: true,
  auth: {
    user: 'support@roothq.africa',
    pass: 'Visio',
  },
});

const sendEmailToAllUsers = async (email, username) => {
  try {
    await transporter.sendMail({
      from: '"Ayinla" <support@ayinla.com>',
      to: email,
      subject: 'Welcome to Root',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #ffffff;
                color: #0F253B;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              h1 {
                color: #0F253B;
              }
              p {
                margin-bottom: 20px;
              }
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #0F253B;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
              }
              .button:hover {
                background-color: #17415B;
              }
            </style>
          </head>
          <body>
          <div class="container">
          <h1>Welcome to Root!</h1>
          <p style="color: #0F253B;">Dear ${username}, </p>
          <p style="color: #0F253B;">Welcome to Ayinla</p>
          <p style="color: #0F253B;">Welcome to Ayinla films, Discover your ideal film location
          You deserve a good location for your film location. Quickly maximize timely deliverables for real time schemas.</p>
          <p style="color: #0F253B;">You can visit our website <a href="https://ayinlafilms.com" style="color: #0F253B; text-decoration: underline;">here</a> to explore more.</p>
          <p style="color: #0F253B;">Best Regards,</p>
          <p style="color: #0F253B;">Root Team.</p>
        </div>
          </body>
        </html>
      `,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmailToAllUsers;

// Example call
// sendEmailToAllUsers('recipient@example.com', 'Recipient Name');
