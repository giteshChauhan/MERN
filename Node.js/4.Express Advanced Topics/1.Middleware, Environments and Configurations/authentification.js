
function authenticate(req, res, next){
    console.log('Authenticationg......');
    next();
}

module.exports = authenticate;