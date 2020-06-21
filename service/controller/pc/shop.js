const { exec, execMany } = require('../../db/mysql');

//创建商铺
const createShop = (shopInfo) => {
	const { shopUrl, shopName, shopOwner } = shopInfo;
	const createtime = new Date().toLocaleString();
	let updatetime = createtime;

	const sql = "insert into `shop` (shopUrl,shopName,shopOwner,createtime, updatetime)" +
                `values ('${shopUrl}', '${shopName}', '${shopOwner}', '${createtime}', '${updatetime}')`;

	return exec(sql).then(rows => { 
		return rows || {};
	})
		.catch(res => {
			console.log(res);
			return res;
		});
};

// 编辑商铺
const editShop = (shopInfo) => {
	const { id, shopUrl, shopName, shopOwner } = shopInfo;
	let updatetime = new Date().toLocaleString();

	const sql = "update `shop` set shopUrl = " + `'${shopUrl}',` +
                "shopName = " + `'${shopName}',` +
                "shopOwner = " + `'${shopOwner}',` +
                "updatetime = " + `'${updatetime}'` +
                `where id = ${id}`;

	return exec(sql).then(rows => { 
		return rows || {};
	})
		.catch(res => {
			console.log(res);
			return res;
		});
};

// 查询店铺
const queryShop = ({ id, page, pageSize }) => {
	const sql = id ?
			`select * from shop limit ${((+page) - 1) * (+pageSize)}, ${+pageSize} where id = ${id}` 
			: `select * from shop limit ${((+page) - 1) * (+pageSize)}, ${+pageSize}` ;
	// 执行两次
	const sqlRows = "select found_rows()";
	return execMany(`${sql}; ${sqlRows}`).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
};  

// 删除商铺
const deleteShop = (id) => {

	const sql = "DELETE FROM `shop` WHERE id = " + `${id}`;

	return exec(sql).then(rows => { 
		return rows || {};
	})
		.catch(res => {
			console.log(res);
			return res;
		});
};

module.exports = {
	createShop,
	queryShop,
	deleteShop,
	editShop
};