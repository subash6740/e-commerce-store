const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/Product')

productRouter.get('/', productController.getAllProducts);
productRouter.get('/categories', productController.getProductsByCategories);
productRouter.get('/:id', productController.getProductById);

module.exports = productRouter;
