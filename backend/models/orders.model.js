const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  title: { type: String, required: false },
  seller: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false }
  },
  client: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false }
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
