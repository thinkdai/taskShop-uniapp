const { execMany, exec } = require('../../db/mysql');

// 查询任务
const queryTask = () => {
	const sql = `select * from task`;
	// 执行两次
	const sqlRows = "select found_rows()";
	return execMany(`${sql}; ${sqlRows}`).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
}; 

// 任务详情
const taskDetail = (id) => {
	const sql = `select * from task where id = ${id}`;

	return exec(sql).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
};

module.exports = {
	queryTask,
	taskDetail
};