

// In order to load a module (logger) we use require() function

const logger = require('./logger'); // returns an object that we exported from logger module

logger.log('message to the logger');


/*  Node does not implement this code directly. It wraps this code inside a function i.e.
(function (exports, require, module, __filename, __dirname){
    
    
    
    
})
    This function is called the Modular Wrapper Function
*/

console.log(__filename);
console.log(__dirname);