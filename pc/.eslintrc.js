module.exports = {
  root: true,
  "parser": "vue-eslint-parser",
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  plugins:[
    "vue"
  ],
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended'
  ],
  settings: {
  },
  'globals': {
      'module':true,
      '$Http': true,
      'process': true,
      'require': true,
      "__NODE_ENV__": true,
      "BMap": true,
      '__dirname': true,
      module: true
  },
  // add your custom rules here
  'rules': {
      "semi": ["error", "always"],
      /*尾部逗号设置*/
      'comma-dangle': ["error", "never"],
      // /*缩进*/
      /*禁止使用debugger*/
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      // 'no-unused-vars': ['error', { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
      /*禁止使用console（生产环境）*/
      'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
      /*要求 switch 语句中有 default 分支*/
      'default-case': "error",
      /*禁用 eval()*/
      'no-eval': "error",
    
      /*禁用 __proto__ 属性*/
      'no-proto': "error",
      /*禁止使用不带 await 表达式的 async 函数*/
      // 'require-await': "error",
      /*实施自我关闭风格*/
      "vue/html-self-closing": 0,
      /*================【代码风格相关】===================*/
      /*template 四个空格*/
      'vue/html-indent':["error",4],
      'vue/script-indent':["error",4, { "baseIndent": 1 }],
      /*强制在大括号内开行和结尾使用一致的空格*/
      'block-spacing':"error",
       /*强制在块前 使用一致的空格*/
      'space-before-blocks':"error",
      /*===================【关闭一些规则】================*/
      /*关闭 在Vue组件中为Prop名称强制使用特定大小写或者特定连接符*/
      "vue/prop-name-casing": 0,
      /*关闭 no-empty规则*/
      'no-empty':0,
      /*关闭 template每行的最大属性数*/
      'vue/max-attributes-per-line':0,
      /*关闭 在单行元素的内容之前和之后需要换行*/
      'vue/singleline-html-element-content-newline':0,
      /*关闭 禁止在外部范围中声明的阴影变量中声明变量*/
      'vue/no-template-shadow':0,
      /*关闭 禁止在与v-for相同的元素上使用v-if*/
      'vue/no-use-v-if-with-v-for':0,
      /*关闭 在多行元素的内容之前和之后需要换行*/
      'vue/multiline-html-element-content-newline':0,
      /*关闭 data 中定义的 compute 属性 */
      'vue/no-dupe-keys':0,
      'no-constant-condition':0,
      /*在标签的右括号之前不允许换行*/
      "vue/html-closing-bracket-newline": ["error", {
        "singleline": "never",
        "multiline": "never"
      }],
      /*关闭属性链接符校验*/
      'vue/attribute-hyphenation':0
  }
};
