const Donation = require('./Donation');
const Profile = require('./Profile');
const Request = require('./Request');
const Users = require('./Users');

module.exports = function (app) {
    app.use('/api', Users)
    app.use('/api', Donation);
    app.use('/api', Profile);
    app.use('/api', Request);
};