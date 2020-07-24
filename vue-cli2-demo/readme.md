

# 初始化创建一个项目
`vue --version`
检查版本，`@vue/cli 4.3.1`

`vue create my-vue-demo`
有两个选项，第一个选择了默认 default (babel, eslint) ；第二个选择了 NPM

最后输出完成：

```
🎉  Successfully created project my-vue-demo.
👉  Get started with the following commands:

 $ cd my-vue-demo
 $ npm run serve
```
## 手动创建了文件 
```

vue.config.js
.env.development
.env.production

```
# 引入 依赖

npm i vue-router -S
npm install --save vuex
npm install -S axios
npm install -D mockjs

# 引入 element-ui

> https://element.eleme.cn/#/zh-CN/component/quickstart

`npm i element-ui -S`

在main.js中加入：

```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
```



# 新建了一个文件夹 views