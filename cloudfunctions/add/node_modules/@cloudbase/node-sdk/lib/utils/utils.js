"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudbase_1 = require("../cloudbase");
class TcbError extends Error {
    constructor(error) {
        super(error.message);
        this.code = error.code;
        this.message = error.message;
        this.requestId = error.requestId;
    }
}
exports.TcbError = TcbError;
exports.filterValue = function filterValue(o, value) {
    for (let key in o) {
        if (o[key] === value) {
            delete o[key];
        }
    }
};
exports.filterUndefined = function (o) {
    return exports.filterValue(o, undefined);
};
exports.E = (errObj) => {
    return new TcbError(errObj);
};
exports.checkIsInScf = () => {
    const { TENCENTCLOUD_RUNENV } = cloudbase_1.CloudBase.getCloudbaseContext();
    return TENCENTCLOUD_RUNENV === 'SCF';
};
exports.checkIsInContainer = () => {
    return !!process.env.KUBERNETES_SERVICE_HOST;
};
function second() {
    // istanbul ignore next
    return Math.floor(new Date().getTime() / 1000);
}
exports.second = second;
function processReturn(throwOnCode, res) {
    if (throwOnCode === false) {
        // 不抛报错，正常return，兼容旧逻辑
        return res;
    }
    throw exports.E(Object.assign({}, res));
}
exports.processReturn = processReturn;
function getServerInjectUrl() {
    const tcbContextConfig = getTcbContextConfig();
    return tcbContextConfig['URL'] || '';
}
exports.getServerInjectUrl = getServerInjectUrl;
function getTcbContextConfig() {
    try {
        const { TCB_CONTEXT_CNFG } = cloudbase_1.CloudBase.getCloudbaseContext();
        if (TCB_CONTEXT_CNFG) {
            // 检查约定环境变量字段是否存在
            return JSON.parse(TCB_CONTEXT_CNFG);
        }
        return {};
    }
    catch (e) {
        /* istanbul ignore next */
        console.log('parse context error...');
        /* istanbul ignore next */
        return {};
    }
}
exports.getTcbContextConfig = getTcbContextConfig;
/* istanbul ignore next */
function getWxUrl(config) {
    const protocal = config.isHttp === true ? 'http' : 'https';
    let wxUrl = protocal + '://tcb-open.tencentcloudapi.com/admin';
    if (exports.checkIsInScf()) {
        wxUrl = 'http://tcb-open.tencentyun.com/admin';
    }
    return wxUrl;
}
exports.getWxUrl = getWxUrl;
