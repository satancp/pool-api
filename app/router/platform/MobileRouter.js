'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/api/get_mobile', controller.platform.mobileController.getMobile);
    router.post('/api/release_mobile', controller.platform.mobileController.releaseMobile);
    router.post('/api/get_message', controller.platform.mobileController.getMessage);
};
