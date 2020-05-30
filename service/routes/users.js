const express = require('express');
const router = express.Router();
const request = require('request');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
const { login, createUser, queryUser, deleteUser } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/info', async function(req, res, next) {
    // const { code: JSCODE, encryptedData , iv } = req.body;
    // const secretId = '04d8b405a231b98377169894d85802d2';
    // const APPID = 'wx2cc73b1092adab71';
    // const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secretId}&js_code=${JSCODE}&grant_type=authorization_code`
    var appId = 'wx4f4bc4dec97d474b'
    var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    var encryptedData = 
        'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
        'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
        '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
        '3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
        'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
        'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
        '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
        'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
        '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
        '8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
        'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
        '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
        '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
        'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
        'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
        '20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
        'Db/XcxxmK01EpqOyuxINew=='
    var iv = 'r7BXXKkLb8qrSNn05n0qiA=='
    var pc = new WXBizDataCrypt(appId, sessionKey)

    var data = pc.decryptData(encryptedData , iv)

    // 操作数据库
    const sqlRes = await createUser(data);
    const { affectedRows } = sqlRes;
    if(affectedRows == 1) {
        res.json(
            new SuccessModel("新增用户成功")
        )
    } else {
        res.json(
          new ErrorModel("新增用户失败")
        )
    }
    // 直调微信的服务器
    // request({
    //     url: url,//请求路径
    //     method: "get",//请求方式，默认为get
    // }, async function(error, response, body) {
    //     // 非法code校验
    //     const { errmsg, session_key: sessionKey, openid } = JSON.parse(body);
        
    //     // 请求异常
    //     if (!sessionKey) {
    //         res.json(
    //             new ErrorModel(errmsg)
    //         );
    //     } else {
    //         // 请求成功
    //         const pc = new WXBizDataCrypt(appId, sessionKey);
    //         const data = pc.decryptData(encryptedData , iv);
    //         console.log(data);
    //         res.json(
    //             new SuccessModel(data, '登录成功')
    //         );
    //     }
    // }); 
});

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


module.exports = router;
