const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const login = require('./routes/login');
const auth = require('./middleware/auth');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/project_vidly')
    .then(() => console.log('Connected to database...'))
    .catch((err) => console.log('Could not connect to database..',err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',auth,genres);
app.use('/api/customers',customers);
app.use('/api/movies',auth,movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/login',login);


const port = process.env.port || 3000;
app.listen(port,() => console.log(`Listening on port ${port}......`));