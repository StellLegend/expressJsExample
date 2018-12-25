const Product = require('../models/product.model');

module.exports.index = async (req, res) => {
    let pageIndex = (!parseInt(req.query.page)) ? 0 : parseInt(req.query.page);
    let products =  await Product.find().limit(12).skip(pageIndex * 10);
    res.render('product/index', {
        products: products,
        num: pageIndex + 1
    });
};
module.exports.search = async (req, res) => {
    let pageIndex = (!parseInt(req.query.page)) ? 0 : parseInt(req.query.page);
    let searchText = "\"" +req.query.search  + "\"";
    let products =  await Product.find({$text:{$search: searchText}}).limit(12).skip(pageIndex * 10);
    res.render('product/index',{
        products: products,
        num: pageIndex + 1
    });
};