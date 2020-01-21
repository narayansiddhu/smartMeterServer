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
        res.send("hello world! welcome to the users list")
    }
};

module.exports = UserController;