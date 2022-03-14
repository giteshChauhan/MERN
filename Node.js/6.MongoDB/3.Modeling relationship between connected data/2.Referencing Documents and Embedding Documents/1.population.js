/*
    Setting the relation between author and course modeling schema.
    In real-world application we use populate() method to show the actual
    document when in relation with other collection.
*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course',new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

async function createAuthor(name, bio, website){
    const author = new Author({
        name,
        bio,
        website
    });
    
    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses(){
    const courses = await Course
        .find()
        .populate('author','name -_id') /* it populate the author collection when listcourses() is called.
            As an second argument we can specify the property we want to include or exclude.*/
        .select('name');
    console.log(courses);
}

// createAuthor('Gitesh', 'My Bio', 'My Website');

// createCourse('Node Course', '622ed5440bc586fca3f9bb78');

listCourses();