
// Replacing callbacks with promises

console.log('Before');

//  Promise - based approach

// getUser(1)
//     .then(user => getRepositories(user.gitHubUserName))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits ', commits))
//     .catch(err => console.log('Error ', err.message));


/* 
    Async and Await approach : it is a syntactical sugar over promise-based approach
    so that our code looks sync. but doesnt executed sync. Also here we dont
    have catch method so we handle errors using try and catch block.
*/ 

async function displayCommits(){
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUserName);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }catch(err){
        console.log('Error ', err.message);
    }
}
displayCommits();

console.log('After');


// asychronous functions

function getUser(id){
    return new Promise((resolve,reject) =>{
        // kicking off async work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id,gitHubUserName: 'gitesh'});
        }, 2000);
    });

}

function getRepositories(username){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Calling gitHub API...');
            resolve(['repo1','repo2','repo3']);
            // reject(new Error('Could not find any repository));
        }, 2000);
    });
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github API.....');
            resolve(['commit']);
        });
    });
}