var express = require('express');
var router = express.Router();
// sql
const { 
	createShop,
	queryShop,
	deleteShop,
	editShop } = require('../../controller/pc/shop');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

/* 创建商铺 */
router.post('/create', async function(req, res) {
	const sqlRes = await createShop(req.body);
	if (sqlRes.affectedRows == 1) {
		// 插入成功
		res.json(
			new SuccessModel("新增商铺信息成功")
		); 
	} else {
		res.json(
			new ErrorModel("新增商铺信息失败")
		);
	}
});

/* 编辑商铺 */
router.post('/update', async function(req, res) {
	const sqlRes = await editShop(req.body);
	if (sqlRes.affectedRows == 1) {
		// 编辑成功
		res.json(
			new SuccessModel("编辑商铺信息成功")
		); 
	} else {
		res.json(
			new ErrorModel("编辑商铺信息失败")
		);
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
	queryShop(params).then(data => {
		data.page = params.page;
		data.pageSize = params.pageSize;
		res.json(
			new SuccessModel(data)
		);
	});
});

/* 删除商铺 */
router.get('/delete', function(req, res) {
	deleteShop(req.query.id).then(sqlRes => {
		if (sqlRes.affectedRows == 1) {
			// 编辑成功
			res.json(
				new SuccessModel("删除商铺信息成功")
			); 
		} else {
			res.json(
				new ErrorModel("删除商铺信息失败")
			);
		}
	});
});

module.exports = router;
