
const EventEmitter = require('events');

const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', arg => {
    console.log('Listener called',arg);
});

// Raise an event
// emitter.emit('messageLogged'); 

/* quite often when we raise an event we also want to 
    send some data in an object so adding additional 
    arguments when raising an event. */

emitter.emit('messageLogged',{ id: 1, url: 'http://'});