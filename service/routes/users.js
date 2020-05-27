const express = require('express');
const router = express.Router();
const request = require('request');

/* GET users listing. */
router.get('/info', function(req, res, next) {
    const secretId = '04d8b405a231b98377169894d85802d2';
    const APPID = 'wx2cc73b1092adab71';
    const JSCODE = '023v1e0I0G4Rjc2ic72I0o4a0I0v1e05';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secretId}&js_code=${JSCODE}&grant_type=authorization_code`
    request({
        url: url,//请求路径
        method: "get",//请求方式，默认为get
    }, function(error, response, body) {
        console.log(response)
    }); 
    res.send('respond with a resource');
});

module.exports = router;
