// 商铺列表
const shopList = () => $Http.get('shop/list', {});
// 创建任务
const createTask = (params) => $Http.post(`task/create`,params);
// 查询用户信息
const queryUserAPI = (params) => $Http.get(`user/list`, params);
//创建用户
const createUserAPI = (params) => $Http.post(`user/create`, params);

module.exports = {
    shopList,
    createTask
};