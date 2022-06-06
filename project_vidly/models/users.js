const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required:true,
        unique: true,
        minlength: 11,
        maxlength: 255
    },
    password:{
        type: String,
        required:true,
        minlength: 8,
        maxlength: 1024
    }
});

const Users = mongoose.model('user',userSchema);

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(11).max(255),
        password: Joi.string().required().min(8).max(255)
    });
    return schema.validate(user);
}

exports.validate = validateUser;
exports.Users = Users;