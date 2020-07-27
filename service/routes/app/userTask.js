var express = require('express');
var router = express.Router();
// sql
const { createDoedTask } = require('../../controller/app/userTask');
const { SuccessModel, ErrorModel } = require('../../model/resModel');
const until = require('../../utils/cookie');
const tokenUtil = require('../../utils/token');

/**
 * 用户做任务的操作
 */
router.post('/do', (req, res) => {
    // 拿取token 数据 按照自己传递方式写
    const cookie = req.headers['cookie'];
    const token = until.cookieToJson(cookie);
    // 检查token是否有效（过期和非法）
    const user = tokenUtil.checkToken(token);

    createDoedTask({
        user_id: user.id,
        task_id: req.body.task_id
    }).then(() => {
        res.json(
			new SuccessModel('用户领取任务成功')
		);
    }).catch(err => {
        res.json(
            new ErrorModel(err) 
        );
    });

});

module.exports = router;