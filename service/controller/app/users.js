const { exec } = require('../../db/mysql');

//登录
const login = (loginInfo) => {
	let { phone, password } = loginInfo;
	const sql = "select * from `app-user` where phone = "+ `'${phone}'` + " and password = " + `'${password}'`;

	return exec(sql).then(rows => {
		console.log(rows);
		return rows[0] || {};
	});
};

// 查询用户
const queryPhoneUser = (phone) => {
	const sql = "select * from `app-user` where phone =" +  `${phone}`;
	return exec(sql).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
};

//创建用户
const createUser = (userInfo) => {
	const { nickname, phone, password } = userInfo;
	const createtime = new Date().toLocaleString();
	let updatetime = createtime;

	const sql = "insert into `app-user` (nickname, phone,`password`,status, createtime, updatetime)" +
                `values ('${nickname}', '${phone}', '${password}', 0, '${createtime}', '${updatetime}')`;

	return exec(sql).then(rows => { 
		return rows || {};
	})
		.catch(res => {
			console.log(res);
			return res;
		});
};

// 删除用户
const deleteUser = (userInfo) => {
	const { nickname, username } = userInfo;

	const sql = "DELETE FROM `pc-user` WHERE nickname = "+ `'${nickname}'` + " and username = " + `'${username}'` + "and state = 0";

	return exec(sql).then(rows => { 
		return rows || {};
	})
		.catch(res => {
			console.log(res);
			return res;
		});
};

module.exports = {
	login,
	createUser,
	queryPhoneUser,
	deleteUser
};