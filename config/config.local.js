'use strict';

module.exports = appInfo => {
    const config = {};
    const customConfig = {
        // myAppName: 'egg',
    };
    return {
        ...config,
        ...customConfig
    };
};
