import http from '@util/lib/http';

// 获取用户信息
const taskList = () => http.get('home/task');

module.exports = {
    taskList
};