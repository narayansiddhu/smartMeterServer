var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;



passport.use(new FacebookStrategy({
    clientID: 'S',
    clientSecret: 's',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, function (token, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));


  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function (email, password, callback) {
      console.log('at local strategy');
  
      User.findOne({ email: email }, function (err, user) {
        if (err) { return callback(err); }
  
        // No user found with that username
        if (!user) { return callback(null, false); }
  
        // // Make sure the password is correct
        // user.verifyPassword(password, function(err, isMatch) {
        //   if (err) { return callback(err); }
  
        //   // Password did not match
        //   if (!isMatch) { return callback(null, false);}
        console.log('!!Found user with name : ' + user.name);
        // Success
        return callback(null, user);
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