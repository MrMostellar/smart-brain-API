const handleSignIn = (req, res, db, bcrypt) => {
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
                console.log(err);
                return res.status(400).json('User not found')
            }
        })
    })
    .catch(err =>{
        return res.status(400).json('Incorrect email/password combination');
    })
}

module.exports = {handleSignIn};