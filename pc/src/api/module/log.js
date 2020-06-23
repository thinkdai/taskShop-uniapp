// 日志记录
const logAPI = (params) => $Http.get('log/access', params);
// 删除用户
const errorLogAPI = (params) => $Http.get(`log/error`,params);

module.exports = {
    logAPI,
    errorLogAPI
};