'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/api/get_ips', controller.platform.ipController.getIps);
};
