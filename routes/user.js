const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const { UserController } = require('../controllers');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/api/noauth');
    }
}
router.post('/register', UserController.registerUser);

router.get('/login',function(req, res){
    res.render('login')
  });
router.post('/login', authController.isLocalAuthenticate,function(req, res){
    res.send("Auth data")
  });
router.get('/getallusers', ensureAuthenticated,function(req, res){
  res.send("Auth data")
});
router.get('/noauth',function(req, res){
    res.send("Not Authenticated ")
  });
  



module.exports = router;
