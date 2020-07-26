var express = require('express');
var router = express.Router();
var userRouter = require('./user');
var homeRouter = require('./home');

// 用户路由
router.use('/user', userRouter);
// 首页路由
router.use('/home', homeRouter);

module.exports = router;
