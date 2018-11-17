const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

var users = [
    {id: 1, name: 'Phu'},
    {id: 2, name: 'Huy'}
];
app.get('/', (req, res) => {
    res.render('index', {name: 'Phu'})
});
app.get('/users', (req, res) => {
    res.render('users/index', {
        user: users
    })
});


app.listen(port, () => 
    console.log(`Example app listening on port ${port}`));