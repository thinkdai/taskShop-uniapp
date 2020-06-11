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
});

/* 查询商铺 */
router.get('/list', function(req, res) {
	queryTask().then(data => {
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
