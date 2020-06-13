// 登录部分
const shopList = () => $Http.get('shop/list', {});
// 删除用户
const deleteUserAPI = (params) => $Http.post(`user/delete`,params);
// 查询用户信息
const queryUserAPI = (params) => $Http.get(`user/list`, params);
//创建用户
const createUserAPI = (params) => $Http.post(`user/create`, params);

module.exports = {
    shopList
};