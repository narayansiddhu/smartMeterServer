const express = require('express')
const router = express.Router()
const { BlockController } = require('../controllers');

router.get('/blocks', BlockController.index);

module.exports = router;
