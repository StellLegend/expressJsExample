const md5 = require('md5');

const db = require('../db');

module.exports.login = (req, res) => {
    res.render('auth/login');
};

module.exports.postLogin = (req, res) => {
    var email = req.body.email;
    var password = parseInt(req.body.password);
    var user = db.get('users').find({email: email}).value();
    if(!user){
        res.render('auth/login', {
            errors: "Email or Password are wrong",
            values: req.body
        });
        return;
    }
    var hashedPassword = md5(password);
    if(user.password !== hashedPassword){
        res.render('auth/login', {
            errors: "Email or Password are wrong",
            values: req.body
        });
        return;
    }
    res.cookie('userID', user.id);
    res.redirect('/users');
};