const Donation = require('./Donation');
const Profile = require('./Profile');
const Request = require('./Request');
const User = require('./User');

module.exports = function (app) {
    app.use('/api', User)
    app.use('/api', Donation);
    app.use('/api', Profile);
    app.use('/api', Request);
};