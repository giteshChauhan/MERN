const mongoose = require('mongoose');
const {logger} = require('../logger/');


module.exports = function (){
    mongoose.connect('mongodb://localhost/project_vidly')
    .then(() => logger.info('Connected to database...'));
}