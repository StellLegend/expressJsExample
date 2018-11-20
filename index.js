const express = require('express');
const app = express();
const port = 4000;

var bodyParser = require('body-parser');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync') //prefer use async

const adapter = new FileSync('db.json')
const db = low(adapter);

db.defaults({users: []})
    .write();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Phu'
    });
});
app.get('/users', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()//get value from db.json
    })
});
app.get('/users/search', (req, res) => {
    var q = req.query.q; //get q attribute in url
    
    var matchUser = db.get('users').value().filter((user) => {//find q in users list
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(matchUser);
    res.render('users/index', {
        users: matchUser,// input : array
        input: q
    });
    console.log(req.query)
});
app.get('/users/create', (req, res) => {
    res.render('users/create');
});
app.get('/users/:id', (req, res) => {
    var userID = parseInt(req.params.id);
    var userInfo = db.get('users').find({id: userID}).value();
    console.log(userInfo);
    res.render('users/viewUser', {
        info: userInfo.name
    });
});
app.post('/users/create', (req, res) => {
    db.get('users').push({ name: req.body.add})
        .write();
    console.log(req.body.add);
    res.redirect('/users');
});
app.listen(port, () => 
    console.log(`Example app listening on port ${port}`));