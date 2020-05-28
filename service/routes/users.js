const express = require('express');
const router = express.Router();
const request = require('request');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const { login, createUser, queryUser, deleteUser } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.get('/info', function(req, res, next) {
    const { code: JSCODE, encryptedData , iv } = req.query;
    const secretId = '04d8b405a231b98377169894d85802d2';
    const APPID = 'wx2cc73b1092adab71';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secretId}&js_code=${JSCODE}&grant_type=authorization_code`
    // 直调微信的服务器
    request({
        url: url,//请求路径
        method: "get",//请求方式，默认为get
    }, async function(error, response, body) {
        // 非法code校验
        const { errcode, errmsg, session_key: sessionKey, openid } = JSON.parse(body);
        console.log(errcode, errmsg, sessionKey, openid);
        // 请求异常
        if (!sessionKey) {
            res.json(
                new ErrorModel(errmsg)
            );
        } else {
            // 请求成功
            console.log(APPID, sessionKey);
            const pc = new WXBizDataCrypt(APPID + '', sessionKey + '');
            const data = pc.decryptData(encryptedData , iv);
            
            res.json(
                new SuccessModel(data, '登录成功')
            );
        }
    }); 
});

module.exports = router;
