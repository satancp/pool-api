'use strict';

const Service = require('../../../custom_module/Basic/BasicQueryService');

class IpDao extends Service {
    constructor(ctx) {
        super(ctx);
        this.table = 't_ip';
        this.tableShortCut = 'i';
    }
}

module.exports = IpDao;
