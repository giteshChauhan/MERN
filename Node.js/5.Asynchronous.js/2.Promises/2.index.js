
// Replacing callbacks with promises

console.log('Before');

    // consuming promises

getUser(1)
    .then(user => getRepositories(user.gitHubUserName))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits ', commits))
    .catch(err => console.log('Error ', err.message));

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