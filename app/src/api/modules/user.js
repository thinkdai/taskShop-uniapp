import http from '@util/lib/http';

// 获取用户信息
const getUserInfo = ({code, encryptData, iv}) => http.post('user/info', {code, encryptData, iv});
// 收藏
const getCollectlist = (uid) => http.get('user/attention/list', { uid });
// 获取验证码
const getCode = (phone) => http.get('auth/code/send', { phone });
// update
const updateWxInfo = ({code, encryptData, iv, token}) => http.post('auth/wxInfo/update', {code, encryptData, iv}, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'http-jwt': token
});
// 绑定手机号
const bindPhone = ({phone, code, token}) => http.post('auth/phone/register', {phone, code}, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'http-jwt': token
});
// 微信授权电话
const wxBindPhone = ({code, encryptData, iv, token}) => http.post('auth/wxPhone/register', {code, encryptData, iv}, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'http-jwt': token
});
// 收藏
const attention = (param,token) => http.post('user/attention', param, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'http-jwt': token
});
// 我的订阅
const subscheduleList = (params) => http.get('scheduleUser/list', params);

module.exports = {
    getUserInfo,
    getCollectlist,
    getCode,
    bindPhone,
    wxBindPhone,
    updateWxInfo,
    attention,
    subscheduleList
};