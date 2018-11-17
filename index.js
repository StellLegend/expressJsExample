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

app.listen(port, () => 
    console.log(`Example app listening on port ${port}`));