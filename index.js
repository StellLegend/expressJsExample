const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var users = [
    {id: 1, name: 'Phu'},
    {id: 2, name: 'Huy'}
];
app.get('/', (req, res) => {
    res.render('index', {name: 'Phu'})
});
app.get('/users', (req, res) => {
    res.render('users/index', {
        users: users
    })
});
app.get('/users/search', (req, res) => {
    var q = req.query.q; //get q attribute in url
    var matchUser = users.filter((user) => {//find q in users list
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchUser,
        input: q
    });
    console.log(req.query)
});
app.get('/users/create', (req, res) => {
    res.render('users/create');
});
app.post('/users/create', (req, res) => {
    users.push({id: users.length, name: req.body.add});
    console.log(req.body.add);
    res.redirect('/users');
});
app.listen(port, () => 
    console.log(`Example app listening on port ${port}`));