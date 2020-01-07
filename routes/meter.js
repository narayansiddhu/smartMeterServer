const express = require('express')
const router = express.Router()
const { MeterController } = require('../controllers');

router.post('/meterData', MeterController.index);

module.exports = router;
