import axios from 'axios';
import router from "../router/router";
import store from "../store";
import { MessageBox, Message } from "element-ui";

// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});

//判断环境变量
if(process.env.NODE_ENV == 'development') {
    instance.defaults.baseURL = '/api/apiPc';
}else if(process.env.NODE_ENV == 'mock') {
    instance.defaults.baseURL = 'http://localhost:8080';
}else if(process.env.NODE_ENV == 'production') {
    // instance.defaults.baseURL = 'http://47.107.121.17'
    instance.defaults.baseURL = 'http://39.100.251.213';
}

// post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//封装http请求
const $Http = {
    //get请求
    get(url, params) {
        return new Promise((resolve, reject) =>{
            const vaildParams = Object.assign({ t: new Date().getTime() }, params);       
            instance.get(url, {            
                params: vaildParams        
            }).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err);        
            });    
        });
    },
    //post请求
    post(url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err);
            });
        });
    }
};

// 统一拦截响应
// http response 拦截器
instance.interceptors.response.use(
    response => {
      //拦截响应，做统一处理 
      if (response.data.code) {
        switch (response.data.code) {
            case 401:
                // 登录状态为没有登录
                store.commit('SET_NAME', '');
                store.commit('SET_LOGIN_FLAG', false);
                MessageBox.confirm("登录已失效，请重新登录", "温馨提示", {
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: encodeURI(router.currentRoute.fullPath)
                        }
                    });
                });
                return;
            case 200:
                // 登录成功
                return response;
            case 400:
                // 请求异常
                MessageBox.confirm("接口请求异常,请查看参数是否正确", "温馨提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "error"
                }).then(() => {
                    
                });
                return;
            default: 
            break;
        }
      }
      return response;
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error.response.status); // 返回接口返回的错误信息
    }
);


export default $Http;