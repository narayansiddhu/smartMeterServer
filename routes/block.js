const express = require('express')
const router = express.Router()
const authController = require("../controllers/auth");
const { BlockController } = require('../controllers');

router.get('/blocks', BlockController.index);

router.get('/getblocks', authController.isFacebookCallback,function(req, res){
    res.send("Get the data")
});
router.get('/auth/facebook',authController.isFacebookAuthenticated)
router.get('/auth/facebook/callback',authController.isFacebookCallback,
  function(req, res) {
    // Successful authentication, redirect home.
   console.log("successfull")
  }
);

module.exports = router;
