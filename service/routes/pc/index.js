var express = require('express');
var router = express.Router();
var userRouter = require('./users');

// 用户路由
router.use('/user', userRouter);

module.exports = router;
