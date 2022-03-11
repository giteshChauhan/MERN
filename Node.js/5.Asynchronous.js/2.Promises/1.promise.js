/* 
    Promise is an object which holds the eventual result of an 
    asynchronous operation.
    There are three stages/states involded in promise:
    1) Pending 
    2) Fulfilled / resolved
    3) Rejected
*/

const p = new Promise((reslove, reject) => {
    // kick off some async work
    setTimeout(() => {
        // reslove(1); // it returns a value to the user
        reject(new Error('message')); // in case something goes wrong
    } , 2000);

});

p
    .then(result => console.log('Result ', result))
    .catch(err => console.log('Error', err.message));
