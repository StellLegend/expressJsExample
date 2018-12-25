var express = require('express');
var multer  = require('multer');

var upload = multer({ dest: './public/uploads/' });//add folder

var router = express();


var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



const controller = require('../controller/user.controller');

const authMiddleware = require('../middleware/login.middleware');
const userMiddleware = require('../validate/user.validate');

router.get('/', authMiddleware.loginAuth, controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.getID);
router.get('/update/:id', controller.update);
router.post('/update',
    upload.single('avatar'),
    userMiddleware.postUpdate,
    controller.postUpdate
    );
router.post('/create', 
    upload.single('avatar'), 
    userMiddleware.postCreate, 
    controller.postCreate
);
router.get('/delete/:id', controller.delete);
router.use(express.static('public'));
module.exports = router;