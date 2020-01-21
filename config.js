var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/smart-energy-meter',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGOLAB_URI || 'mongodb://admin:testadmin1@ds359868.mlab.com:59868/smartmeter',
        port: process.env.PORT || 80
    }
};