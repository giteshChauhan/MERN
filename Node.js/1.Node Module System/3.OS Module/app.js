// Loading a built-in 'OS' module

const os = require('os');

// some useful methods

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`
Total Memory : ${totalMemory}
Free Memory : ${freeMemory}`);
