const express = require('express');
const bcrypt = require('bcrypt');
const {Users, validate} = require('../models/users');
const _ = require('lodash');
const router = express.Router();

router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    user = new Users(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    res.send(_.pick(user,['_id','name','email']));
});

module.exports = router;