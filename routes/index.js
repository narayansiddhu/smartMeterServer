const blockRoute = require('./block');
const meterRoute = require('./meter');
const userRoute = require('./user');

module.exports = function (app) {
    app.use('/api', blockRoute);
    app.use('/api', userRoute);
    app.use('/api', meterRoute);
};