// Using underscore package

let _ = require('underscore');
/* require() function resolves the module in three ways:
    First it assumes it is a: Core module
    then Second : File or folder
    then Third : node_modules
*/

// some methods of underscore package

let result = _.contains([1,2,3],2);
console.log(result);