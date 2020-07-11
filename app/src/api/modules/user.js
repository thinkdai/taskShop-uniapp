import http from '@util/lib/http';

// 获取用户信息
const getUserInfo = () => http.get('user/info');
// 获取验证码
const getCode = (phone) => http.get('user/code', { phone });
// 绑定手机号
const bindPhone = ({phone, code, password}) => http.post('user/create', {phone, code, password});
// 登录
const login = ({ phone, password }) => http.post('user/login', { phone, password });

module.exports = {
    getUserInfo,
    getCode,
    bindPhone,
    login
};