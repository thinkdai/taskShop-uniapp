import store from '../../../store';

import {
    SUCCESS,
    ERROR_LOGIN_STATE,
    ERROR_LOGIN_INVALID,
    ERROR_USER_INFO,
    ERROR_TOKEN_INVALID,
    ERROR_NO_POWER,
    ERROR_SYSTEM_UNUSUAL
} from './code';

import { getToken,getTokenSync  } from './getToken';

let originRequestOpts = null;

/**
 * request请求
 * @param url {String} 请求路径
 * @param method {String} 请求类型
 * @param data {Object|Array} body数据
 * @param header {Object}  请求头
 * @param map {Blooean}  是否是地图请求
 * @return {Promise<any>} 请求结果
 */
export const request = (url, method = 'GET', data = {}, header = {}, map = false) => {
    return new Promise((resolve, reject) => {
        const requestOpts = {
            header,
            method,
            success(response) {
                const data = response.data || {};
                if (map) {
                    return resolve(data);
                }
                if (response.statusCode !== 200) {
                    return reject(data);
                }

                // TODO::先简单封装请求
                switch (Math.floor(data.code)) {
                case ERROR_LOGIN_STATE:
                case ERROR_LOGIN_INVALID:
                case ERROR_USER_INFO:
                case ERROR_TOKEN_INVALID:
                    // 需要重新获取token(暂时性死区问题)
                    let originRequestOptsTemp = originRequestOpts;
                    getToken().then(() => {
                        originRequestOptsTemp['header']['http-jwt'] = store.getters.token;
                        uni.request(originRequestOptsTemp);
                    });
                    break;
                case ERROR_NO_POWER:
                case ERROR_SYSTEM_UNUSUAL:
                    // 报警提示
                    console.error(data);
                    return reject(data);
                case SUCCESS:
                    // 清空上次缓存
                    originRequestOpts = null;
                    return resolve(data);
                default:
                    return reject(data);
                }
            },
            fail(error) {
                return reject(error);
            }
        };

        switch (method.toUpperCase()) {
        case 'GET':
            if (!map) {
                const sendQuery = `${url.indexOf('?') > -1 ? '&' : '?'}_t=${Date.now()}`;
                requestOpts['url'] = `${store.getters.host}/${url}${sendQuery}`;
                requestOpts['data'] = data;
            } else {
                requestOpts['url'] = url;
            }
            break;
        case 'DELETE':
        case 'PUT':
        case 'POST':
            requestOpts['url'] = `${store.getters.host}/${url}`;
            console.log(requestOpts['url']);
            requestOpts['data'] = Object.assign(data, {
                version: store.getters.version,
                _t: Date.now()
            });
            break;
        default:
            return reject(new Error('未知请求类型'));
        }
        // 缓存上一次的请求
        originRequestOpts = requestOpts;
        
        // 有token的时候，每个请求都带上token
        if(url !== 'auth/wx/login') {
            if(!store.getters.token) {
                getTokenSync(() => {
                    requestOpts['header']['http-jwt'] = store.getters.token;
                    uni.request(requestOpts);
                });
            }else {
                requestOpts['header']['http-jwt'] = store.getters.token;
                uni.request(requestOpts);
            }
        }else {
            uni.request(requestOpts);
        }
    });
};

/**
 * GET请求
 * @param url {String} 请求路径
 * @param params {Object|Array} 请求参数
 * @param header {Object}  请求头
 * @return {Promise<any>} 请求结果
 */
export const get = (url, params = {}, header = {}) => {
    return request(url, 'GET', params, header);
};

/**
 * POST请求
 * @param url {String} 请求路径
 * @param data {Object|Array} body数据
 * @param header {Object}  请求头
 * @param isFromData {Boolean} 是否发送fromData类型
 * @return {Promise<any>} 请求结果
 */
export const post = (url, data = {}, header = {}, isFromData = false) => {
    if (isFromData) {
        header['content-type'] = 'multipart/form-data';
    }

    return request(url, 'POST', data, header);
};

/**
 * PUT请求
 * @param url {String} 请求路径
 * @param data {Object|Array} body数据
 * @param header {Object}  请求头
 * @return {Promise<any>} 请求结果
 */
export const put = (url, data = {}, header = {}) => {
    return request(url, 'PUT', data, header);
};

/**
 * DELETE请求
 * @param url {String} 请求路径
 * @param data {Object|Array} body数据
 * @param header {Object}  请求头
 * @return {Promise<any>} 请求结果
 */
export const del = (url, data = {}, header = {}) => {
    return request(url, 'DELETE', data, header);
};

export const mapRequest = (url, method = 'GET', data = {}, header = {}, map= 1) => {
    return request(url, method, data, header, map);
};

export default {
    get,
    post,
    put,
    delete: del,
    mapRequest
};
