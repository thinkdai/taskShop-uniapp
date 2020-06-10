var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var shopRouter = require('./shop');

// 用户路由
router.use('/user', userRouter);
// 商铺路由
router.use('/shop', shopRouter);

module.exports = router;
