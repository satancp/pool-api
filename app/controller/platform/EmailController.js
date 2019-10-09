'use strict';

const Controller = require('../../../custom_module/Basic/BasicController');

class EmailController extends Controller {
    async getEmails() {
        const { ctx } = this;
        const result = await ctx.service.platform.emailService.getEmails();
        this.success(result);
    }

    async createEmail() {
        const { ctx, app } = this;
        const paramRule = {
            email: { type: 'string', required: true },
            nickname: { type: 'string', required: true },
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const newEmail = {
            userid: `${param.email}${app.config.wechat.email_sufix}`,
            name: param.nickname,
            department: [app.config.wechat.departmentid],
            password: app.config.wechat.password,
        };
        const result = await ctx.service.platform.emailService.createEmail(newEmail);
        this.success(result);
    }

    async solidifyEmail() {
        const { ctx } = this;
        const paramRule = {
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const result = await ctx.service.platform.emailService.solidifyEmail(param);
        this.success(result);
    }

    async removeSolidifyEmail() {
        const { ctx } = this;
        const paramRule = {
            email: { type: 'string', required: true },
            password: { type: 'string', required: true },
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const result = await ctx.service.platform.emailService.removeSolidifyEmail(param);
        this.success(result);
    }

    async getSolidifyEmails() {
        const { ctx } = this;
        const result = await ctx.service.platform.emailService.getSolidifyEmails();
        this.success(result);
    }

    async deleteEmail() {
        const { ctx } = this;
        const paramRule = {
            email: { type: 'string', required: true },
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        param.email = `${param.email}${app.config.wechat.email_sufix}`;
        const result = await ctx.service.platform.emailService.deleteEmail(param);
        this.success(result);
    }

    async getEmailList() {
        const { ctx, app } = this;
        const paramRule = {
            email: { type: 'string', required: true },
            begin_date: { type: 'string', required: true },
            end_date: { type: 'string', required: true },
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const newParams = {
            begin_date: param.begin_date,
            end_date: param.end_date,
            mailtype: 2,
            userid: param.email,
        };
        const result = await ctx.service.platform.emailService.getEmailList(newParams);
        this.success(result);
    }
}

module.exports = EmailController;
