/**
 * 内存缓存
 */
import { extend, getType } from './common';
const encryptKey = 'CACHE_';
const globalData = {};

const MemoryCache = {
    /**
     * 获取内容
     */
    get(name) {
        return this.__getCache(name);
    },

    /**
     * 获取内容（返回引用地址）
     * warning：如果你对引用处理不是特别了解，请尽量减少使用
     */
    getReference(name) {
        return this.__getCacheReference(name);
    },

    /**
     * 设置内容
     * @param name 储存键
     * @param value 储存内容
     * @param time 时长minutes
     */
    set(name, value, time = 12) {
        return this.__setCache(name, value, time);
    },

    /**
     * 设置内容（设置引用地址）
     * warning：如果你对引用处理不是特别了解，请尽量减少使用
     */
    setReference(name, value, time = 12) {
        return this.__setCacheReference(name, value, time);
    },

    /**
     * 移除内容
     */
    remove(name) {
        return this.__removeCache(name);
    },

    /**
     * 是否存在
     */
    has(name) { // 是否存在
        return !this.checkTimeout(name);
    },

    /**
     * 检查超时
     */
    checkTimeout(name) {
        return this.__checkTimeout(name);
    },

    encrypt(name) {
        return this.__encrypt(name);
    },

    extend(copy) {
        return extend(this, copy);
    }
};

Object.defineProperty(MemoryCache, '__getCache', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name) {
        let __name = this.__encrypt(name),
            __value = globalData[__name];
        if (__value) {
            if (!this.__checkTimeout(name)) {
                return getType.call(__value.__value) === '[object Array]' ||
                getType.call(__value.__value) === '[object Object]'
                    ? JSON.parse(JSON.stringify(__value.__value)) : __value.__value;
            } else {
                delete globalData[__name];
            }
        }
        return '';
    }
});

// 获取浅拷贝缓存
Object.defineProperty(MemoryCache, '__getCacheReference', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name) {
        let __name = this.__encrypt(name),
            __value = globalData[__name];
        if (__value) {
            if (!this.__checkTimeout(name)) {
                return globalData[name];
            } else {
                delete globalData[name];
            }
        }
        return '';
    }
});

// 设置引用缓存
Object.defineProperty(MemoryCache, '__setCacheReference', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name, value, time = 12) {
        let __name = this.__encrypt(name);
        globalData[__name] = {
            __date: new Date().getTime() + (time * 60 * 1000),
            __value: value
        };
    }
});

Object.defineProperty(MemoryCache, '__setCache', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name, value, time = 12) {
        let __name = this.__encrypt(name);
        globalData[__name] = {
            __date: new Date().getTime() + (time * 60 * 1000),
            __value: getType.call(value) === '[object Array]' ||
            getType.call(value) === '[object Object]'
                ? JSON.parse(JSON.stringify(value)) : value
        };
    }
});

Object.defineProperty(MemoryCache, '__removeCache', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name) {
        let __name = this.__encrypt(name);
        if (globalData[__name]) {
            delete globalData[__name];
        }
    }
});

Object.defineProperty(MemoryCache, '__checkTimeout', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name) {
        let __name = this.__encrypt(name),
            nowDate = new Date().getTime(),
            __value = globalData[__name];
        if (__value) {
            return __value.__date < nowDate;
        }
        return true;
    }
});

Object.defineProperty(MemoryCache, '__encrypt', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function(name) {
        return encryptKey + name;
    }
});

// 输出打印数据栈
Object.defineProperty(MemoryCache, '__printStack', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function() {
        return JSON.stringify(globalData);
    }
});

export default MemoryCache;
