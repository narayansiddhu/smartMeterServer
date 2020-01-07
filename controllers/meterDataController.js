
var base64 = require("base-64");
var hex64 = require("hex64");
var converter = require("hex2dec");
const hex2ascii = require("hex2ascii");
var async = require("async");
var _ = require("lodash");
var moment = require("moment");
const Promise = require("bluebird");


const MeterController = {
     index(req, res) {
         var data = {...req.body}
         console.log("Meter Data Response ##### :",data)
         res.send({
             "status":"success",
             "data":"received"
         })
    }
};

module.exports = MeterController;