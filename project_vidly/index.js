const express = require('express');
const Joi = require('joi');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/genres',genres);


const port = process.env.port || 3000;
app.listen(port,() => console.log(`Listening on port ${port}......`));