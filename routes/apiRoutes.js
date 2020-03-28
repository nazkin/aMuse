const User = require('../models/user');
const {verifyToken} = require('../middleware');
const jwt = require('jsonwebtoken');


module.exports = function(app){
    app.get('/', (req, res) => res.json({
        message:"Server home"
    }));
//***************************************************AUTHENTICATION ROUTES 
//Sign-up
app.post('/api/signup', (req, res)=> {
    User.create({
        username: req.body.username,
        password: req.body.password
   
    },(err, usr)=> {
        console.log(usr);
        if(!err){
            jwt.sign({id: usr._id, user: usr.username}, 'secretkey', (err,token)=>{
                res.json({
                    message: "User created and signed-in",
                    token: token
                });
            });
        }else {
            res.json(`Error: ${err.message}`);
        }
    });
});
//Login
app.post('/api/login', (req, res)=> {
    const username = req.body.username;
    const password = req.body.password; 

    User.findOne({
        username
    }, (err, usr)=> {
        usr.verifyPassword(password)
            .then(valid=> {
                if(valid){
                    //jwt.sign() send out the token during the log-in process just like you would for sign-up
                    jwt.sign({id: usr._id, user: usr.username}, 'secretkey', (err, token)=> {
                        res.json({
                            message: 'User found and loggen in',
                            token: token
                        });
                    });
                }else {
                    res.json('invalid');
                }
            }).catch(err=> res.json(err));
    });
});
//Protected home page
app.get('/api/home', verifyToken, (req, res)=> {
    res.json({
        message: "Token Verified Successfully"
    });
});

}