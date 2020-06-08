var express = require('express');
var router = express.Router();
var userRouter = require('./users');

router.use('/user', userRouter);

module.exports = router;
