const DonationController = {
     index(req, res) {
         var data = {...req.body}
         console.log("Meter Data Response ##### :",data)
         res.send({
             "status":"success",
             "data":"received"
         })
    }
};

module.exports = DonationController;