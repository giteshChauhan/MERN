/*
    When document in saved in MongoDB collection it provides an ID with
    that document. i.e.
    _id: 5a724953ba8354795757541e6a

    This id is of 12 bytes in which
        - 4 bytes : timestamp
        - 3 bytes : machine identifier
        - 2 bytes: process identifier
        - 3 bytes: counter

    There is very very very little chance that two ids are same.
    The Driver -> MongoDB creates that id.Thats why app built using 
    mongoDB is highly scalable.
*/

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id);

// to get timestamp

console.log(id.getTimestamp());

// to validate objecid using ObjectId class

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);