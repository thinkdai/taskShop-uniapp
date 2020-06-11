const { exec } = require('../../db/mysql');
// sql
const { queryShop } = require('./shop');

//创建商铺
const createTask = async (taskInfo) => {
    const { 
        orderType, shopTimeFlag, selectShop, linkQQ,
        activeDay, giftNum, taskName, giftPhoto, taskPhoto,
        taskUrl, orderPrice, returnPrice, remark } = taskInfo;

    const shopRes = await queryShop(selectShop);
    const selectShopName = shopRes[0].shopName;
	const createTime = new Date().toLocaleString();
	const updateTime = createTime;

	const sql = "insert into `task` (orderType, shopTimeFlag, selectShop, selectShopName, linkQQ, activeDay, giftPhoto, taskPhoto, taskName, taskUrl, giftNum, orderPrice, returnPrice, remark, updateTime, createTime)" +
                `values (${orderType}, ${shopTimeFlag}, ${selectShop}, '${selectShopName}', '${linkQQ}', ${activeDay}, '${giftPhoto}', '${taskPhoto}', '${taskName}', '${taskUrl}', ${giftNum}, ${orderPrice}, ${returnPrice}, '${remark}', '${updateTime}', '${createTime}')`;
    
	return exec(sql).then(rows => { 
		return rows || {};
	}).catch(res => {
        console.log(res);
        return res;
    });
};

// 编辑商铺
const editTask = (shopInfo) => {
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
const queryTask = () => {
	const sql = "select * from `task`";
	return exec(sql).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
};  

// 删除商铺
const deleteTask = (id) => {

	const sql = "DELETE FROM `task` WHERE id = " + `${id}`;

	return exec(sql).then(rows => { 
		return rows || {};
	})
		.catch(res => {
			console.log(res);
			return res;
		});
};

module.exports = {
	createTask,
	queryTask,
	deleteTask,
	editTask
};