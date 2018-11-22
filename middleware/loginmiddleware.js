const db = require('../db');

module.exports.loginAuth = (req, res, next) => {
    console.log(req.signedCookies);
    if(!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    }

    var idUser = db.get('users').find({id: req.signedCookies.userID}).value();
    console.log(idUser);
    if(!idUser){
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = idUser;
    next();
};