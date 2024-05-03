const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: 'roothq.africa',
  port: 465,
  secure: true,
  auth: {
    user: 'support@roothq.africa',
    pass: 'Vision.2032',
  },
});

const sendEmailToAllUsers = async (email, username) => {
  try {
    await transporter.sendMail({
      from: '"Root team" <support@roothq.africa>',
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
          <p style="color: #0F253B;">Root is a vibrant marketplace where you can discover and offer freelance talent, services, and handmade items in Lagos. Your support means the world to us, and we want to express our sincere gratitude for signing up and being part of this incredible journey.</p>
          <p style="color: #0F253B;">At Root, our mission is to change Africa for the better by showing the world the beauty in African services and products. We believe in the potential of Africa and its people, and we're excited to have you join us in this mission.</p>
          <p style="color: #0F253B;">You can visit our website <a href="https://www.roothq.africa" style="color: #0F253B; text-decoration: underline;">here</a> to explore more.</p>
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
