const User = require('../models/user.model');
const md5 = require('md5');
var fs = require('fs');
module.exports.index = async (req, res) =>{
    let users = await User.find();
    res.render('users/index', {
        users: users
    })
};
module.exports.search = async (req, res) => {
    let q = req.query.q;
    let inputSearch = "/" + req.query.q + "/i"
    let matchUser = await User.find({name: inputSearch});
    res.render('users/index', {
        users: matchUser,// input : array
        input: q
    });
};
module.exports.create = (req, res) => {
    res.render('users/create');
};
module.exports.update = async (req, res) => {
    let userID = req.params.id;
    let userInfo = await User.findById(userID);
    res.render('users/update', {
        info: userInfo
    });
};
module.exports.postUpdate = async (req, res) => {
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    let userUpdated = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.newEmail,
        password: md5(parseInt(req.body.newPassword)),
        avatar: req.body.avatar
    };
    User.findByIdAndUpdate(req.body.id, userUpdated, {new: true}, (err) => {
        if(err) return res.status(500).send(err);
        return res.redirect('/users');
    });

};
module.exports.getID = async (req, res) => {
    let userID = req.params.id;
    let userInfo = await User.findById(userID);
    res.render('users/viewUser', {
        info: userInfo
    });
};
module.exports.postCreate = async (req, res) => {
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    let newUser = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: md5(parseInt(req.body.password)),
        avatar: req.body.avatar
    };
    let insertUser = new User(newUser);
    insertUser.save((err) => {
        if(err) console.log(err);
    });
    res.redirect('/users');
};
module.exports.delete = async (req, res) => {
    let userID = req.params.id;
    let userInfo = await User.findById(userID);
    User.findByIdAndRemove(userID, (err) => {
        if(err) return res.status(500).send(err);
        return res.status(200).redirect('/users');
    });
    fs.unlinkSync("public/" + userInfo.avatar, (err) => {
        if(err) throw err;
    })
}