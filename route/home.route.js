var express = require('express');
var router = express();

const controller = require('../controller/home.controller');
router.get('/', controller.home);

module.exports = router;