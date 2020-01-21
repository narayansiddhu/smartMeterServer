const User = require('../models/user');
const UserController = {
    registerUser(req, res) {
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var newUser = new User({
            email: email,
            username: username,
            password: password
        });    
        User.createUser(newUser, function (err, user) {
            if (err){
                console.log(err)
            }else{
               res.send({
                   "data":"success"
               })
            }
        });
    }
};

module.exports = UserController;