const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/Order')
const verifyToken = require('../middleware/authMiddleware');

orderRouter.post('/create_order', verifyToken, orderController.createOrder);
orderRouter.get('/order_history', verifyToken, orderController.getOrdersByUserId)

module.exports = orderRouter;
