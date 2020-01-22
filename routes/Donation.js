const express = require('express')
const router = express.Router()
const { DonationController } = require('../controllers');

//router.get('/blocks', DonationController.index);

// router.get('/dontaions', authController.isFacebookCallback,function(req, res){
//     res.send("Get the data")
// });
// router.get('/auth/facebook',authController.isFacebookAuthenticated)
// router.get('/auth/facebook/callback',authController.isFacebookCallback,
//   function(req, res) {
//    res.redirect('/api/blocks')
//   }
// );

module.exports = router;
