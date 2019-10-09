'use strict';

const Service = require('../../../custom_module/Basic/BasicService');
const axios = require('axios');
const moment = require('moment');

class IpService extends Service {
    async getIps() {
        const { app } = this;
        const url = `${app.config.services.ipUrl}?api=${app.config.ip.api}&akey=${app.config.ip.akey}&order=1&type=3`;
        try {
            const result = await axios({
                method: 'GET',
                url
            });
            const list = result.data.data.proxy_list.map(v => {
                return {
                    ip: v.ip,
                    port: v.port,
                    location: v.adr,
                    expire: moment()
                        .subtract(v.cometime, 'second')
                        .add(v.timeout, 'second')
                        .format('YYYY-MM-DD HH:mm:ss'),
                    username: app.config.ip.username,
                    password: app.config.ip.password
                };
            });
            return list;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = IpService;
