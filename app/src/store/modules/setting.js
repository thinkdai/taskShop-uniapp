// 获取配置路径
let conf;
if (process.env.NODE_ENV !== 'production') {
    conf = require('../../config/dev/index.js');
} else {
    conf = require('../../config/prod/index.js');
}

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
