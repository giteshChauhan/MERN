const devLogger = require('./devLogger');
const xlogger = require('./exceptionLogger');
const rlogger = require('./rejectionLogger');

// by default logger will export devLogger
let logger = devLogger;


module.exports.logger = logger;
module.exports.xlogger = xlogger;
module.exports.rlogger = rlogger;