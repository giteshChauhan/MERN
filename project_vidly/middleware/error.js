
module.exports = function(err,req,res,next){
    // Log the exception
    res.send(500).send('Something failed.');
}