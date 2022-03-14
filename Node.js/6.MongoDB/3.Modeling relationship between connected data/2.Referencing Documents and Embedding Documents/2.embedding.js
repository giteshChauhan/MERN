// Using Embedding to relate documents
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course',new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
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
        .populate('author','name -_id')
        .select('name');
    console.log(courses);
}

async function updateAuthor(courseId,name){
    const course = await Course.findById(courseId);/* or we can update it directly :
    const course = await Course.update({_id: courseId}, {
        $set: {
            'author.name': 'John Smith'
        }
    }); with this there is no need to modify and save it explicitly in DB*/
    course.author.name = name;
    course.save();
}

// createCourse('React Course', new Author({name: 'Sahil'}));
updateAuthor('622ede84706383d82623d439','Sahil Kadian');
