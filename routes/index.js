const Donation = require('./Donation');
const Profile = require('./Profile');
const Request = require('./Request');
const UserDetails = require('./User');

module.exports = function (app) {
    app.use('/api', UserDetails)
    app.use('/api', Donation);
    app.use('/api', Profile);
    app.use('/api', Request);
};