// 登录部分
const loginAPI = (params) => $Http.post('user/login', params);
// 删除用户
const deleteUserAPI = (params) => $Http.post(`user/delete`,params);
// 查询用户信息
const queryUserAPI = (params) => $Http.get(`user/list`, params);
//创建用户
const createUserAPI = (params) => $Http.post(`user/create`, params);
// 获取当前登录的用户信息
const userInfoAPI = () => $Http.get(`user/userInfo`);

module.exports = {
    createUserAPI,
    queryUserAPI,
    deleteUserAPI,
    loginAPI,
    userInfoAPI
};