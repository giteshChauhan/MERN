/* 
    Middleware function : It is a function  that access request object and either
    returns the response to the client or passes control to another middleware function.
    In express, technically every route function is a middleware function.
    Another example of middleware function is express.json  
*/

// morgan and helmet are third party middleware
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const log = require('./logger');
const authenticate = require('./authentication');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());

// configuration
console.log(
`Application Name: ${config.get('name')}
Mail Server: ${config.get('mail.host')}
Mail Password: ${config.get('mail.password')}`
);

// setting environment
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled....');
}

// building custom middleware

app.use(log);

app.use(authenticate);

// Handling get request

const courses = [
    {id: 1,name: 'course1'},
    {id: 2,name: 'course2'},
    {id: 3,name: 'course3'},
];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Handlinig post request

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
        
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

// listening calls on port

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}......`));