const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    passport = require('passport'),
    session = require('express-session')
    app = express();
require('dotenv').config()
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envConfig = require('./config')[env];
console.log("application environment : ",envConfig)

require('./database');
require('express-async-errors');
// Express Session


app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
  
// Passport init
app.use(passport.initialize());
app.use(passport.session());
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Express Session


app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
require('./routes/index')(app);
app.listen(envConfig.port, function () {
    console.log('Server listening on port ' + envConfig.port)
});