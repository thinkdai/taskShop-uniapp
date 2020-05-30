import vuex from 'vuex';
// const URI = require('urijs');

function getCurrentTime() {
    var keep = '';
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
    return keep; // 20160614134947
}

function formatDate(newDate) {
    let now;
    if (newDate) {
        now = new Date(newDate.replace(/-/g, '/'));
    } else {
        now = new Date();
    }
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let sum = year + '/' + month + '/' + day;
    let date = new Date(sum).getTime();
    return date;
}

function objLength(input) {
    var type = toString(input);
    var length = 0;
    if (type !== '[object Object]') {
        // throw "输入必须为对象{}！"
    } else {
        for (var key in input) {
            if (key !== 'number') {
                length++;
            }

        }
    }
    return length;
}

// 验证是否是手机号码
function vailPhone(number) {
    let flag = false;
    // let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
    let myreg = /^1[3456789]\d{9}$/;
    if (number.length !== 11) {
        flag = false;
    } else if (!myreg.test(number)) {
        flag = false;
    } else {
        flag = true;
    }
    return flag;
}

// 验证是否西班牙手机(6开头 9位数)
function ifSpanish(number) {
    let flag = false;
    let myreg = /^([6|7|9]{1}(\d+){8})$/;
    if (number.length !== 9) {
        flag = false;
    } else if (!myreg.test(number)) {
        flag = false;
    } else {
        flag = true;
    }
    return flag;
}

// 遍历对象属性和值
function displayProp(obj) {
    var names = '';
    for (var name in obj) {
        names += name + obj[name];
    }
    return names;
}

// 去除字符串所有空格
function sTrim(text) {
    return text.replace(/\s/ig, '');
}

function webview2Url(url) {
    url = url ? absUrl(url) : '';
    var encoded = encodeURIComponent(url);
    return '/pages/webview2?redirect=' + encoded;
}

function absUrl(url) {
    let host = vuex.state.webviewHost;
    if (url.indexOf('http') !== 0) {
        if (url[0] === '/') {
            return host + url;
        } else {
            return host + '/' + url;
        }
    }

    return url;
}

/* 获取当前页url */
function getCurrentPageUrl() {
    var pages = getCurrentPages(); // 获取加载的页面
    var currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    var url = currentPage.route; // 当前页面url
    return url;
}

/* 获取当前页带参数的url */
function getCurrentPageUrlWithArgs() {
    var pages = getCurrentPages(); // 获取加载的页面
    var currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    var url = currentPage.route; // 当前页面url
    var options = currentPage.options; // 如果要获取url中所带的参数可以查看options

    // 拼接url的参数
    var urlWithArgs = '/' + url + '?';
    for (var key in options) {
        var value = options[key];
        urlWithArgs += key + '=' + value + '&';
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);

    return urlWithArgs;
}

// rpx换算
function transformRpx(rpx) {
    const systemInfo = uni.getSystemInfoSync();
    return rpx / 750 * systemInfo.windowWidth;
}

// 函数防抖
function debounce(fn, wait) {
    let timer = null;
    return function() {
        const context = this,
            args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}

function throttle(fn, wait) {
    let timer = null;
    return function() {
        const context = this,
            args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, wait);
        }
    };
}

// 累加函数
function sum(arr) {
    if (!(arr instanceof Array)) {
        return 0;
    }
    return arr.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}

/**
 * 获取平台信息
 * @return {string|string|*}
 */
function getPlatform() {
    if (!getPlatform.systemType) {
        let sysInfo = uni.getSystemInfoSync();
        getPlatform.systemType = sysInfo.platform;
    }
    return getPlatform.systemType;
}

// 随机产生min-max当中的某一个整数的算法
function random(min, max) {
    return Math.ceil((Math.random() * (max - min + 1)) + min - 1);
}

// 检查权限的开启状态
function checkAuth() {
    return new Promise(resolve => {
      // #ifndef APP-PLUS
      uni.getSetting({
        success(res) {
          resolve(res['authSetting'] || {});
        },
        fail() {
          resolve(false);
        }
      });
      // #endif
    });
}

// 如果没有授权
function wxLogin() {
    return new Promise(resolve => {
        uni.login({
            success(res) {
                resolve(res.code);
            },
            fail(err) {
                console.log(err);
                resolve();
            }
        });
    });
}

// 高级数组去重方法
// function unique (src, key, preserve = false, drop = null) {
//     if(!Array.isArray(src)) {
//         throw new TypeError("parameter 'src' must be an array");
//     }

//     if(typeof key == "function") {
//         drop = key;
//         key = "";
//     }

//     if(typeof preserve == "function") {
//         drop = preserve;
//         preserve = false;
//     }

//     let set = [];
//     let expecctDrop = typeof drop == 'function';
//     let hasKey = !!key && typeof key == 'string';
//     let keys = hasKey ? key.split(",") : "";

//     let result = src.reduce((_src,item,index) => {
//         let _key = hasKey ? keys.reduce((s,k) => s += evalPath(item,k),"") : item;

//         let exist = _key in _src;

//         if(exist) {
//             if(preserve || expecctDrop) {
//                 set.push(index);
//             }
//         }else {
//             _src[_key] = item;
//         }

//         return _src;
//     },{});
    
//     if(expecctDrop) {
//         drop(set.map(index => src[index]));
//     }

//     return preserve ? set.reverse().reduce((s,i) => (s.splice(i,1),s),src) : values(result);
// } 


// 获取指定对象的值的集合
function values(obj) {
    return typeof Object.values == "function" ? Object.values(obj) 
        : Object.keys(obj).map(key => obj[key]);
}

// 解析字符串
function evalPath(obj, path, separator=".") {
    return typeof path == "string" ?
        path.trim()
            .split(separator)
            .reduce((s,p) => (s ? s[p] :undefined),obj): obj;        
}

// 类型检测偏函数
const toString = Object.prototype.toString;
function isType (type) {
    return function(obj) {
        return toString.call(obj) === `[object ${type}]`;
    };
}
const isArray = isType('Array');
const isObject = isType('Object');
const isString = isType('String');
const isNull = isType('Null');


export default {
    sum,
    debounce,
    throttle,
    transformRpx,
    getCurrentPageUrl,
    getCurrentPageUrlWithArgs,
    formatDate: formatDate,
    getCurrentTime: getCurrentTime,
    objLength: objLength,
    displayProp: displayProp,
    sTrim: sTrim,
    vailPhone: vailPhone,
    ifSpanish: ifSpanish,
    webview2Url,
    getPlatform,
    random,
    checkAuth,
    // unique,
    isArray,
    isObject,
    isString,
    isNull,
    wxLogin
};