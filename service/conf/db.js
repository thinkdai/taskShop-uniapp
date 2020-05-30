const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF

if (env === 'development') {
    // mysql
    MYSQL_CONF = {
        host     : 'localhost',
        user     : 'root',
        port     : '3306',
        password : 'lyp5520830',
        database : 'task-shop-mysql'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host     : '39.100.251.213',
        user     : 'root',
        port     : '3306',
        password : 'liyapeng',
        database : 'km-education-table'
    }
}

module.exports = {
    MYSQL_CONF
}