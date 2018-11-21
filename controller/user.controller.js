const db = require('../db');
const shortid = require('shortid');
module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()//get value from db.json
    })
};
module.exports.search = (req, res) => {
    var q = req.query.q; //get q attribute in url
    
    var matchUser = db.get('users').value().filter((user) => {//find q in users list
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchUser,// input : array
        input: q
    });
};
module.exports.create = (req, res) => {
    res.render('users/create');
};
module.exports.getID = (req, res) => {
    var userID = req.params.id;
    var userInfo = db.get('users').find({id: userID}).value();
    console.log(userInfo);
    res.render('users/viewUser', {
        info: userInfo.name
    });
};
module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();
    var errors = "Name or Phone are required";
    if(!req.body.name || !req.body.phone){
        res.render('users/create', {
            values: req.body,
            error: errors
        });
        return;
    }
    db.get('users').push(req.body).write();
    res.redirect('/users');
};