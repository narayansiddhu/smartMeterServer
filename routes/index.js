const Donation = require('./Donation');
const Profile = require('./Profile');
const Request = require('./Request');
const sdsdfsd = require('./Users');

module.exports = function (app) {
    app.use('/api', sdsdfsd)
    app.use('/api', Donation);
    app.use('/api', Profile);
    app.use('/api', Request);
};