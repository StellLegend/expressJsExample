require('dotenv').config();

const express = require('express');
const app = express();
const port = 4000;

var cookieParser = require('cookie-parser');

const userRoute = require('./route/user.route');
const homeRoute = require('./route/home.route');
const loginRoute = require('./route/login.route');
const products = require('./route/product.route');

app.set('view engine', 'pug');
app.set('views', './views');

console.log(process.env.COOKIE_SECRET);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('', homeRoute);
app.use('/users', userRoute);
app.use('/auth', loginRoute);
app.use('/products', products);

app.listen(port, () => 
    console.log(`Example app listening on port ${port}`));