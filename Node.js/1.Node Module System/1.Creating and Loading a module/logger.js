/* Here we are sending the http request to myLogger url in cloud  */
let url = 'http://myLogger.io/log';

function log(message){
    // Send an HTTP request
    console.log(message);
}

// as we know every file in node is a module so we are using
// one of the property of module object i.e. exports in order to 
// access this logger outside its module

module.exports.log = log; // here we can also send a single function i.e. module.exports = log
/* module.exports.endPoint = url; // we can also change the name of object when exported i.e In this case we changed url name into endPoint.
    But properties like url is an implementation detail and should not be send outside of this module*/