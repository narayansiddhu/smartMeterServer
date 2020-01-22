var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');


passport.serializeUser((user, done)=>{
  done(null, user);
});

passport.deserializeUser((user, done)=>{
  done(null, user);
});
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
            console.log('user:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ', user);
            return done(null, user);
          } else {
            return done(null, false, { message: 'Invalid password' });
          }
        });
      });
    }));
  

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