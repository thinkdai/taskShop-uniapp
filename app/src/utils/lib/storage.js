const Storage = {
    // 添加
    append({ key, val }) {
        let data = uni.getStorageSync(key), 
            dataArr = [];
        if (data) {
            dataArr = data.split(',');
            dataArr.unshift(val);
        } else {
            dataArr.unshift(val);
        }
        let resArr = new Set(dataArr);
        uni.setStorageSync(key, [...resArr].join(','));
    },
    // 移出一个
    removeOne({ key, val }) {
        let data = uni.getStorageSync(key), dataArr = [];
        if (data) {
            dataArr = data.split(',');
            let resArr = [];
            for (let i of dataArr) {
                if (i === val) continue;
                resArr.push(i);
            }
            uni.setStorageSync(key, resArr.join(','));
        }
    },
    // 获取所有
    getAll(key) {
        let data = uni.getStorageSync(key);
        return data ? data.split(',') : [];
    },
    // 移出所有
    remove(key) {
        uni.clearStorageSync(key);
    }
};


module.exports = Storage;