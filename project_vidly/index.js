const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let genres = [
    {id:1,name:"thriller"},
    {id:2,name:"romantic"},
    {id:3,name:"action"}
];

app.get('/api/genres/',(req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id',(req,res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.send('No such id exists');
    res.send(genre);
});

app.post('/api/genres/',(req,res) =>{
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id',(req,res) =>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.send('No such id exists');
    const {error} = validateGenre(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    genres[genres.findIndex(c => c.id === parseInt(req.params.id))].name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id',(req,res) =>{
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


const port = process.env.port || 3000;
app.listen(port,() => console.log(`Listening on port ${port}......`));