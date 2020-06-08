const { exec, escape } = require('../../db/mysql')

//登录
const login = (loginInfo) => {
    let { username, password } = loginInfo;
    const sql = "select username from `pc-user` where username = "+ `'${username}'` + " and password = " + `'${password}'`
    console.log(sql);
    return exec(sql).then(rows => {
        console.log(rows);
        return rows[0] || {}
    })
}

// 查询用户
const queryUser = () => {
    const sql = "select * from `pc-user`"
    return exec(sql).then(rows => {
        return rows || {};
    })
    .catch(res => {
        return res;
    })
}

//创建用户
const createUser = (userInfo) => {
    const { nickname, username, password } = userInfo;
    const createtime = new Date().toLocaleString();
    let updatetime = createtime;

    const sql = "insert into `pc-user` (nickname,username,`password`,status, createtime, updatetime)" +
                `values ('${nickname}', '${username}', '${password}', 0, '${createtime}', '${updatetime}')`

    return exec(sql).then(rows => { 
            return rows || {};
        })
        .catch(res => {
            console.log(res)
            return res;
        })
}

// 删除用户
const deleteUser = (userInfo) => {
    let { nickname, username } = userInfo;

    const sql = "DELETE FROM `pc-user` WHERE nickname = '${nickname}' and username = '${username}' and state = 0"

    return exec(sql).then(rows => { 
            return rows || {};
        })
        .catch(res => {
            console.log(res)
            return res;
        })
}

module.exports = {
    login,
    createUser,
    queryUser,
    deleteUser
}