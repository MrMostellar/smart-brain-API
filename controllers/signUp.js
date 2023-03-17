const handleSignUp = (req, res, db, bcrypt) => {
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
                    console.log(err);
                    return res.status(400).json('Unable to register');
                })
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        if(err){
            console.log(err);
        }
    })
}

module.exports = {handleSignUp};