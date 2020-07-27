var express = require('express');
var router = express.Router();
var userRouter = require('./user');
var homeRouter = require('./home');
var userTaskRouter = require('./userTask');

// 用户路由
router.use('/user', userRouter);
// 首页路由
router.use('/home', homeRouter);
// 用户-任务路由
router.use('/user-task', userTaskRouter);

module.exports = router;
