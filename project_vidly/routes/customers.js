const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const router = express.Router();

const customerSchema = new mongoose.Schema({
    isGold:{type:Boolean,default:false},
    name:{
        type:String,
        default:"customer",
        maxlength:20,
        minlength:3
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        length:10
    }
});

const Customers = mongoose.model('customer',customerSchema);

router.get('/',async (req,res) => {
    const customers = await Customers.find().sort('name');
    res.send(customers);
});

router.get('/:id',async (req,res) => {
    const customer = await Customers.findById(req.params.id);
    if(!customer) return res.send('No such ID exists');
    res.send(customer);
});

router.post('/',async (req,res) => {
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customers( {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id',async (req,res) => {
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findByIdAndUpdate(req.params.id,{
        new: true
    });
    if(!customer) return res.send('No such ID exists');
    res.send(customer);
});

router.delete('/:id',async (req,res) => {
    const customer = await Customers.findByIdAndRemove(req.params.id);
    if(!customer) return res.send('No such ID exists');
    res.send(customer);
});

function validateCustomer(customer){
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().max(20).min(3),
        phone: Joi.string().length(10).required()
    });
    return schema.validate(customer);
}

module.exports = router;