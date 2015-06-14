var express = require('express');
var Dworkin = require('dworkin');

module.exports = function() {
    Dworkin.PLUGINS.push(function (server) {
        server.static = function (static_paths) {
            Object.keys(static_paths).forEach(function (route) {
                server.express.use(route, express.static(static_paths[route]));
            });
        };
    });
};