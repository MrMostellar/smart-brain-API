const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Phosphorus1!',
      database : 'postgres'
    }
  });

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors());
// app.use(express.urlencoded({extended: false}));

//How to handle when a user requests to sign in with their data from a profile that exists:
app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else{
        res.status(400).json('Incorrect email or password..');
    }
});

//How to handle when a user sends data to register a new profile:
app.post('/signup', (req, res) =>{
    const {name, email, password} = req.body;
    db('users').insert({
        name: name,
        email: email,
        joined: new Date()
    }).then(console.log);
    res.json(db('users').select([0]));
});

app.get('/profile/:id', (req, res) =>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return res.json(user); 
        }
    })
    if(!found){
        res.status(404).json('No profile found');
    }
});

app.put('/image', (req, res) =>{
    const {id} = req.body
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries); 
        }
    })
    if(!found){
        res.status(404).json('No profile found');
    }
});

app.listen(3000);