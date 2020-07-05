import http from '@util/lib/http';

// 获取用户信息
const getUserInfo = (code) => http.get('user/info', {code});
// 获取验证码
const getCode = (phone) => http.get('user/code', { phone });
// 绑定手机号
const bindPhone = ({phone, code, password}) => http.post('user/create', {phone, code, password});

module.exports = {
    getUserInfo,
    getCode,
    bindPhone
};