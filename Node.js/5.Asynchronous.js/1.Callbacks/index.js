/* 
    There are three ways to deal with asynchronous code:
    * Callbacks.
    * Promises.
    * Await / Async
*/

// underastanding callbacks

console.log('Before');

/*
    getUser(1, (user) => {
        console.log('User', user);// there is a callback hell problem means 
        // nested callbacks problem or christmas tree problem.

        getRepositories(user.gitHubUserName, (repo) => {
            console.log('Repo ', repo);
        });
    }); 
*/

// better way to escape callback hell

getUser(1, getRepositories);

console.log('After');

// asychronous functions

function getRepositories(user){
    getRepositories(user.gitHubUserName, getCommits);
}

function getCommits(repos){
    getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id: id,gitHubUserName: 'gitesh'});
    }, 2000);
}

function getRepositories(username,callback){
    setTimeout(() => {
        console.log('Calling gitHub API...');
        callback(['repo1','repo2','repo3']);
    }, 2000);
}