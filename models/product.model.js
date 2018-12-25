var mongoose = require('mongoose');

var productSChema = mongoose.Schema({
    name: String,
    image: String,
    desciption: String
});

var Product = mongoose.model('Product', productSChema, 'products');
module.exports = Product;