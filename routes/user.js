const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const { UserController } = require('../controllers');


router.post('/register', UserController.registerUser);

router.get('/login',function(req, res){
    res.render('login')
  });
router.post('/login', authController.isLocalAuthenticate,function(req, res){
    res.send("Auth data")
  });
router.get('/getallusers', ensureAuthenticated,function(req, res){
  res.json({
      "data":[
          {"name":"sid"},
          {"name":"veeru"},
          {"name":"ravi"},
          {"name":"anil"},
          {"name":"Sai"},
      ]
  })
  
});
router.get('/noauth',function(req, res){
    res.send("Not Authenticated ")
});
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/api/login');
});  

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/api/noauth');
    }
}

module.exports = router;
