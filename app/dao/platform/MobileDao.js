'use strict';

const Service = require('../../../custom_module/Basic/BasicQueryService');

class MobileDao extends Service {
    constructor(ctx) {
        super(ctx);
        this.table = 't_mobile';
        this.tableShortCut = 'm';
    }
}

module.exports = MobileDao;
