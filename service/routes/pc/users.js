var express = require('express');
var router = express.Router();
// sql
const { login, createUser, queryUser } = require('../../controller/pc/users');
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// token操作
const token = require('../../utils/token');
const until = require('../../utils/cookie');

/* 创建用户 */
router.post('/create', async function(req, res) {
	const sqlRes = await createUser(req.body);
	if (sqlRes.affectedRows == 1) {
		// 插入成功
		res.json(
			new SuccessModel("新增用户信息成功")
		); 
	} else {
		res.json(
			new ErrorModel("新增用户信息失败")
		);
	}
});

/* 登录 */
router.post('/login', function(req, res) {
	let { username, password } = req.body;
	let flag = false;
	// 参数校验
	const mapRules = new Map([
		[username, { vaild: '用户名不能为空' }],
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
		let { username } = data;
		if(username) {
			// 设置token
			//设置token
			token.setToken({
				user: username
			}, res);
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

/* 查询用户 */
router.get('/list', function(req, res) {
  
	queryUser().then(data => {
		res.json(
			new SuccessModel(data)
		);
	});
});

/* 获取当前用户信息 */
router.get('/userInfo', function (req, res) {
	try {
		// 拿取token 数据 按照自己传递方式写
		const cookie = req.headers['cookie'];
		const tokenStr = until.cookieToJson(cookie);
		// 检查token是否有效（过期和非法）
		const user = token.checkToken(tokenStr);
		res.json(
			new SuccessModel({username: user.user})
		);
	} catch(e) {
		res.json(
			new ErrorModel(e)
		);
	}
});

module.exports = router;
