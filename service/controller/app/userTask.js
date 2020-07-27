const { exec } = require('../../db/mysql');

// 用户做任务
const createDoedTask = ({ user_id, task_id }) => {
    const createTime = new Date().toLocaleString();
    const sql = `insert into user_task (user_id, task_id, create_time, status)`
                + 
                ` values (${ user_id }, ${ task_id }, '${ createTime }', 1)`;
    console.log(sql);
	return exec(sql).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
};

module.exports = {
	createDoedTask
};