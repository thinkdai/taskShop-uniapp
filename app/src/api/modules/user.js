import http from '@util/lib/http';

// 获取用户信息
const getUserInfo = (code) => http.get('user/info', {code});
// 获取验证码
const getCode = (phone) => http.get('auth/code/send', { phone });
// update
const updateWxInfo = ({code, encryptedData, iv, token}) => http.post('user/updateInfo', {code, encryptedData, iv}, {
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

module.exports = {
    getUserInfo,
    getCode,
    bindPhone,
    wxBindPhone,
    updateWxInfo,
    attention
};