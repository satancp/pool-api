'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/api/get_emails', controller.platform.emailController.getEmails);
    router.post('/api/create_email', controller.platform.emailController.createEmail);
    router.post('/api/delete_email', controller.platform.emailController.deleteEmail);
    router.post('/api/get_specified_email_mail_list', controller.platform.emailController.getEmailList);
    router.post('/api/solidify_email', controller.platform.emailController.solidifyEmail);
    router.post('/api/remove_solidify_email', controller.platform.emailController.removeSolidifyEmail);
    router.get('/api/get_solidify_emails', controller.platform.emailController.getSolidifyEmails);
};
