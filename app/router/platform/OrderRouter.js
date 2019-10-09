'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/api/get_orders', controller.platform.orderController.getOrders);
    router.get('/api/get_order', controller.platform.orderController.getOrder);
    router.post('/api/create_order', controller.platform.orderController.createOrder);
    router.post('/api/delete_order', controller.platform.orderController.deleteOrder);
    router.post('/api/update_order', controller.platform.orderController.updateOrder);
};
