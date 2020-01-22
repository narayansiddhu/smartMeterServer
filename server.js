const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const app = express();
require('dotenv').config()
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envConfig = require('./config')[env];
console.log("application environment : ",envConfig)

require('./database');
require('express-async-errors');
// Express Session

app.use(session({
    secret: "authorize",
    key: "authorize",
    saveUninitialized: true,
    resave: false
}));
  
// Passport init
app.use(passport.initialize());
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