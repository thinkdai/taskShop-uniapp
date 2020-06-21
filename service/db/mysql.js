const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db.js');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始链接
con.connect();

// 统一执行 sql 的函数
function exec(sql) {
	const promise = new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		});
	});
	return promise;
}

function execMany(sqlMany) {
	const promise = new Promise((resolve, reject) => {
		con.query(sqlMany, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			// 处理
			console.log(result[1]);
			const handlerRes = {
				list: result[0],
				total: result[1][0]['found_rows()']
			};
			resolve(handlerRes);
		});
	});
	return promise;
}

module.exports = {
	exec,
	execMany
};