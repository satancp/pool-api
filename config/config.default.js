'use strict';
const fs = require('fs');
const path = require('path');

module.exports = appInfo => {
    const config = {
        keys: appInfo.name + '_1553524590577_8334',
        middleware: ['errorHandler', 'setToken'],
        security: {
            csrf: false
        },
        services: {
            wechatCorpUrl: 'https://api.exmail.qq.com/',
            ipUrl: 'http://www.zdopen.com/ShortProxy/GetIP/',
            mobileUrl: 'http://i.fxhyd.cn:8080/'
        },
        wechat: {
            corpid: 'wwc6e6d54ef8f051a9',
            secret: {
                mail: '1Zw8N_f3Z-Uq-RDAnsrVVpYNPBIo3HEplnjYpYO8UEs',
                member: 'uQ0NjV1s8MijeFb3UFXXqamXMJj48RjBbio20tsFv_TELRl8MrWL7aTlQYL4zGEp'
            },
            departmentid: 5680419831811,
            password: 'FXXqamXMJj48RjBb',
            email_sufix: '@little-box.com.cn',
            domain: 'https://exmail.qq.com/'
        },
        ip: {
            api: '201908261927018578',
            akey: '20b6067410c6b850',
            password: '77579323',
            username: '201908261927018578'
        },
        mobile: {
            token: '00345113b895127d3c0d54e691fd5c0e9556f4ef4601',
            project: {
                nike: 723
            },
            limit: 20
        },
        siteFile: {
            '/favicon.ico': fs.readFileSync(path.join(__dirname, '../app/public/favicon.ico'))
        },
        mysql: {
            clients: {
                db_write: {
                    host: '127.0.0.1',
                    port: '3306',
                    user: 'root',
                    password: 'wsxjw113',
                    database: 'qiangxie'
                },
                db_read: {
                    host: '127.0.0.1',
                    port: '3306',
                    user: 'root',
                    password: 'wsxjw113',
                    database: 'qiangxie'
                }
            }
        }
        // mysql: {
        //     clients: {
        //         db_write: {
        //             host: '172.17.32.3',
        //             port: '3306',
        //             user: 'server_manage',
        //             password: '4%$!FnKg5FeU',
        //             database: 'qiangxie',
        //         },
        //         db_read: {
        //             host: '172.17.32.3',
        //             port: '3306',
        //             user: 'server_manage',
        //             password: '4%$!FnKg5FeU',
        //             database: 'qiangxie',
        //         },
        //     },
        // },
    };
    return {
        ...config
    };
};
