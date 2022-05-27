const express = require('express');
const Joi = require('joi');
const router = express.Router();

let genres = [
    {id:1,name:"thriller"},
    {id:2,name:"romantic"},
    {id:3,name:"action"}
];

router.get('/',(req,res) => {
    res.send(genres);
});

router.get('/:id',(req,res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.send('No such id exists');
    res.send(genre);
});

router.post('/',(req,res) =>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id',(req,res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.send('No such id exists');
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    genres[genres.findIndex(c => c.id === parseInt(req.params.id))].name = req.body.name;
    res.send(genre);
});

router.delete('/:id',(req,res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.send('No such id exists');
    genres.splice(genres.findIndex(c => c.id === parseInt(req.params.id)),1);
    res.send(genre);
});

function validateGenre(name){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(name);
}

module.exports = router;