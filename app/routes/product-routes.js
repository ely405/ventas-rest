'use strict';

const express = require('express');
const productController = require('../controller/product-ctrl');

const api = express.Router();

api.get('/product', productController.getAllProducts);
api.get('/product/:productId', productController.getProduct);
api.post('/product', productController.saveProduct);
api.put('/product/:productId', productController.updateProduct);
api.delete('/product/:productId', productController.deleteProduct);

module.exports = api;