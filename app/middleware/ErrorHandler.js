const { generateFailure, checkRouter, sendMsg } = require('../../custom_module/Utils/Tools');

module.exports = () => {
    return async function handler(ctx, next) {
        /**
         * 判断404是因为egg框架本身对404的请求不会做弹出操作，所以会把正常流程全部走一遍，
         * 但是实际上404的请求没有必要执行后续操作，因此在这边做弹出操作
         */
        if (!checkRouter(ctx)) return;
        try {
            await next();
        } catch (e) {
            if (e.msg && e.msg === '参数校验不通过') {
                ctx.app.logger.error(e);
                ctx.body = generateFailure(e);
                return;
            }
            sendMsg(e, ctx);
            ctx.app.logger.error(e);
            ctx.body = generateFailure(e);
        }
    };
};
