var express = require('express');
var router = express();

const controller = require('../controller/product.controller');

const authMiddleware = require('../middleware/login.middleware');

router.get('/', authMiddleware.loginAuth, controller.index);


module.exports = router;