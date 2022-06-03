const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const app = express();

mongoose.connect('mongodb://localhost/project_vidly')
    .then(() => console.log('Connected to database...'))
    .catch((err) => console.log('Could not connect to database..',err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',genres);


const port = process.env.port || 3000;
app.listen(port,() => console.log(`Listening on port ${port}......`));