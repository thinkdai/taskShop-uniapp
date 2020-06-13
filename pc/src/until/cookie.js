// 设置cookie
export function setCookie(key,value,param) {
    document.cookie = key + '=' + value + '; expires=' + param.expires + '; path=' + param.path; 
}
// 获取cookie
export function getCookie (key) {
    var cookies = document.cookie;
    var arr = cookies.split(';');
    if(arr) {
        for (var i = 0; i < arr.length; i++) {
            var kv = arr[i].split('=');
            if(kv[0] == key) {
                return kv[1];
            }
        }
    }
}
