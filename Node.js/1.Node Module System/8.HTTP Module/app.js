// Loading a built-in 'http' module

const http = require('http');

const server = http.createServer((req,res) =>{
    if(req.url === '/'){
        res.write('Hello user');
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});/* server created using http . This server contains all the
 capabilities of an event listener.*/ 

 server.listen(3000);

 console.log('Listening on port 3000.....');

 /* In real world app we doesn't use this http module the reason being 
    we are adding all the routes in a single call back function and with 
    increase in these routed the code gets complicated. Instead we use 
    Express framework which gives structure to our app and handle all
    these routes cleanly.
    
    "Internally Express framework is built on top of the HTTP Module."
    
*/