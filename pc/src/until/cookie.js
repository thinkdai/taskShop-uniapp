// 设置cookie
export function setCookie(key,value,param) {
    document.cookie = key + '=' + value + '; expires=' + param.expires + '; path=' + param.path; 
}
// 获取cookie 后台设置为httpOnly为false
export function getCookie (key) {
    var cookie = document.cookie;
    if (cookie) {
        let cookieArr = cookie.split(";");
        let obj = {}; 
        cookieArr.forEach((i) => {
            let arr = i.split("=");
            obj[arr[0].replace(/(^\s*)|(\s*$)/g, "")] =arr[1];
        });

        return obj[key];
    } else {
        return false;
    }
}
