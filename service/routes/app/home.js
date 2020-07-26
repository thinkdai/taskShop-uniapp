var express = require('express');
var router = express.Router();
// sql
const { queryTask } = require('../../controller/app/home');
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

module.exports = router;