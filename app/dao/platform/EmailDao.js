'use strict';

const Service = require('../../../custom_module/Basic/BasicQueryService');

class EmailDao extends Service {
    constructor(ctx) {
        super(ctx);
        this.table = 't_email';
        this.tableShortCut = 'e';
    }
}

module.exports = EmailDao;
