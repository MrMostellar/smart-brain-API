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
    const {email, password} = req.body;
    
    db.select('email', 'hash').from('signin')
    .where('email', '=', email)
    .then(credentials =>{
        bcrypt.compare(password, credentials[0].hash, (err, result) =>{
            if(result){
                return db.select('*').from('users')
                .where('email', '=', email)
                .then(user =>{
                    res.json(user[0]);
                })
            } else{
                return res.status(400).json('User not found')
            }
        })
    })
});

//How to handle when a user sends data to register a new profile:
app.post('/signup', (req, res) =>{
    const {name, email, password} = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) =>{
        db.transaction(trx =>{
            trx.insert({
                hash: hash,
                email: email
            })
            .into('signin')
            .returning('email')
            .then(loginEmail =>{
                trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user => {
                    return res.json(user[0]);
                })
                .catch(err =>{
                    return res.status(400).json('Unable to register');
                })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
    })
});

app.get('/profile/:id', (req, res) =>{
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user =>{
        if(user.length){
            return res.json(user[0]);
        } else{
            return res.status(400).json('No profile found');
        }
    }) 
    .catch(err =>{
        res.status(404).json('No profile found');
    })
});

app.put('/image', (req, res) =>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0].entries);
    })
});

app.listen(3000);