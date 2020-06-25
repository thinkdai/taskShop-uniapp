const { exec, execMany } = require('../../db/mysql');
// sql
const { queryShop } = require('./shop');

//创建任务
const createTask = async (taskInfo) => {
    const { 
        orderType, limitDay, storeId, qq,
        days, paiNum, title, givePicUrl, paiPicUrl,
        paiLinkUrl, paiPrice, returnPrice, remark } = taskInfo;

	const shopRes = await queryShop({id: storeId, page: 1, pageSize: 100});
    const storeName = shopRes.list[0].shopName;
	const createTime = new Date().toLocaleString();
	const updateTime = createTime;

	const sql = `
					insert into task (orderType, limitDay, storeId, storeName, qq, days, givePicUrl, paiPicUrl, title, paiLinkUrl, paiNum, paiPrice, returnPrice, remark, updateTime, createTime)
				` 
				+
				`   
					values (${orderType}, ${limitDay}, ${storeId}, '${storeName}', '${qq}', ${days}, '${givePicUrl}', '${paiPicUrl}', '${title}', '${paiLinkUrl}', ${paiNum}, ${paiPrice}, ${returnPrice}, '${remark}', '${updateTime}', '${createTime}')
				`;
    
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
        orderType, limitDay, storeId, qq,
        days, paiNum, title, givePicUrl, paiPicUrl,
        paiLinkUrl, paiPrice, returnPrice, remark } = taskInfo;

	const shopRes = await queryShop(storeId);
	if (!shopRes.length) {
		throw new Error('商铺id错误');
	} else {
		const storeName = shopRes[0].shopName;
		const createTime = new Date().toLocaleString();
		const updateTime = createTime;

		const sql = `update task set 
						orderType = ${orderType},
						limitDay = ${limitDay},
						storeName = '${storeName}',
						qq = '${qq}',
						days = ${days},
						givePicUrl = '${givePicUrl}',
						paiPicUrl = '${paiPicUrl}',
						title = '${title}',
						paiLinkUrl = '${paiLinkUrl}',
						paiNum = ${paiNum},
						paiPrice = ${paiPrice},
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
const queryTask = ({ page, pageSize }) => {
	const sql = `select * from task limit ${((+page) - 1) * (+pageSize)}, ${+pageSize}`;
	// 执行两次
	const sqlRows = "select found_rows()";
	return execMany(`${sql}; ${sqlRows}`).then(rows => {
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