/* 
    Validation is meaningful in mongoose only. MongoDB does not provide any
    validations like SQL. Some Built-in validators are :
    1) required.
    2) minlength
    3) maxlength
    4) match
    5) enum

    We can also define custom validators and Async validators.

    Few Schema options:
    1) lowecase
    2) uppercase
    3) trim
    4) Custom getter
    5) Custom setter

 */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Error encountered..', err));


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        lowercase: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web','Mobile','Network']
    },
    author: String,
    // tags:{
    //     type: Array,
    //     validate:{   // custom validator
    //         validator: function(v){
    //             return v && v.length > 0;
    //         },
    //         message: 'A course should have atleast one tag.'
    //     }
    // },
    tags:{
        type: Array,
        validate:{    // Async validator
            isAsync: true,
            validator: function(v,callback){
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                },4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date,default: Date.now},
    isPublished: Boolean,
    price:{
        type:Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});


const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    
    const course = new Course({
        name: 'Node.js Course',
        category: '-',
        author: 'Gitesh',
        tags:['node','backend'],
        isPublished: true,
        price: 15
    });
    
    try{
        // const isValid = await course.validate();// manually validating
        // if(!isValid) throw new Error('Not valid');
        const result = await course.save();// validation is automatically triggers when we use await
        console.log(result);

    }catch(ex){ // handling validation errors
        // console.log(ex.message);
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
}

createCourse();