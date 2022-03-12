// creating settled promises. Understanding Promise API more in detail.

const p = Promise.resolve({id: 1});
p.then(result => console.log(result));


// sometimes we want to call reject method

const r = Promise.reject(new Error('Reason for rejection...'));/* Here we use
new Error object so that while displaying error we also see callstack */
r.catch(error => console.log(error));


// running promises in parallel

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1.....');
        resolve(1);
    },2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2.....');
        resolve(2);
    },2000);
});

Promise.all([p1,p2]) // this returns a new promise that is resolves once the promises in array are resolved
    .then(result => console.log(result))
    .catch(err => console.log('Error ', err.message));

/* 
    If we want to settle only one promise say p1 in this case as soon as
    it is resolved we can use Promise.race() function.
*/