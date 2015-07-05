var session = require('express-session');

module.exports = function() {
    Dworkin.PLUGINS.push(function (server) {
        server.session = function(config) {
            server.express.use(session(config));
        };
    });
};