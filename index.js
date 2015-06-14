var PLUGINS = {
    assets : 'plugins/assets',
    static : 'plugins/static'
};

module.exports = function(plugins) {
    (plugins || Object.keys(PLUGINS)).forEach(function(plugin) { require(__dirname + '/' +PLUGINS[plugin])(); });
};