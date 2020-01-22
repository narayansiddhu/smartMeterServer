const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const { UserController } = require('../controllers');


router.post('/register', UserController.registerUser);

router.get('/getAlluers', authController.isFacebookCallback,function(req, res){
    res.send("This the Auth Data")
});

module.exports = router;
