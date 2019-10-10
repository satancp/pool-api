'use strict';

const Controller = require('../../../custom_module/Basic/BasicController');

class BotController extends Controller {
    async getBots() {
        const { ctx } = this;
        const result = await ctx.service.docker.botService.getBots();
        this.success(result);
    }
}

module.exports = BotController;
