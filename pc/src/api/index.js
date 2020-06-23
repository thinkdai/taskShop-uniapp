// api集中
const api = {
    user: require('./module/login'),
    task: require('./module/task'),
    shop: require('./module/shop'),
    log: require('./module/log')
};

export default api;


