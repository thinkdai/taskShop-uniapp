const express = require('express');
const router = express.Router();
const request = require('request');
// 微信揭秘
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
// sql
const { login, createUser, queryUser, queryOpenIdUser, deleteUser } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../model/resModel');
// token操作
const token = require('../utils/token');

// 用户登录
router.post('/updateInfo', async function(req, res, next) {
    const { code: JSCODE, encryptedData , iv } = req.body;
    const secretId = '04d8b405a231b98377169894d85802d2';
    const APPID = 'wx2cc73b1092adab71';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secretId}&js_code=${JSCODE}&grant_type=authorization_code`

    // 直调微信的服务器
    request({
        url: url,//请求路径
        method: "get",//请求方式，默认为get
    }, async function(error, response, body) {
        // 非法code校验
        const { errmsg, session_key: sessionKey, openid } = JSON.parse(body);
        
        // 请求异常
        if (!sessionKey) {
            res.json(
                new ErrorModel(errmsg)
            );
        } else {
            // 请求成功
            const pc = new WXBizDataCrypt(APPID, sessionKey);
            console.log(pc, encryptedData , iv);
            const data = pc.decryptData(encryptedData , iv);
            console.log(data);
            // 操作数据库
            const sqlRes = await createUser(data);
            const { affectedRows } = sqlRes;
            if(affectedRows == 1) {
                res.json(
                    new SuccessModel("更新用户信息成功")
                )
            } else {
                res.json(
                new ErrorModel("更新用户信息失败")
                )
            }
        }
    }); 
});

// 用户列表
router.get('/list', async function(req, res, next) {
    const sqlRes = await queryUser();
    if(sqlRes) {
        res.json(
            new SuccessModel(sqlRes, "查询用户成功")
        )
    } else {
        res.json(
          new ErrorModel("新增用户失败")
        )
    }
});

// 用户信息
router.get('/info', async function(req, res, next) {
    const { code: JSCODE } = req.query;
    const secretId = '04d8b405a231b98377169894d85802d2';
    const APPID = 'wx2cc73b1092adab71';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secretId}&js_code=${JSCODE}&grant_type=authorization_code`

    // 直调微信的服务器
    request({
        url: url,//请求路径
        method: "get",//请求方式，默认为get
    }, async function(error, response, body) {
        // 非法code校验
        const { errmsg, session_key: sessionKey, openid } = JSON.parse(body);
        
        // 请求异常
        if (!sessionKey) {
            res.json(
                new ErrorModel(errmsg)
            );
        } else {
            // 请求成功
            // 利用openId查询数据库,看有没有用户,没有就返回空值
            const sqlRes = await queryOpenIdUser(openid);
            if (!sqlRes.length) {
                const data = { 
                    "openId": "",
                    "nickName": "",
                    "gender": 0,
                    "language": "zh_CN",
                    "city": "",
                    "province": "",
                    "country": "",
                    "avatarUrl": "",
                    "unionId": "",
                };
                res.json(
                    new SuccessModel(data, '用户未注册')
                );
            } else {
                //设置token
                token.setToken({...sqlRes[0], res});
                res.json(
                    new SuccessModel(sqlRes, '获取用户信息成功')
                );
            }   
        }
    }); 
});



module.exports = router;
