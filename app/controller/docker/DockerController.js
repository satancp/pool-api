'use strict';

const Controller = require('../../../custom_module/Basic/BasicController');

class DockerController extends Controller {
    async getDockers() {
        const { ctx } = this;
        const result = await ctx.service.docker.dockerService.getDockers();
        this.success(result);
    }

    async addDocker() {
        const { ctx } = this;
        const result = await ctx.service.docker.dockerService.addDocker();
        this.success(result);
    }

    async removeDocker() {
        const { ctx } = this;
        const paramRule = {
            id: { type: 'number', required: true }
        };
        this.validate(paramRule, ctx.request.body);
        const param = ctx.request.body;
        const result = await ctx.service.docker.dockerService.removeDocker(param);
        this.success(result);
    }
}

module.exports = DockerController;
