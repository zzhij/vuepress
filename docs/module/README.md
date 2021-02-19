# 组件
## 组件的演变
* [组件介绍](https://blog.csdn.net/kkkkkxiaofei/article/details/79384219)
* [组件库](http://www.luoxiao123.cn/1196.html)
## 组件的定义
### 什么是组件化
* 组件化并不是前端所特有的，一些其他的语言或者桌面程序等，都具有组件化的先例。确切的说，只要有UI层的展示，就必定有可以组件化的地方。简单来说，组件就是将一段UI样式和其对应的功能作为独立的整体去看待，无论这个整体放在哪里去使用，它都具有一样的功能和样式，从而实现复用，这种整体化的思想就是组件化。不难看出，组件化设计就是为了增加复用性，灵活性，提高系统设计，从而提高开发效率。

### 生活中的常见的组件模式
* 飞机
* 汽车
* 手机
## 常见的第三方UI组件
## 现在组件的现状
## 常见的组件实现方式（以vue为例）
* 动态组件

### Web Components  新的组件方式
* [阮一峰文档](http://www.ruanyifeng.com/blog/2019/08/web_components.html)
* 谷歌公司由于掌握了 Chrome 浏览器，一直在推动浏览器的原生组件，即 Web Components API。相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小。目前，它还在不断发展，但已经可用于生产环境。
* 这种自定义的 HTML 标签，称为自定义元素（custom element）。根据规范，自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素。所以，`<user-card /> `不能写成`<usercard / >`。

```js
console.log(121212)
```
::: demo
```html
<template>
  <div class="box-vue">Vue {{ message }}</div>
</template>
<script>
export default {
  data: () => ({ message: 'Hello World' })
}
</script>
<style>
.box-vue { color: red; }
</style>
```
:::