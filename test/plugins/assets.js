var cwd = process.cwd();

var fs       = require('fs');

var assert   = require('chai').assert;
var bluebird = require('bluebird');
var request  = bluebird.promisifyAll(require('request'));
var Mincer   = require('mincer');

var environment = new Mincer.Environment();
environment.appendPath(cwd + '/test/app/assets');
environment.appendPath(cwd + '/test/app/vendor');

var Server = require('dworkin');

var PLUGINS = Server.PLUGINS.slice();
var plugins = require(cwd);

describe('Assets', function() {
    after(function() { Server.PLUGINS = PLUGINS; });

    it('server', function(done) {
        plugins([ 'assets' ]);
        var error;
        var server = new Server();
        server.assets({ '/assets' : [ cwd + '/test/app/assets', cwd + '/test/app/vendor' ] });

        server.start(4012).then(function() {
            return request.getAsync({ url  : 'http://127.0.0.1:4012/assets/scripts/index.js' });
        }).then(function(result) {
            assert.deepEqual(result[1], environment.findAsset('scripts/index.js').toString(), 'See valid asset')
            return result;
        }).catch(function(err) { error = err; }).finally(function() {
            server.stop().then(function() { done(error); });
        });
    });
});