module.exports = {
    root: true,
    parserOptions: {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    env: {
        node: true,
        browser: false,
        es6: true
    },
    extends: [
        'eslint:recommended'
    ],
    settings: {
    },
    'globals': {
        'module':true,
        'process': true,
        'require': true,
        "__NODE_ENV__": true
    },
    // add your custom rules here
    'rules': {
        // tab缩进
        // "indent": ["error", 'tab'],
        "semi": ["error", "always"],
        // /*尾部逗号设置*/
        'comma-dangle': ["error", "never"],
        // /*缩进*/
        /*禁止使用debugger*/
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 'no-unused-vars': ['error', { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        /*禁止使用console（生产环境）*/
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        // /*要求 switch 语句中有 default 分支*/
        'default-case': "error",
        // /*禁用 eval()*/
        'no-eval': "error",
        'space-before-blocks': 2
    }
};
  