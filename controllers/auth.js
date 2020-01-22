var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const Token = require('../models/token');



passport.use(new FacebookStrategy({
    clientID: '431330834208965',
    clientSecret: '8d96e4e31375f09a4f56ee252ec8b906',
    callbackURL: "https://smartmeterserver.herokuapp.com/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, function (token, refreshToken, profile, cb) {
       console.log('checking the data@@@@@@@@@@@',token)
       console.log("checking the profile@@@@",profile)
       cb(null,profile)
    }
  ));

  function uid(len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  function createAccessToken(client, user_id, callback) {
    User.findOne({_id: user_id}, function(err, user) {
        if(err) { console.log(err); callback(err); } else {
            var token = new Token({
                access_token: uid(256),
                token_type: 'Bearer',
                clientId: client.clientId,
                userId: user._id,
              });
            //  console.log(util.inspect(token, false, null));
              // Save the access token and check for errors
              token.save(function (err) {
                if (err) {  console.log(err); return callback(err); }
                User.findByIdAndUpdate(
                  token.userId,
                  { $push: { "access_tokens": { access_token: token.access_token, token_type: 'Bearer', clientId: client.clientId } } },
                  { safe: true, new: true },
                  function (err, model) {
                    callback(null, token.access_token);
                  }
                );
                // callback(null, token);
              });
        }
    })
}


  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: 'Unknown User' });
        }
  
        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            var client = {
              clientId : '12341241243234',  
            }
            createAccessToken(client,user._id,function(err,result){
              if(err){

              }else{
                console.log("checking the data!!!!!!!!!!!",result)
                return done(null, user);
              }
            })

          } else {
            return done(null, false, { message: 'Invalid password' });
          }
        });
      });
    }));


  
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
      User.getUserById(id, function (err, user) {
        done(err, user);
      });
    });
    passport.use(new BearerStrategy(
        function (accessToken, callback) {
          Token.findOne({ access_token: accessToken }, function (err, token) {
            if (err) { return callback(err); }
      
            // No token found
            if (!token) { return callback(null, false); }
      
            User.findOne({ _id: token.userId }, function (err, user) {
              if (err) { return callback(err); }
      
              // No user found
              if (!user) { return callback(null, false); }
              // Simple example with no scope
              return callback(null, user, { scope: '*' });
            });
          });
        }
      ));

   
exports.isFacebookAuthenticated = passport.authenticate('facebook');

exports.isFacebookCallback = passport.authenticate('facebook');

exports.isLocalAuthenticate = passport.authenticate('local')