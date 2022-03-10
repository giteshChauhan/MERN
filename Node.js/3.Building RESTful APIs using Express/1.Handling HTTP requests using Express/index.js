// loading express function

const express = require('express');
const app = express();

// loading joi class (this class is used for input validation)

const Joi = require('joi');

app.use(express.json());

// 1) Handling HTTP get requests :

    // defining a route
    /* we define route by defining path (url) and call back function called route handler */
    app.get('/',(req, res) => {
        res.send('Hello world!');
    });

    // defining another route

    app.get('/api/courses', (req, res) => {
        // res.send([1,2,3]); /* Here in real world scenario we will given list of courses form DB*/
        res.send(courses);
    });

    // defining another route

    app.get('/api/posts/:year/:month', (req, res) => {
        res.send(req.params); /* here we can also read string query (localhost:5000/api/posts/2022/3?sortBy=name)
            the value after ? is the string query which is stored in the form of key : value pair like {sortBy : name }*/
    });

    // defining another route

    const courses = [
        {id: 1,name: 'course1'},
        {id: 2,name: 'course2'},
        {id: 3,name: 'course3'},
    ];

    app.get('/api/courses/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course)/*to check 404 */ return res.status(404).send('The course with given ID was not found.');
        res.send(course);
    });
    
    
// 2) Handling HTTP post requests :
    
    app.post('/api/courses', (req, res) => {
        // defining a schema and validating the user input for that we created the separate function named validateCourse
        
        const { error } = validateCourse(req.body); // { error } is the example of object destructuring
        
        if(error)/* 400 bad request*/return res.status(400).send(error.details[0].message);

        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    });
    
// 3) Handling HTTP put requests
    
    app.put('/api/courses/:id', (req,res) => {
        // look up the course
        // if not existing, return 404
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course)/*to check 404 */return res.status(404).send('The course with given ID was not found.');
        
        // validate
        // if invalid, return 400 -Bad request

        const { error } = validateCourse(req.body); // { error } is the example of object destructuring
        
        if(error)/* 400 bad request*/ return res.status(400).send(error.details[0].message);

        // Update course
        course.name = req.body.name;
        // Return the updated course
        res.send(course);
    });

    function validateCourse(course){
        const schema = Joi.object({
            name: Joi.string().min(3).required()
        });

        return schema.validate(course);
    }


// 4) Handling HTTP delete requests

    app.delete('/api/courses/:id', (req, res) => {
        // Look up the course
        // Not existing , return 404
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if(!course)/*to check 404 */return res.status(404).send('The course with given ID was not found.');

        // Delete
        const index = courses.indexOf(course);
        courses.splice(index, 1);

        // Return the same course
        res.send(course);
    });


// listening these calls on given port

/* In real world app port is dynamically assigned by the hosting environmnet.
    So we use environment variable called PORT. Value of environment varible
    is outside this application*/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));

/* 
    In this implementation we dont have those if{} blocks as in http module.
    Instead we are defining new routes using app.get() and as our app grows
    we can put these routes in separate modules. So express gives our app
    a skeleton or a structure.
*/
