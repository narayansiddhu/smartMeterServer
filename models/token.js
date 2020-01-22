// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var TokenSchema   = new mongoose.Schema({
  access_token: { type: String, required: true },
  token_type:{type:String,default:'bearer'},
  state:{type:String},
  userId: { type: String, required: true },
  clientId: { type: String, required: true },
  clientObjectId: { type: String, },
},{
  strict: false,
  versionKey: false,
  usePushEach : true
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);