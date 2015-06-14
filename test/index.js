var cwd = process.cwd();

var fs       = require('fs');

var assert   = require('chai').assert;
var Server   = require('dworkin');

var plugins = require(cwd);

describe('Assets', function() {
    var DEFAULT_PLUGINS = Server.PLUGINS.slice();
    beforeEach(function() { Server.PLUGINS = DEFAULT_PLUGINS.slice(); });
    after(function() { Server.PLUGINS = DEFAULT_PLUGINS.slice(); });

    it('all plugins', function() {
        plugins();

        assert.equal(Server.PLUGINS.length, DEFAULT_PLUGINS.length + fs.readdirSync(cwd + '/plugins').length, 'See valid plugins');
    });

    it('Selected plugins', function() {
        plugins([ 'assets' ]);

        assert.equal(Server.PLUGINS.length, DEFAULT_PLUGINS.length + 1, 'See valid plugins');
    });
});