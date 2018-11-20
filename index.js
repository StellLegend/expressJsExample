const express = require('express');
const app = express();
const port = 4000;

const userRoute = require('./route/user.route');
const homeRoute = require('./route/home.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use('', homeRoute);
app.use('/users', userRoute);

app.listen(port, () => 
    console.log(`Example app listening on port ${port}`));