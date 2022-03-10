// Loading a event emitter class of 'events' module

const EventEmitter = require('events');

// some useful methods of this class
// but first we need to make an object of this class in order to use its various properties

const emitter = new EventEmitter();


// Register a listener
emitter.on/*rather we can also use listener*/('messageLogged', function(){
    console.log('Listener called');
});

// emit means making a noise or produce something - basically signaling that event has happened

// Raise an event
emitter.emit('messageLogged'); 

/* emit() function must be declared after on() method
    because emit() iterates over every registered listener
    when called. */