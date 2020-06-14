# taskShop

### 概述
任务商城是一个前后端分离项目，基于uniapp、express、vue为基础的小型网站快速开发框架<font size="5">🔨</font>，统一规定了目录结构、开发规范等范式。

### 快速开始

1. 安装环境依赖
    + `npm` 安装
    ```shell
    $> 切换到对应的文件下
    $> cd app/pc/sevice
    $> npm install
    ```

    + `yarn` 安装
    ```shell
    $> yarn
    ```

2. 编译项目
    
    编译uniapp
    ```shell
    npm run dev-cd:mp-weixin
    ```
    编译pc
    ```shell
    npm run dev
    ```
    编译service
    ```shell
    npm run dev
    ```

### 目录说明

    |-- app app文件
    |-- pc pc文件
    |-- service api服务文件
    |-- README.md readme文档

### 开发规范

+ 遵守《开发准则》
+ 遵守《ESLint规范》
+ 一起共同维护此项目

### 开发准则（纠结癌必备）

1. 公共模块:（分包和主包同时需要）放`src/components`目录
2. 分包模块:（分包内使用）放`src/subPackages/**/pages/components`目录
3. 第三方模块放在`src/vendor`目录
4. （正在补充...）

#### ESLint 规范

+ 单引号
+ 4格缩进
+ 强制在块内使用空格(块间距)
+ 禁止声明未使用变量
+ 强制使用尾部分号
+ 禁止 `production` 环境使用 `debugger` 关键字
+ 禁止 `production` 环境使用 `console`
+ 强制 `switch` 语句中有 `default` 分支
+ 禁止使用 `eval`
+ 禁止使用 `__proto__` 属性
+ 禁止使用不带 `await` 表达式的 `async` 函数
+ 用重新分配变量强制使用 `const` 关键字，降低认知负荷
+ 禁止使用 `var` 关键字
+ 更多eslint规范参考

### 相关文档

`vue` 文档: [原文地址](https://cn.vuejs.org/index.html)

`vuex` 文档: [原文地址](https://vuex.vuejs.org/zh/)

`uniapp` 文档: [原文地址](https://uniapp.dcloud.io/collocation/pages)

`微信小程序` 文档: [原文地址](https://developers.weixin.qq.com/miniprogram/dev/framework/)

`sass` 文档: [原文地址](https://sass.bootcss.com/documentation)

`express` 文档: [原文地址](https://sass.bootcss.com/documentation)
