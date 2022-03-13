// loading mongoose module
const mongoose = require('mongoose');

// connecting to our mongoDB database

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error encountered..', err));


/*
    Defining a schema. We use schema to define the shape of document inside
    a collection in a mongoDB. Types of Schema:
    1) String 
    2) Number
    3) Date
    4) Buffer
    5) Boolean
    6) ObjectID
    7) Array
*/

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date: {type: Date,default: Date.now},
    isPublished: Boolean
});

// compiling schema to a model class
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    
    const course = new Course({
        name: 'Node.js Course',
        author: 'Gitesh',
        tags:['node','backend'],
        isPublished: true
    });
    
    // saving a document in our database
    
    const result = await course.save();
    console.log(result);
}

// createCourse();

// Quering documents

// async function getCourses(){
//     const courses = await Course
//         .find({author: 'Gitesh', isPublished:true })
//         .limit(10)
//         .sort({name: 1})
//         .select({name: 1, tags: 1});
//     console.log(courses);
// }

    // using comparasion operators

//async function getCourses(){
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // .find({price: {$gt: 10, $lte: 20}})
    // .find({price: {$in: [10,15,20]}})
//}

    // using logical query operators

// async function getCourses(){
//     // or
//     // and

//     const courses = await Course
//         .find()
//         .or([{author: 'Gitesh'}, {isPublished: true}]);
//     console.log(courses);
// }


    // regular expressions

// async function getCourses(){
//     const courses = await Course
//         //.find({author:/^Gitesh/}); // here ^ character means string starting with Gitesh

//         //.find({author:/Chauhan$/}); // string ending with chauhan
//         //.find({author:/Chauhan$/i}); // to make it case insensitive

//         .find({author:/.*Gitesh.*/}); // contains Gitesh in a string anywhere in b/w
//         console.log(courses);
// }

    // implementing pagenation using skip() method

// async function getCourses(){
//     const pageNumber = 2;
//     const pageSize = 10;
//     // in real-world this values are passed as /api/courses?pageNumber=2&pageSize=10

//     const courses = await Course
//         .find({author: 'Gitesh', isPublished:true })
//         .skip((pageNumber - 1) * pageSize)
//         .limit(pageSize)
//         .sort({name: 1})
//         .select({name: 1, tags: 1});
//     console.log(courses);
// }

// getCourses();

// updating a document - Query first

async function updateCourse(id){
    // Approach: Query first
    // findById()
    // Modify its Properties
    // save()

    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another author';

    const result = await course.save();
    console.log(result);
}

// updating a document - Update First (using update operators)
// Use this approach only if there are no checks

async function updateCourse(id){
    const result = await Course.update({_id:id},{
        $set: {
            author: 'Sahil',
            isPublished: false
        }
    });
    console.log(result);
}


// removing a document

async function removeCourse(id){
    const result = await Course.deleteOne({_id: id});
    // Course.findByIdAndRemove(id); // we can also use this
    console.log(result);
}
