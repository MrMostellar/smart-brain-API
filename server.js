const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const signIn = require('./controllers/signIn');
const signUp = require('./controllers/signUp');
const profile = require('./controllers/profile');
const imageCount = require('./controllers/image');
const apiCall = require('./controllers/imageUrl');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cgb2ogpmbg55nqkqijrg-a.oregon-postgres.render.com',
      port : 5432,
      user : 'mostellar',
      password : `${process.env.DB_PASSWORD}`,
      database : 'smart_brain_db_zcgo',
      ssl: true
    }
  });

const app = express();
app.use(express.json());
app.use(express.text());
app.use(cors());

// app.use(express.urlencoded({extended: false}));

//How to handle when a user requests to sign in with their data from a profile that exists:
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});

//How to handle when a user sends data to register a new profile:
app.post('/signup', (req, res) => {signUp.handleSignUp(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) =>{profile.handleprofile(req, res, db)});

app.post('/imageUrl', (req, res) => {apiCall.handleApiCall(req, res)});

app.put('/image', (req, res) =>{imageCount.handleImageCount(req, res, db)});

app.listen(process.env.PORT);
console.log(`App is running on port ${process.env.PORT}`);