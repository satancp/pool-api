'use strict';

const Controller = require('../../../custom_module/Basic/BasicController');

class IpController extends Controller {
    async getIps() {
        const { ctx } = this;
        const result = await ctx.service.platform.ipService.getIps();
        this.success(result);
    }
}

module.exports = IpController;
