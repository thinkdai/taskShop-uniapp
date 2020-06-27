// 任务相关路由
var express = require('express');
var router = express.Router();
// sql
const { 
	createTask,
	queryTask,
	deleteTask,
	editTask } = require('../../controller/pc/task');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

/* 创建商铺 */
router.post('/create', async function(req, res) {

	const sqlRes = await createTask(req.body);
	if (sqlRes.affectedRows == 1) {
		// 插入成功
		res.json(
			new SuccessModel("发布任务成功")
		); 
	} else {
		res.json(
			new ErrorModel("发布任务失败")
		);
	}
});

/* 编辑商铺 */
router.post('/update', async function(req, res) {
	try {
		const sqlRes = await editTask(req.body);
		if (sqlRes.affectedRows == 1) {
			// 编辑成功
			res.json(
				new SuccessModel("编辑任务成功")
			); 
		} else {
			res.json(
				new ErrorModel("编辑任务失败")
			);
		}
	} catch(e) {
		// 错误的处理
		res.json(new ErrorModel(e || '参数错误'));
	}
});

/* 查询商铺 */
router.get('/list', function(req, res) {
	// 校验参数
	const { page, pageSize } = req.query;
	const params = {
		page: page || 1,
		pageSize: pageSize || 10
	};

	queryTask(params).then(data => {
		data.page = params.page;
		data.pageSize = params.pageSize;
		res.json(
			new SuccessModel(data)
		);
	});
});

/* 查询上下线的任务 */
router.get('/onlineList', function(req, res) {
	queryTask().then(data => {
		// 处理更新时间

		res.json(
			new SuccessModel(data)
		);
	});
});

/* 删除商铺 */
router.get('/delete', function(req, res) {
	deleteTask(req.query.id).then(sqlRes => {
		if (sqlRes.affectedRows == 1) {
			// 编辑成功
			res.json(
				new SuccessModel("删除任务成功")
			); 
		} else {
			res.json(
				new ErrorModel("删除任务失败")
			);
		}
	});
});

module.exports = router;
