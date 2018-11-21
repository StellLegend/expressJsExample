module.exports.postCreate = (req, res, next) => {
    var errors = "Name or Phone are required";
    if(!req.body.name || !req.body.phone){
        res.render('users/create', {
            values: req.body,
            error: errors
        });
        return;
    }
    next();
};