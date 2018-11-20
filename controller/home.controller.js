module.exports.home = (req, res) => {
    res.render('index', {
        name: 'Phu'
    });
};