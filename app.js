const cache = require('memory-cache');
const path = require('path');
require('./custom_module/index');

module.exports = app => {
    require('babel-register')({
        plugins: ['transform-decorators-legacy', 'transform-object-rest-spread'],
    });
    app.beforeStart(() => {
        let daoPaths = app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app/dao'));
        daoPaths = daoPaths.filter(v => {
            if (v.indexOf('node_modules') === -1) return v;
        });
        app.loader.loadToContext(daoPaths, 'dao', {
            call: true,
            fieldClass: 'daoClasses',
        });
        app.router.routerParsed = app.router.stack.map(v => v.path);
    });
    app.messenger.on('cacheUpdate', data => {
        const temp = JSON.parse(data);
        cache.put(temp.key, temp.value, temp.lifetime);
    });
};
