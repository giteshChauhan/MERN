
/*  In real world app we doesn't use EventEmitter class directly rather
    we create our own class extending EventEmitter containing all the 
    capabilities of the EventEmitter class*/

/* The reason why we use our own class is when we raise an event from 
    different module (logger.js in this case), the listener of main class
    (app.js in this case) will not process that raised event because these 
    methods are part of two different objects of EventEmitter class.Thats
    why we need our own class and use a single object of our own extended
    class. */
    const EventEmitter = require('events');
    
    const Logger = require('./logger');
    const logger =new Logger();

    // Register a listener

    logger.on('messageLogged',(arg) => {
        console.log('Listener called',arg);
    });

    logger.log('message');