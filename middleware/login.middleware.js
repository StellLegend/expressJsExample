const User = require('../models/user.model');

module.exports.loginAuth = async (req, res, next) => {
    if(!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    }
    let idUser = await User.findById(req.signedCookies.userID);
    if(!idUser){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = idUser.id;
    next();
};