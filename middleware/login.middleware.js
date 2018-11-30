const db = require('../db');

module.exports.loginAuth = (req, res, next) => {
    if(!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    }

    var idUser = db.get('users').find({id: req.signedCookies.userID}).value();
    if(!idUser){
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = idUser;
    next();
};