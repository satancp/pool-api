const moment = require('moment');

module.exports = () => {
    return async function handler(ctx, next) {
        if (!ctx.token) {
            const mailToken = await ctx.service.platform.emailService.getToken('mail');
            const memberToken = await ctx.service.platform.emailService.getToken('member');
            ctx.token = {
                mail: {
                    content: mailToken.access_token,
                    expire: moment().add(mailToken.expires_in, 'second')
                },
                member: {
                    content: memberToken.access_token,
                    expire: moment().add(memberToken.expires_in, 'second')
                }
            };
        } else {
            const current = ctx.token;
            const keys = Object.keys(current);
            for (let i = 0; i < keys.length; i++) {
                const single = ctx.token[keys[i]];
                if (moment().isSameOrAfter(single.expire)) {
                    const token = await ctx.service.platform.emailService.getToken(keys[i]);
                    ctx.token[keys[i]] = {
                        content: token.access_token,
                        expire: moment().add(token.expires_in, 'second')
                    };
                }
            }
        }
        await next();
    };
};
