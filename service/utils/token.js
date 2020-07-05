
var jwt = require('jsonwebtoken'); // 使用jwt签名
var tokenTime = 1000 * 60 * 60 * 24 * 4;// 授权时效24*4小时

module.exports = {
	/*
  * 设置token
  */
	setToken(data, res) {
		//将当前用户的信息通过token加密，并设置失效时间，得到token加密字符串
		console.log(data);
		var token = jwt.sign(data, 'myjwttest', {
			expiresIn : tokenTime
		});
		//将token加密的字符串通过setCookie的方式传给客户端
		res.cookie('token', token, {
			maxAge: tokenTime,
			httpOnly: false
		});
	},
	/*
  * 校验token
  */
	checkToken(data) {
		var userInfo = null;
		try {
			//如果根据token查到了用户信息，表示校验通过
			var decoded = jwt.verify(data.token, 'myjwttest');
			userInfo = decoded;
			// console.log(decoded);
		}catch(e) {
			console.error('--cookie没有--', e);
		}
    
		return userInfo;
	}
};
