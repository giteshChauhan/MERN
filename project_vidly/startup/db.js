const mongoose = require('mongoose');
const logger = require('./logging');


module.exports = function (){
    mongoose.connect('mongodb://localhost/project_vidly')
    .then(() => logger.info('Connected to database...'));
}