// Loading a built-in 'path' module

const path = require('path');

// some useful methods

let pathObj = path.parse(__filename);
console.log(pathObj);