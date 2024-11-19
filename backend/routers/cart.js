const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controllers/Cart')
const verifyToken = require('../middleware/authMiddleware')

cartRouter.get('/cart', verifyToken, cartController.getCart);
cartRouter.post('/empty_cart', verifyToken, cartController.emptyCart);
cartRouter.post('/add_cart_item', verifyToken, cartController.addCartItem);
cartRouter.post('/delete_cart_item', verifyToken, cartController.deleteCartItem);

module.exports = cartRouter;