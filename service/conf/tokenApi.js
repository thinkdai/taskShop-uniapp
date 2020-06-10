module.exports = {
	//需要登录态的接口
	tokenApi:[
		// 用户
		'/apiPc/user/create',
		'/apiPc/user/delete',
		'/apiPc/user/query',
		// 商铺
		'/apiPc/shop/create',
		'/apiPc/shop/list',
		'/apiPc/shop/update',
		'/apiPc/shop/delete',
		'/apiPc/upload/img'
		// 查询时不需要校验
		// '/banner/query',
		// '/store-entry/create',
		
	],
	uploadPath:'/static/',
	accessKeySecret: 'abc123'
};