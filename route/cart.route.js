var express = require('express');
var router = express();

var controller = require('../controller/cart.controller');
const productController = require('../controller/product.controller');
router.get('/add/:productId',controller.cart,  productController.index);
module.exports = router;