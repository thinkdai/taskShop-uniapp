// 获取配置路径
// const path = process.env.NODE_ENV !== 'production' ? '../../config/dev/index.js' : '../../config/prod/index.js';
// console.log(path)
// const conf = require(`${path}`);
const conf = require('../../config/dev/index.js');

console.log(conf)
const state = {
    platForm: conf.PLATFORM,
    host: conf.api.host,
    webviewHost: conf.webviewHost,
    apiSecretKey: conf.api.apiSecretKey
};
const mutations = {

};

const actions = {

};

export default {
    namespace: true,
    state,
    mutations,
    actions
};
