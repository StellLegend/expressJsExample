module.exports.postCreate = (req, res, next) => {
    let errors = "Name or Phone are required";
    if(!req.body.name || !req.body.phone){
        res.render('users/create', {
            values: req.body,
            error: errors
        });
        return;
    }
    next();
};
module.exports.postUpdate = (req, res, next) => {
    let errors = "Name or Phone are required";
    if(!req.body.name || !req.body.phone){
        res.render('users/update',{
            info: req.body,
            error: errors
        });
        return;
    }
    next();
}