/*
    Two ways to work with related object:
    1) Using references (Normalization)
    2) Using embedded documents (Denormalization)
    Both approaches have its importance and weaknesses.
    There is a tradeoff between query performance vs consistency
*/

// Using References  -> CONSISTENCY

let author = {
    name: 'Gitesh'
}

let course = {
    author: 'id'
}


// Using Embedded Documents  -> PERFORMANCE

let courses = {
    author: {
        name: 'Gitesh'
    }
}


// Hybrid Approach

let authors = {
    name: 'Gitesh'
    // 50 other properties
}

let coursess = {
    author: {
        id: 'ref',
        name: 'Gitesh'
    }
}