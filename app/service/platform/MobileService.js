'use strict';

const Service = require('../../../custom_module/Basic/BasicService');
const axios = require('axios');
const moment = require('moment');
const Exception = require('../../../custom_module/Exception/Exception');
const {
    ACCOUNT_RETRIEVE_FAILED,
    ACCOUNT_NEED_TOPUP,
    MOBILES_EXCEED_LIMIT,
    WAIT_FOR_MESSAGE,
    GET_MESSAGE_FAILED
} = require('../../../custom_module/Exception/ExceptionCode');

class MobileService extends Service {
    async getAccountInfo() {
        const { app } = this;
        const url = `${app.config.services.mobileUrl}UserInterface.aspx?action=getaccountinfo&token=${app.config.mobile.token}&format=1`;
        try {
            const result = await axios({
                method: 'GET',
                url
            });
            const raw = result.data;
            if (typeof raw === 'number') {
                throw new Exception(ACCOUNT_RETRIEVE_FAILED);
            } else {
                const data = raw.split('|');
                return JSON.parse(data[1]);
            }
        } catch (e) {
            throw e;
        }
    }

    async getMobileReal(data) {
        const { app } = this;
        const url = `${app.config.services.mobileUrl}UserInterface.aspx?action=getmobile&token=${
            app.config.mobile.token
        }&format=1&itemid=${app.config.mobile.project[data.type]}&excludeno=165.147&timestamp=${moment().unix()}`;
        try {
            const result = await axios({
                method: 'GET',
                url
            });
            const raw = result.data;
            if (typeof raw === 'number') {
                throw new Exception(ACCOUNT_RETRIEVE_FAILED);
            } else {
                const data = raw.split('|');
                return JSON.parse(data[1]);
            }
        } catch (e) {
            throw e;
        }
    }

    async releaseMobile(data) {
        const { app } = this;
        const url = `${app.config.services.mobileUrl}action=release&token=${app.config.mobile.token}&itemid=${
            app.config.mobile.project[data.type]
        }&mobile=${data.mobile}`;
        try {
            const result = await axios({
                method: 'GET',
                url
            });
            const raw = result.data;
            if (typeof raw === 'number') {
                throw new Exception(ACCOUNT_RETRIEVE_FAILED);
            } else {
                return true;
            }
        } catch (e) {
            throw e;
        }
    }

    async getMessage(data) {
        const { app } = this;
        const url = `${app.config.services.mobileUrl}action=getsms&token=${app.config.mobile.token}&itemid=${
            app.config.mobile.project[data.type]
        }&mobile=${data.mobile}&timestamp=${moment().unix()}`;
        console.log(url);
        try {
            const result = await axios({
                method: 'GET',
                url
            });
            const raw = result.data;
            if (typeof raw === 'number') {
                if (raw === 3001) {
                    throw new Exception(WAIT_FOR_MESSAGE);
                } else {
                    throw new Exception(ACCOUNT_RETRIEVE_FAILED);
                }
            } else {
                const data = raw.split('|');
                console.log(data, raw);
                if (data[0] === 'success') {
                    return {
                        code: data[1].replace(/\D+/g, ''),
                        message: data[1]
                    };
                } else {
                    throw new Exception(GET_MESSAGE_FAILED);
                }
            }
        } catch (e) {
            throw e;
        }
    }

    async getCurrentUnreleasedMobileNumber() {
        const { ctx } = this;
        const result = await ctx.dao.platform.MobileDao.get({
            where: {
                is_released: 0
            }
        });
        return result.length;
    }

    async releaseMobileNumber(data) {
        const { ctx } = this;
        await ctx.dao.platform.MobileDao.update(
            {
                is_released: 1
            },
            {
                where: {
                    mobile: data.mobile
                }
            }
        );
        const result = await this.releaseMobile(data);
        return result;
    }

    async getMobile(data) {
        const { app, ctx } = this;
        const account = await this.getAccountInfo();
        if (account.Balance > 0) {
            const check = await this.getCurrentUnreleasedMobileNumber();
            if (check >= app.config.mobile.limit) {
                throw new Exception(MOBILES_EXCEED_LIMIT);
            } else {
                const result = await this.getMobileReal(data);
                await ctx.dao.platform.MobileDao.insert({
                    mobile: result
                });
                return {
                    mobile: result
                };
            }
        } else {
            throw new Exception(ACCOUNT_NEED_TOPUP);
        }
    }
}

module.exports = MobileService;
