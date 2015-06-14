var cwd = process.cwd();

var fs       = require('fs');

var assert   = require('chai').assert;
var bluebird = require('bluebird');
var request  = bluebird.promisifyAll(require('request'));

var Server = require('dworkin');

var PLUGINS = Server.PLUGINS.slice();
var plugins = require(cwd);

describe('Static', function() {
    after(function() { Server.PLUGINS = PLUGINS; });

    it('server', function(done) {
        plugins([ 'static' ]);
        var error;
        var server = new Server();
        server.static({ '/' : cwd + '/test/app/public' });

        server.start(4012).then(function() {
            return request.getAsync({ url  : 'http://127.0.0.1:4012' });
        }).then(function(result) {
            assert.deepEqual(result[1], fs.readFileSync(cwd + '/test/app/public/index.html', 'utf8'), 'See valid index.html')
            return result;
        }).catch(function(err) { error = err; }).finally(function() {
            server.stop().then(function() { done(error); });
        });;
    });
});