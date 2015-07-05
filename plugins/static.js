var express = require('express');
var Dworkin = require('dworkin');

module.exports = function() {
    Dworkin.PLUGINS.push(function (server) {
        server.static = function (static_paths) {
            Object.keys(static_paths).forEach(function (route) {
                (Array.isArray(static_paths[route]) ? static_paths[route] : [ static_paths[route]]).forEach(function(r) {
                    server.express.use(route, express.static(r));
                });
            });
        };
    });
};