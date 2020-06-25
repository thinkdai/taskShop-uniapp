// 商铺列表
const shopList = () => $Http.get('shop/list', {});
// 创建任务
const createTask = (params) => $Http.post(`task/create`,params);
// 查询用户信息
const taskList = (params) => $Http.get(`task/list`, params);
// 删除任务
const deleteTask = id => $Http.get(`task/delete`, { id });
// 更新任务
const updateTask = params => $Http.post(`task/update`, params);

module.exports = {
    shopList,
    createTask,
    taskList,
    deleteTask,
    updateTask
};