const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers');


router.get('/users', UserController.index);



module.exports = router;
