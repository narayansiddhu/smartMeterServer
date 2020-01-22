const express = require('express')
const router = express.Router()
const { UserController,AuthController } = require('../controllers');




//Test server side render login Page
router.get('/login',function(req, res){
    res.render('login')
});

router.post('/register', UserController.registerUser);

router.post('/login', AuthController.isLocalAuthenticate,UserController.login);

router.get('/users',AuthController.isBearerAuthenticated,UserController.usersList);




module.exports = router;
