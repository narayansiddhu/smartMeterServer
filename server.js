const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    exphbs = require('express-handlebars'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    app = express();
require('dotenv').config()
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envConfig = require('./config')[env];
console.log("application environment : ",envConfig)

require('./database');
require('express-async-errors');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
require('./routes/index')(app);
app.listen(envConfig.port, function () {
    console.log('Server listening on port ' + envConfig.port)
});