// Loading a built-in 'file system' module

const fs = require('fs');

// some useful methods 
// in real-world app we always use asynchronous methods

const files = fs.readdirSync('./');
console.log(files);

fs.readdir('./',function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result', files);
});

 // in asynchronous methods uses call back function as second argument