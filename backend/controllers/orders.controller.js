const Order = require("../models/orders.model.js");
const createError = require("../utils/createError");
const nodemailer = require('nodemailer');


const sendEmailNotification = async (seller, client, title) => {
  const transporter = nodemailer.createTransport({
    host: 'roothq.africa',
    port: 465,
    secure: true,
    auth: {
      user: 'support@roothq.africa',
      pass: 'Vision.2032',
    },
  });

  const mailOptions = {
    from: '"Root team" <support@roothq.africa>',
    to: 'daissegun096@gmail.com, favourosoaku@gmail.com, ogunleyeh54@gmail.com',
    subject: 'New Order Received',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              font-size: 24px;
              color: #333;
            }
            p {
              font-size: 16px;
              color: #666;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Order Received</h1>
            <p>Seller ${seller.name} (${seller.email}, ${seller.phone}) has received an order for "${title}" from Client ${client.name} (${client.email}, ${client.phone}).</p>
          </div>
          <div class="footer">This email was sent by Root.</div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};


const createOrder = async (req, res, next) => {
  const { title, seller, client } = req.body;

  console.log(title)

  const newOrder = new Order({
    title,
    seller,
    client,
  });

  try {
    const savedOrder = await newOrder.save();
    await sendEmailNotification(seller, client, title);
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    console.log(message);
  } catch (err) {
    next(err);
  }
};


const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return next(createError(404, 'Order not found'));
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

module.exports = { createOrder, getAllOrders, getOrderById };
