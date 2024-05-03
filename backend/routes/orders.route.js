const express = require('express');
const orderController = require('../controllers/orders.controller.js');

const router = express.Router();

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get an order by ID
router.get('/:id', orderController.getOrderById);

module.exports = router;
