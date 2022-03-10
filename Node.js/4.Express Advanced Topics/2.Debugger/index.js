// loading debug .It is the better way for debugging.Prefer debug module for console.log statements

const startupDebugger = require('debug')('app:startup');// arbitrary namespace for debugging
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app =express();

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled....');
}

// some db work

dbDebugger('Connected to the database.....');

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}......`));