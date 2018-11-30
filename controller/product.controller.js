const db = require('../db');

module.exports.index = (req, res) => {
    var pageIndex = (!parseInt(req.query.page)) ? 1 : parseInt(req.query.page);

    var start = (pageIndex - 1)*8;
    var end = pageIndex*8;
    res.render('product/index', {
        products: db.get('products').value().slice(start, end),
        num: pageIndex
    });
};