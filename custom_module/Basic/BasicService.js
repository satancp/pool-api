const { Service } = require('egg');
const Exception = require('../Exception/Exception');

class BasicService extends Service {
    get(options) {
        return this.request('GET', options);
    }

    post(options) {
        return this.request('POST', options);
    }

    async request(method, options) {
        const { ctx } = this;
        let { url, params, headers, query, contentType } = options;
        let result;
        try {
            if (query) url += '?' + this._convertQuery(query);
            result = await ctx.curl(url, {
                method,
                data: params,
                dataType: 'json',
                contentType: contentType || 'json',
                headers
            });
        } catch (e) {
            ctx.app.logger.error('request service error:', e);
            throw new Exception(e);
        }
        if (result.status === 200) {
            return result.data;
        }
    }

    _convertQuery(q) {
        let final = '';
        const keys = Object.keys(q);
        keys.forEach(v => {
            final += '&' + v + '=' + q[v];
        });
        return final.substring(1);
    }
}

module.exports = BasicService;
