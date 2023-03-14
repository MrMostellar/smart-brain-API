const express = require('express');

const database = {
    users:[
        {
            name: 'Andrew',
            email: 'abc123@gmail.com',
            password: 'password',
            entries: 0
        },
        {
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'password2',
            entries: 5
        }
    ]
}  

const app = express();
app.use(express.json());
app.use(express.text());
// app.use(express.urlencoded({extended: false}));

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success');
    } else{
        res.status(400).json('error signing in..');
    }
});

    //request access by submitting a new user, email, and password
    //post/request entry score

app.listen(3000);