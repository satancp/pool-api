'use strict';

const Controller = require('../../../custom_module/Basic/BasicController');

class MobileController extends Controller {
    async getMobile() {
        const { ctx } = this;
        const paramRule = {
            type: { type: 'enum', required: true, values: ['nike'] }
        };
        this.validate(paramRule, ctx.request.query);
        const param = ctx.request.query;
        const result = await ctx.service.platform.mobileService.getMobile(param);
        this.success(result);
    }

    async releaseMobile() {
        const { ctx } = this;
        const paramRule = {
            type: { type: 'enum', required: true, values: ['nike'] },
            mobile: { type: 'string', required: true }
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const result = await ctx.service.platform.mobileService.releaseMobile(param);
        this.success(result);
    }

    async getMessage() {
        const { ctx } = this;
        const paramRule = {
            type: { type: 'enum', required: true, values: ['nike'] },
            mobile: { type: 'string', required: true }
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const result = await ctx.service.platform.mobileService.getMessage(param);
        this.success(result);
    }
}

module.exports = MobileController;
