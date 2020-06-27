module.exports = {
	//需要登录态的接口
	tokenApi:[
		// 用户
		'/apiPc/user/create',
		'/apiPc/user/delete',
		'/apiPc/user/query',
		'apiPc/user/userInfo',
		// 商铺
		'/apiPc/shop/create',
		'/apiPc/shop/list',
		'/apiPc/shop/update',
		'/apiPc/shop/delete',
		'/apiPc/upload/img',
		// 任务
		'/apiPc/task/list',
		'/apiPc/task/create',
		'/apiPc/task/update',
		'/apiPc/task/delete',
		// 上传
		'/apiPc/upload/img',
		// 日志
		'/apiPc/log/access',
		'/apiPc/log/error'
		// 不需要校验
		// '/apiPc/static/img/*', // 图片预览
	],
	uploadPath:'/static/',
	accessKeySecret: 'abc123'
};