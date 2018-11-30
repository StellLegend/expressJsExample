const db = require('../db');

module.exports.cart = (req, res, next) => {
    var productId = req.params.productId;
    var sessionID = req.signedCookies.sessionID;
    if(!sessionID){
        res.redirect('/products');
        return;
    }
    var idNow = db
        .get('sessions')
        .find({id: sessionID})
        .get('cart.' + productId, 0);//undefined if o not defind

    db.get('sessions')
        .find({id: sessionID})
        .set('cart.' + productId, idNow+1)
        .write();
    next();
};