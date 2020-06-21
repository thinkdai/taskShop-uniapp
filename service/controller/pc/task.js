const { exec } = require('../../db/mysql');
// sql
const { queryShop } = require('./shop');

//创建任务
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
const editTask = async (taskInfo) => {
	const { 
		id,
        orderType, shopTimeFlag, selectShop, linkQQ,
        activeDay, giftNum, taskName, giftPhoto, taskPhoto,
        taskUrl, orderPrice, returnPrice, remark } = taskInfo;

	const shopRes = await queryShop(selectShop);
	if (!shopRes.length) {
		throw new Error('商铺id错误');
	} else {
		const selectShopName = shopRes[0].shopName;
		const createTime = new Date().toLocaleString();
		const updateTime = createTime;

		const sql = `update task set 
						orderType = ${orderType},
						shopTimeFlag = ${shopTimeFlag},
						selectShopName = '${selectShopName}',
						linkQQ = '${linkQQ}',
						activeDay = ${activeDay},
						giftPhoto = '${giftPhoto}',
						taskPhoto = '${taskPhoto}',
						taskName = '${taskName}',
						taskUrl = '${taskUrl}',
						giftNum = ${giftNum},
						orderPrice = ${orderPrice},
						returnPrice = ${returnPrice},
						remark = '${remark}',
						updateTime = '${updateTime}',
						createTime = '${createTime}'
						where id = ${id}
					`;

		return exec(sql).then(rows => { 
			return rows || {};
		}).catch(res => {
			console.log(res);
			return res;
		});
	}
};

// 查询任务
const queryTask = () => {
	const sql = "select * from `task`";
	return exec(sql).then(rows => {
		return rows || {};
	})
		.catch(res => {
			return res;
		});
};  

// 删除任务
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