var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var shopRouter = require('./shop');
var taskRouter = require('./task');

// 用户路由
router.use('/user', userRouter);
// 商铺路由
router.use('/shop', shopRouter);
// 任务路由
router.use('/task', taskRouter);

module.exports = router;
