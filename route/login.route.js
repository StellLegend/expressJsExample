var express = require('express');
var router = express();

var bodyParser = require('body-parser');

const loginCtrl = require('../controller/auth.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', loginCtrl.login);
router.post('/login', loginCtrl.postLogin);

module.exports = router;