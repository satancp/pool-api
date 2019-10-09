'use strict';

module.exports = app => {
    require('./router/platform/IpRouter')(app);
    require('./router/platform/EmailRouter')(app);
    require('./router/platform/OrderRouter')(app);
    require('./router/platform/MobileRouter')(app);
};
