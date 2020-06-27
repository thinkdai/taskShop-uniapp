const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const handleLog  = require('./middleWare/logger');
const logger = require('./middleWare/logger/logger');

//引入token的操作,token的白名单
const tokenUtil = require("./utils/token");
const config = require('./conf/tokenApi');
const until = require('./utils/cookie');

const pcRouter = require('./routes/pc/index');
const appRouter = require('./routes/app/index');

const app = express();

// 跨域配置 本地调试使用
app.use(function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	// res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, wec-access-token, Set-Cookie");
	res.header("Access-Control-Allow-Credentials", "true");

	next();
});

//app.use是Express拦截器的方法
app.use(function(req, res, next) {
  // pc的token与app的token分开
  if (req.originalUrl.indexOf('apiPc')) {
    // 拿取token 数据 按照自己传递方式写
    const cookie = req.headers['cookie'];
    const token = until.cookieToJson(cookie);
    // 检查token是否有效（过期和非法）
    const user = tokenUtil.checkToken(token);

    if (user) {
      //将当前用户的信息挂在req对象上，方便后面的路由方法使用
      req.user = user;
      // 续期
      tokenUtil.setToken({user,res});
      next(); //继续下一步路由
    } else {
      //不需要登录态域名白名单
      if (config.tokenApi.indexOf(req.path) == -1) {
        next();
        return;
      }
      res.json({ code: 401, message: '无效的token.' });
    }
  } else {
    console.log(111);
  }
});

// 中间件
// 日志处理落地 参考:https://www.cnblogs.com/chyingp/p/node-learning-guide-express-morgan.html
app.use(handleLog);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// pc/app的接口网关
app.use('/apiPc', pcRouter);
app.use('/apiApp', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler错误中间件
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
  res.render('error');
  // 错误统一处理
  logger.error(err.message);
});

module.exports = app;
