const md5 = require('md5');
const User = require('../models/user.model');

module.exports.login = (req, res) => {
    res.render('auth/login');
};
module.exports.logout = (req, res) => {
    res.clearCookie('userID')
        .clearCookie('sessionID')
        .redirect('/auth/login');
};
module.exports.postLogin = async (req, res) => {
    let email = req.body.email;
    let password = parseInt(req.body.password);
    let matchUser = await User.find({email: email}, (err) => {
        if(err) {
            res.render('auth/login', {
                errors: "Email or Password are wrong",
                values: req.body
            });
            return;
        }
    });
    if(matchUser[0].password !== md5(password)){
        res.render('auth/login', {
            errors: "Email or Password are wrong",
            values: req.body
        });
        return;
    }
        res.cookie('userID', matchUser[0].id, { signed : true});
        res.redirect('/').render({name: matchUser[0].phone});
    
    
};