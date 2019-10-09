module.exports = async agent => {
    agent.messenger.on('cacheUpdate', data => {
        agent.messenger.sendToApp('cacheUpdate', data);
    });
};
