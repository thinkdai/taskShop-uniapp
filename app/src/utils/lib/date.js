// 格式化日期的工具库,新增了格式化星期
const toInt = Symbol('toInt');
const toDate = Symbol('toDate');

class FormatDate extends Date {

    // 让新类继承于Date类
    constructor(date) {
        super(...arguments);
        this.date = date || new Date();
    }

    // 私有方法: 转换整数
    [toInt]() {
        return parseInt(this.date);
    }

    // 私有方法: 更改日期格式
    [toDate]() {
        let dateStr = this.date;

        if (dateStr instanceof Date) return dateStr;

        if (!isNaN(dateStr) || /^\d+$/.test(dateStr)) {
            return new Date(this[toInt](dateStr));
        }

        dateStr = (dateStr || '')
            .trim()
            .replace(/\.\d+/, '')
            .replace(/-/, '/')
            .replace(/-/, '/')
            .replace(/(\d)T(\d)/, '$1 $2')
            .replace(/Z/, 'UTC')
            .replace(/([+-]\d\d):?(\d\d)/, '$1$2');

        return new Date(dateStr);
    }

    // 格式化日期为指定格式
    formatDate(fmt) {
        let date = this[toDate](this.date);

        if (!date) return;
        const o = {
            'M+': date.getMonth() + 1, // 月
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }

        Object.keys(o).forEach(k => {
            if (new RegExp(`(${k})`).test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        });

        return fmt;
    }

    // 计算星期的函数
    getSunday(lang = 'en', format = 'MMM') {
        const weekEnArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekChArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            weekChSArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        // 中文星期
        if (lang === 'ch') {
            if (format === 'MMM') return weekChArr[new Date(this.date).getDay()];
            if (format === 'MM') return weekChSArr[new Date(this.date).getDay()];
        } else {
            return weekEnArr[new Date(this.date).getDay()];
        }
    }

    // 获取当天的日期信息 年月日 星期
    getTodayDate(fmt, lang = 'en') {
        return `${this.formatDate(fmt)} ${this.getSunday(lang)}`;
    }

    // 判断是否是今天
    isToday() {
        let nowDay = new Date().getDate();
        let day = new Date(this.date).getDate();
        // 相差时间小于24小时,同时天数一致
        return new Date().getTime() - new Date(this.date).getTime() < 86400000 && nowDay == day;
    }

    // 日期是否相等
    static dateEqual(before, after) {
        before = new Date(before.replace(/-/g, '/'));
        after = new Date(after.replace(/-/g, '/'));
        if (before.getTime() - after.getTime() === 0) {
            return true;
        } else {
            return false;
        }
    }
}

export default FormatDate;
