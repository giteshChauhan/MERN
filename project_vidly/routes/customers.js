const { Customers,validate} = require('../models/customers');
const express = require('express');
const router = express.Router();


router.get('/',async (req,res) => {
    const customers = await Customers.find().sort('name');
    res.send(customers);
});

router.get('/:id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const customer = await Customers.findById(req.params.id);
    if(!customer) return res.send('No such ID exists');
    res.send(customer);
});

router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customers( {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findByIdAndUpdate(req.params.id,{
        name: req.body.name
    },{new: true});
    if(!customer) return res.send('No such ID exists');
    res.send(customer);
});

router.delete('/:id',async (req,res) => {
    if(! mongoose.isValidObjectId(req.params.id))
        return res.status(400).send('Invalid Id');
    const customer = await Customers.findByIdAndRemove(req.params.id);
    if(!customer) return res.send('No such ID exists');
    res.send(customer);
});

module.exports = router;