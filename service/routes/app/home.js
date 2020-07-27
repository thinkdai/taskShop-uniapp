var express = require('express');
var router = express.Router();
// sql
const { queryTask, taskDetail } = require('../../controller/app/home');
const { SuccessModel, ErrorModel } = require('../../model/resModel');

/**
 * 获取任务列表
 */
router.get('/task', (req, res) => {
    queryTask().then(data => {
		res.json(
			new SuccessModel(data)
		);
	}).catch(err => {
        res.json(
            new ErrorModel(err) 
        );
    });
});

/**
 * 获取任务详情
 */
router.get('/task-detail', (req, res) => {
    taskDetail(req.query.id).then(data => {
        res.json(
			new SuccessModel(data[0] || {})
		);
    }).catch(err => {
        res.json(
            new ErrorModel(err) 
        );
    });
});

module.exports = router;