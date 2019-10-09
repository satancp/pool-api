'use strict';

const Service = require('../../../custom_module/Basic/BasicService');
const axios = require('axios');
const moment = require('moment');
const Exception = require('../../../custom_module/Exception/Exception');
const { EMAIL_EXIST } = require('../../../custom_module/Exception/ExceptionCode');

class EmailService extends Service {
    async getAccessToken(secret) {
        const { app } = this;
        const url = `${app.config.services.wechatCorpUrl}cgi-bin/gettoken?corpid=${app.config.wechat.corpid}&corpsecret=${secret}`;
        try {
            const result = await axios({
                method: 'GET',
                url,
            });
            return result.data;
        } catch (e) {
            throw e;
        }
    }

    async getToken(type) {
        const { app } = this;
        let result;
        switch (type) {
            case 'mail':
                result = await this.getAccessToken(app.config.wechat.secret.mail);
                break;
            case 'member':
                result = await this.getAccessToken(app.config.wechat.secret.member);
                break;
        }
        return result;
    }

    async getEmails() {
        const { app, ctx } = this;
        const url = `${app.config.services.wechatCorpUrl}cgi-bin/user/simplelist?access_token=${ctx.token.member.content}&department_id=${app.config.wechat.departmentid}`;
        try {
            const result = await axios({
                method: 'GET',
                url,
            });
            const emails = result.data.userlist.map(v => {
                return {
                    email: v.userid,
                    password: app.config.wechat.password,
                    domain: app.config.wechat.domain,
                };
            });
            return emails;
        } catch (e) {
            throw e;
        }
    }

    async solidifyEmail(params) {
        const { ctx } = this;
        const insert = {
            email: params.email,
            password: params.email,
        };
        const check = await ctx.dao.platform.EmailDao.get({
            where: insert,
        });
        if (check.length > 0) throw new Exception(EMAIL_EXIST);
        const result = await ctx.dao.platform.EmailDao.insert(insert);
        return result.affectedRows > 0;
    }

    async removeSolidifyEmail(params) {
        const { ctx } = this;
        const insert = {
            email: params.email,
            password: params.email,
        };
        const check = await ctx.dao.platform.EmailDao.get({
            where: insert,
        });
        if (check.length > 0) {
            const result = await ctx.dao.platform.EmailDao.delete(insert);
            return result.affectedRows > 0;
        } else {
            return false;
        }
    }

    async getSolidifyEmails() {
        const { ctx } = this;
        const result = await ctx.dao.platform.EmailDao.get();
        return result;
    }

    async getEmailList(params) {
        const { app, ctx } = this;
        const url = `${app.config.services.wechatCorpUrl}cgi-bin/log/mail?access_token=${ctx.token.mail.content}`;
        try {
            const result = await axios({
                method: 'POST',
                url,
                data: params,
            });
            const list = result.data.list.map(v => {
                return {
                    sender: v.sender,
                    subject: v.subject,
                    time: moment(v.time * 1000).format('YYYY-MM-DD HH:mm:ss'),
                };
            });
            return list;
        } catch (e) {
            throw e;
        }
    }

    async createEmail(params) {
        const { app, ctx } = this;
        const url = `${app.config.services.wechatCorpUrl}cgi-bin/user/create?access_token=${ctx.token.member.content}`;
        try {
            const result = await axios({
                method: 'POST',
                url,
                data: params,
            });
            if (result.data.errmsg === 'ok') return true;
            else return false;
        } catch (e) {
            throw e;
        }
    }

    async deleteEmail(params) {
        const { app, ctx } = this;
        const url = `${app.config.services.wechatCorpUrl}cgi-bin/user/delete?access_token=${ctx.token.member.content}&userid=${params.userid}`;
        try {
            const result = await axios({
                method: 'GET',
                url,
            });
            if (result.data.errmsg === 'ok') return true;
            else return false;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = EmailService;
