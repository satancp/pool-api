'use strict';

const { Controller } = require('egg');
const Exception = require('../Exception/Exception');
const { PARAMETER_ERROR } = require('../Exception/ExceptionCode');

class BasicController extends Controller {
    success(data) {
        const res = {
            code: 0,
            msg: 'OK',
            data
        };
        this.ctx.body = res;
    }

    failure(error) {
        const res = {
            code: error.code,
            msg: error.msg,
            data: error.data
        };
        this.ctx.body = res;
    }

    validate(rule, param) {
        const { ctx, app } = this;
        app.validator.addRule('string', (rule, value) => {
            if (value === null) return;
            if (typeof value !== 'string') {
                return app.validator.t('should be a string');
            }
            if (rule.hasOwnProperty('max') && value.length > rule.max) {
                return app.validator.t('length should smaller than %s', rule.max);
            }
            if (rule.hasOwnProperty('min') && value.length < rule.min) {
                return app.validator.t('length should bigger than %s', rule.min);
            }
            if (rule.format && !rule.format.test(value)) {
                return rule.message || app.validator.t('should match %s', rule.format);
            }
        });
        app.validator.addRule('int', (rule, value) => {
            if (value === null) return;
            if (typeof value !== 'number' || value % 1 !== 0) {
                return app.validator.t('should be an integer');
            }

            if (rule.hasOwnProperty('max') && value > rule.max) {
                return app.validator.t('should smaller than %s', rule.max);
            }

            if (rule.hasOwnProperty('min') && value < rule.min) {
                return app.validator.t('should bigger than %s', rule.min);
            }
        });
        app.validator.addRule('integer', (rule, value) => {
            if (value === null) return;
            if (typeof value !== 'number' || value % 1 !== 0) {
                return app.validator.t('should be an integer');
            }

            if (rule.hasOwnProperty('max') && value > rule.max) {
                return app.validator.t('should smaller than %s', rule.max);
            }

            if (rule.hasOwnProperty('min') && value < rule.min) {
                return app.validator.t('should bigger than %s', rule.min);
            }
        });
        app.validator.addRule('number', (rule, value) => {
            if (value === null) return;
            if (typeof value !== 'number' || Number.isNaN(value)) {
                return app.validator.t('should be a number');
            }
            if (rule.hasOwnProperty('max') && value > rule.max) {
                return app.validator.t('should smaller than %s', rule.max);
            }
            if (rule.hasOwnProperty('min') && value < rule.min) {
                return app.validator.t('should bigger than %s', rule.min);
            }
        });
        app.validator.addRule('enum', (rule, value) => {
            if (value === null) return;
            if (!Array.isArray(rule.values)) {
                throw new TypeError('check enum need array type values');
            }
            if (rule.values.indexOf(value) === -1) {
                return app.validator.t('should be one of %s', rule.values.join(', '));
            }
        });
        ctx.validParams = rule;
        try {
            ctx.validate(rule, param);
        } catch (e) {
            app.logger.error(e);
            throw new Exception(PARAMETER_ERROR);
        }
    }
}

module.exports = BasicController;
