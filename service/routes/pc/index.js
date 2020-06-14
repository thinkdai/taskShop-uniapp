var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var shopRouter = require('./shop');
var taskRouter = require('./task');
var uploadRouter = require('./upload');
var staticRouter = require('./static');
var logRouter = require('./log');

// 用户路由
router.use('/user', userRouter);
// 商铺路由
router.use('/shop', shopRouter);
// 任务路由
router.use('/task', taskRouter);
// 上传路由
router.use('/upload', uploadRouter);
// 静态文件路由
router.use('/static', staticRouter);
// 日志路由
router.use('/log', logRouter);

module.exports = router;
