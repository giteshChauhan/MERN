
const admin = function (req,res,next) {
    if(!req.body.isAdmin) return res.status(403).send('Access Denied');
    next();
}

module.exports = admin;