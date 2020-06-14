
module.exports = { 
	// cookie解析
	cookieToJson(cookie) {
		if (cookie) {
			let cookieArr = cookie.split(";");
			let obj = {}; 
			cookieArr.forEach((i) => {
				let arr = i.split("=");
				obj[arr[0].replace(/(^\s*)|(\s*$)/g, "")] =arr[1];
			});
			return obj;
		} else {
			return { token: '' };
		}
	}
};


