var express = require('express');
var router = express();

const db = require('../db');
router.get('/', (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()//get value from db.json
    })
});
router.get('/search', (req, res) => {
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
router.get('/create', (req, res) => {
    res.render('users/create');
});
router.get('/:id', (req, res) => {
    var userID = parseInt(req.params.id);
    var userInfo = db.get('users').find({id: userID}).value();
    console.log(userInfo);
    res.render('users/viewUser', {
        info: userInfo.name
    });
});

module.exports =    router;