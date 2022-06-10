const mongoose = require('mongoose');
const winston = require('winston');


module.exports = function (){
    mongoose.connect('mongodb://localhost/project_vidly')
    .then(() => winston.info('Connected to database...'));
}