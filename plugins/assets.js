var Dworkin = require('dworkin');
var Mincer  = require('mincer');

module.exports = function() {
    Dworkin.PLUGINS.push(function (server) {
        server.assets = function (assets) {
            Object.keys(assets).forEach(function (route) {
                var mincer_env = new Mincer.Environment();
                var assets_path = assets[route];
                (Array.isArray(assets_path) ? assets_path : [assets_path]).forEach(function (path) {
                    mincer_env.appendPath(path);
                });
                server.express.use('/assets', Mincer.createServer(mincer_env));
            });
        };
    });
};