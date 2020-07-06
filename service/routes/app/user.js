var express = require('express');
var router = express.Router();
// sql
const { login, createUser, queryPhoneUser } = require('../../controller/app/users');
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// token操作
const token = require('../../utils/token');
const until = require('../../utils/cookie');
const message = require('../../utils/message');
// 频率限制
const rateLimit = require('express-rate-limit');

/* 创建用户 */
router.post('/create', async function(req, res) {
	const { password, phone, code } = req.body;
	const errorObj = {
		code: 1,
		msg: ''
	};
	// 校验验证码正确性
	message.checkCode({ phoneNumber : phone, code: code }, async function() {
		try {
			const sqlRes = await createUser({
				password,
				phone,
				nickname: '已重置'
			});

			if (sqlRes.affectedRows == 1) {
				try {
					// 查询用户信息
					const userRes = await queryPhoneUser(phone);
					// 设置token
					const { id, phone: phoneTmp, nickname: name, status  } = userRes[0];
					token.setToken({ id, phone: phoneTmp, nickName: name, status }, res);
					// 插入成功
					res.json(
						new SuccessModel(userRes[0],"新增用户信息成功")
					); 
				} catch(e) {
					res.json(
						new ErrorModel({ code: 1, msg: '获取用户信息失败' },"新增用户信息失败")
					);
				}
			} else {
				if (sqlRes.sqlMessage.includes('Duplicate entry')) {
					res.json(
						new ErrorModel({
							code: 1,
							msg: '手机号码重复!'
						},"新增用户信息失败")
					);
				} else {
					res.json(
						new ErrorModel(errorObj,"新增用户信息失败")
					);
				}
			}
		} catch(e) {
			console.log(e);
			res.json(
				new ErrorModel(errorObj,"新增用户信息失败")
			);
		}
	}, function (e) {
		res.json(
			new ErrorModel(e, '新增用户信息失败')
		);
	});
});

/*
* 验证码请求限制调用频率同一个ip 1分钟调用最多1次
*/

var phonecodeLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 分钟调用1次
	max: 1, // 1分钟调用1次
	handler:function(req, res) {
		res.json(new ErrorModel('请求繁忙,请稍后再试'));
	}
});

router.get('/code', phonecodeLimiter, async function(req, res) {
	// 发送短信
	message.sendSms({phoneNumber: req.query.phone}, function(e) {
		if (e.Message == 'OK') {
			res.json(
				new SuccessModel('验证码获取成功')
			);
		} else {
			res.json(
				new ErrorModel(e, '验证码获取错误')
			);
		}
	}, function(e) {
		res.json(
			new ErrorModel(e, '验证码获取错误')
		);
	});
});

/**
 * 获取当前用户信息
 * */ 
router.get('/info', async function (req, res) {
	try {
		// 拿取token 数据 按照自己传递方式写
		const cookie = req.headers['cookie'];
		const tokenStr = until.cookieToJson(cookie);
		// 检查token是否有效（过期和非法）
		const user = token.checkToken(tokenStr);

		res.json(
			new SuccessModel(user, '获取用户信息成功')
		);
	} catch(e) {
		res.json(
			new ErrorModel(e, '获取用户信息失败')
		);
	}
});


/* 登录 */
router.post('/login', function(req, res) {
	let { phone, password } = req.body;
	let flag = false;
	// 参数校验
	const mapRules = new Map([
		[phone, { vaild: '电话号码不能为空' }],
		[password, { vaild: '密码不能为空' }]
	]);
	for (let [key, value] of mapRules.entries()) {
		if(!key) {
			let { vaild } = value;
			flag = true;
			res.json(
				new ErrorModel(vaild)
			);
			break;
		}
	}

	if(flag) return;

	login(req.body).then(data => {
		// username查询到的用户名
		const { id, phone, nickname: name, status  } = data;

		if(phone) {
			//设置token
			token.setToken({ id, phone, nickName: name, status }, res);
			res.json(
				new SuccessModel(data)
			);
		} else {
			res.json(
				new ErrorModel("登陆失败")
			);
		}
	});
});

// /* 查询用户 */
// router.get('/list', function(req, res) {
  
// 	queryUser().then(data => {
// 		res.json(
// 			new SuccessModel(data)
// 		);
// 	});
// });

// /* 获取当前用户信息 */
// router.get('/userInfo', function (req, res) {
// 	try {
// 		// 拿取token 数据 按照自己传递方式写
// 		const cookie = req.headers['cookie'];
// 		const tokenStr = until.cookieToJson(cookie);
// 		// 检查token是否有效（过期和非法）
// 		const user = token.checkToken(tokenStr);
// 		res.json(
// 			new SuccessModel({username: user})
// 		);
// 	} catch(e) {
// 		res.json(
// 			new ErrorModel(e)
// 		);
// 	}
// });

module.exports = router;
