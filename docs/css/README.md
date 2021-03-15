# css常见问题
## 图片文字的间距
* 图片文字之间已经消除了margin，padding等相关的影响，为什么还会有空隙
### 图片之间的空隙
::: demo
```html
<template>
  <div class="box-vue" :class="{'box-height': flag}">
    <img class="img-box" src="/img/img1.jpg">
    <img class="img-box" src="/img/img1.jpg">

    <button @click="flag = !flag">切换</button>

    <button @click="paper = !paper">报纸</button>
    <img v-if="paper" class="img-box" src="/img/paper.png">
  </div>
</template>
<script>
export default {
  data: () => ({
    flag: false,
    paper: false
  })
}
</script>
<style>
  div .vuepress-plugin-demo-block__wrapper .vuepress-plugin-demo-block__display {
  max-height: auto;
}
  .box-vue img, .box-vue div {
    margin: 0;
    padding: 0;
  }
.box-vue { color: red; }
.box-height { line-height: 0; }
.img-box { width: 500px; }
</style>
```
:::
## margin
* 为什么有些情况下margin会无效
* <a href="/css/demo/margin.html" target="_blank">demo</a>
### 替换元素
```html
根据是否具有可替换内容，可以把元素分为替换元素和非替换元素。
典型的替换元素：<img>、<object>、<video>、<iframe>、<textarea>、<input>······
替换元素特性：

1.内容可替换
2.内容的外观不受页面上的css影响
3.有自己的尺寸
4.在很多css属性上有自己的一套规则
替换元素和非替换元素的区别：

1.替换元素和非替换元素之间只隔了一个src属性
2.替换元素和非替换元素之间只隔了一个CSS content属性
```
### 无效的场景
```html
因为 margin 属性的诸多特异性，所以，我们在实际开发的时候，经常会遇到设置的
margin 无效的情形，这里我罗列一下，希望大家遇到类似的问题知道原因以及如何对症下药。
（1）display 计算值 inline 的非替换元素的垂直 margin 是无效的，虽然规范提到有
渲染，但浏览器表现却未寻得一点踪迹，这和 padding 是有明显区别的。对于内联替换元素，
垂直 margin 有效，并且没有 margin 合并的问题，所以图片永远不会发生 margin 合并。
（2）表格中的<tr>和<td>元素或者设置 display 计算值是 table-cell 或 table-row 的
元素的 margin 都是无效的。但是，如果计算值是 table-caption、table 或者 inline-table
则没有此问题，可以通过 margin 控制外间距，甚至::first-letter 伪元素也可以解析 margin。 
（3）margin 合并的时候，更改 margin 值可能是没有效果的。以父子 margin 重叠为例，
假设父元素设置有 margin-top:50px，则此时子元素设置 margin-top:30px 就没有任何
效果表现，除非大小比 50px 大，或者是负值。
（4）绝对定位元素非定位方位的 margin 值“无效”。什么意思呢？很多时候，我们对元
素进行绝对定位的时候，只会设置 1～2 个相邻方位。例如：
img { top: 10%; left: 30%;} 
此时 right 和 bottom 值属于 auto 状态，也就是右侧和底部没有进行定位，此时，这两个方
向设置 margin 值我们在页面上是看不到定位变化的。例如：
img { 
 top: 10%; left: 30%; 
 margin-right: 30px; 
} 
此时 margin-right:30px 几乎就是摆设。是 margin 没起作用吗？实际上不是的，绝对定
位元素任意方位的 margin 值无论在什么场景下都一直有效。譬如这个例子，假设<img>宽度
70%，同时父元素是具有定位属性，且 overflow 设置为 auto 的元素，则此时就会出现水平
滚动条，因为 margin-right:30px 增加了图片的外部尺寸。
那为什么一般情况下没有效果呢？主要是因为绝对定位元素的渲染是独立的，普通元素和
兄弟元素是心连心，你动我也动，但是绝对定位元素由于独立渲染无法和兄弟元素插科打诨，
因此，margin 无法影响兄弟元素定位，所以看上去就“无效”。
（5）定高容器的子元素的 margin-bottom 或者宽度定死的子元素的 margin-right 的
定位“失效”。
我们先看例子：
<div class="box"> 
 <div class="child"></div> 
</div> 
.box { 
 height: 100px; 
} 
.child { 
 height: 80px; 
 margin-bottom: 100px; 
} 
这里，margin-bottom:100px 是不会在容器底部形成 100px 的外间距的，看上去就像是“失
效”一样，同样的 HTML，CSS 代码如下：
.box { 
 width: 100px;
} 
.child { 
 width: 80px; 
 margin-right: 100px; 
} 
此时，margin-right:100px 对元素的定位也没有任何影响，给人“无效”的感觉，实际上，
这个现象的本质和上面绝对定位元素非对立方位 margin 值“无效”类似。原因在于，若想使
用 margin 属性改变自身的位置，必须是和当前元素定位方向一样的 margin 属性才可以，否
则，margin 只能影响后面的元素或者父元素。
例如，一个普通元素，在默认流下，其定位方向是左侧以及上方，此时只有 margin-left
和 margin-top 可以影响元素的定位。但是，如果通过一些属性改变了定位方向，如
float:right 或者绝对定位元素的 right 右侧定位，则反过来 margin-right 可以影响元
素的定位，margin-left 只能影响兄弟元素。
在本例中，父容器只有一个子元素，因此没有影响兄弟元素的说法，加上要么定宽要么定
高，右侧和底部无 margin 重叠，因此外部的元素也不会有任何布局上的影响，因此就给人“无
效”的错觉，实际上是 margin 自身的特性导致，有渲染只是你看不到变化而已。
（6）鞭长莫及导致的 margin 无效。我们直接看下面这个例子：
<div class="margin-div6"> 
  <img /> 
  <p>内容</p>
</div> 
.margin-div6 img { 
 float: left; 
 width: 200px; 
} 
.margin-div6 p { 
 overflow: hidden; 
 margin-left: 100px; 
} 
其中的 margin-left:100px 是无效的，准确地讲，此时的<p>的 margin-left 从负无穷到
200px 都是没有任何效果的。要解释这里为何会无效，需要对 float 和 overflow 深入理解。

为什么呢？首先，我们需要了解两个和 float 相关的术语，
一是“浮动锚点”（float anchor），二是“浮动参考”（float reference）。
• 浮动锚点是 float 元素所在的“流”中的一个点，这个点本身并不浮动，就表现而言
更像一个没有 margin、border 和 padding 的空的内联元素。
• 浮动参考指的是浮动元素对齐参考的实体。
在 CSS 世界中，float 元素的“浮动参考”是“行框盒子”，也就是 float 元素在当前
“行框盒子”内定位。再强调一遍，是“行框盒子”，不是外面的包含块盒子之类的东西，因为
CSS 浮动设计的初衷仅仅是实现文字环绕效果。
“浮动锚点”这个术语名称本身很具有欺骗性，
看上去应该与 float 的定位位置有关，实际上关系浅薄，在我看来，其作用就是产生“行框盒
子”，因为“浮动锚点”表现如同一个空的内联元素，有内联元素自然就有“行框盒子”，于是，
float 元素对齐的参考实体“行框盒子”对于块状元素也同样适用了，只不过这个“行框盒子”
由于没有任何内容，所以无尺寸，看不见也摸不着罢了。
（7）内联特性导致的 margin 无效。我们直接看下面这个例子：
<div class="margin-div7"> 
 <img > 
</div> 
.margin-div7 img { 
 height: 96px; 
 margin-top: -200px; 
} 
这里的例子也很有代表性。一个容器里面有一个图片，然后这张图片设置 margin-top
负值，让图片上偏移。但是，随着我们的负值越来越负，结果达到某一个具体负值的时候，图
片不再往上偏移了。比方说，本例 margin-top 设置的是-200px，如果此时把 margin-top
设置成-300px，图片会再往上偏移 100px 吗？不会！它会微丝不动，margin-top 变得无效
了。要解释这里为何会无效，需要对 vertical-align 和内联盒模型有深入的理解。这里大家先记住
有这么一个 margin 失效的场景即可。


此时，按照理解，-200px 远远超过图片的高度，图片应该完全跑到容器的外面，但是，
图片依然有部分在.margin-div7 元素中，而且就算 margin-top 设置成-99999px，图片也不会继续
往上移动，完全失效。其原理和上面图片底部留有间隙实际上是一样的，图片的前面有个“幽
灵空白节点”，而在 CSS 世界中，非主动触发位移的内联元素是不可能跑到计算容器外面的，
导致图片的位置被“幽灵空白节点”的 vertical-align:baseline 给限死了。
案例：https://codepen.io/billscofield/pen/GBeoJr/ 
```
## BFC
## 关于 height:100%
* <a href="/css/demo/height.html" target="_blank">demo</a>
```html
height 和 width 还有一个比较明显的区别就是对百分比单位的支持。对于 width 属性，
就算父元素 width 为 auto，其百分比值也是支持的；但是，对于 height 属性，如果父元素
height 为 auto，只要子元素在文档流中，其百分比值完全就被忽略了。例如，某小白想要在
页面插入一个'<div>'，然后满屏显示背景图，就写了如下 CSS：

.height-div1 {
    height: 100%;
    width: 100%;
    background-color: #ccc;
  }

然后他发现这个<div>高度永远是 0，哪怕其父级<body>塞满了内容也是如此。事实上，他需
要如下设置才行：
html, body { 
 height: 100%; 
} 
并且仅仅设置<body>也是不行的，因为此时的<body>也没有具体的高度值：
body { 
 /* 子元素 height:100%依旧无效 */ 
} 
只要经过一定的实践，我们都会发现对于普通文档流中的元素，百分比高度值要想起作用，
其父级必须有一个可以生效的高度值！但是，怕是很少有人思考过这样一个问题：为何父级没
有具体高度值的时候，height:100%会无效？
```
### 为何 height:100%无效
```html
有一种看似合理的说法：如果父元素 height:auto 子元素还支持 height:100%，则
父元素的高度很容易陷入死循环，高度无限。例如，一个 <div>元素里面有一张
vertical-align 为 bottom 同时高度为 192 像素的图片，此时，该<div>高度就是 192
像素，假设此时插入一个子元素，高度设为 100%，如果此时 height:100%可以计算，则
子元素应该也是 192 像素。但是，父元素 height 值是 auto，岂不是现在高度要从原来的
192 像素变成 384 像素，然后 height:100%的子元素高度又要变成 384 像素，父元素高度
又双倍……死循环了！
实际上，这种解释是错误的，大家千万别被误导。证据就是宽度也存在类似场景，但并没
有死循环。例如，在下面这个例子中，父元素采用“最大宽度”，然后有一个 inline-block
子元素宽度 100%：
  .height-div2 {
    display: inline-block;
    white-space: nowrap;
    background-color: #cd0000;
  }

  .height-div2 .text {
    display: inline-block;
    width: 100%;
    background-color: #34538b;
    color: #fff;
  }

  <div class="height-div2">
    <img src="/img/img1.jpg">
    <span class="text">红色背景是父级 document.body.clientWidth</span>
  </div>
如果按照上面“高度死循环”的解释，这里也应该“宽度死循环”，因为后面的 inline-block
元素按照我们的理解应该会让父元素的宽度进一步变大。但实际上并没有，宽度范围可能超出
你的预期。宽度就是图片加文字内容的宽度。
为什么会这样表现呢？
要明白其中的原因要先了解浏览器渲染的基本原理。首先，先下载文档内容，加载头部的
样式资源（如果有的话），然后按照从上而下、自外而内的顺序渲染 DOM 内容。套用本例就是，
先渲染父元素，后渲染子元素，是有先后顺序的。因此，当渲染到父元素的时候，子元素的
width:100%并没有渲染，宽度就是图片加文字内容的宽度；等渲染到文字这个子元素的时候，
父元素宽度已经固定，此时的 width:100%就是已经固定好的父元素的宽度。宽度不够怎么
办？溢出就好了，overflow 属性就是为此而生的。
同样的道理，如果 height 支持任意元素 100%，也是不会死循环的。和宽度类似，静态
渲染，一次到位。
那问题又来了：为何宽度支持，高度就不支持呢？规范中其实给出了答案。如果包含
块的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为
auto。一句话总结就是：因为解释成了 auto。要知道，auto 和百分比计算，肯定是算
不了的：
'auto' * 100/100 = NaN 
但是，宽度的解释却是：如果包含块的宽度取决于该元素的宽度，那么产生的布局在 CSS 2.1
中是未定义的。
这里的宽度布局其实也是“未定义行为”，
也就是规范没有明确表示该怎样，浏览器可以自己根据理解去发挥。常见的浏览器中的测试，布局
效果在各个浏览器下都是一致的。这里和高度的规范定义就区别明显了，高度明确了就是 auto，
高度百分比计算自然无果，width 却没有这样的说法，因此，就按照包含块真实的计算值作为
百分比计算的基数。
```
### 如何让元素支持 height:100%效果 
```html
如何让元素支持 height:100%效果？这个问题的答案其实上面的规范已经给出了，即有
两种方法。
（1）设定显式的高度值。这个没什么好说的，例如，设置 height:600px，或者可以生效
的百分比值高度。例如，我们比较常见的：
html, body { 
 height: 100%; 
} 
（2）使用绝对定位。例如：
div { 
 height: 100%; 
 position: absolute; 
} 
此时的 height:100%就会有计算值，即使祖先元素的 height 计算为 auto 也是如此。
需要注意的是，绝对定位元素的百分比计算和非绝对定位元素的百分比计算是有区别的，区别
在于绝对定位的宽高百分比计算是相对于 padding box 的，也就是说会把 padding 大小值计算
在内，但是，非绝对定位元素则是相对于 content box 计算的。
我们可以看一个例子，对比一下：
.box { 
 height: 160px; 
 padding: 30px; 
 box-sizing: border-box; 
 background-color: #beceeb; 
} 
.child { 
 height: 100%; 
 background-color: #cd0000; 
} 
.box { 
 height: 160px; 
 padding: 30px; 
 box-sizing: border-box; 
 background-color: #beceeb; 
 position: relative; 
} 
.child { 
 height: 100%; width: 100%; 
 background-color: #cd0000; 
 position: absolute; 
} 
可以看到，非定位元素的宽高百分比计算不会将 padding 计算在内。
我对这两种 height:100%生效方法的评价是：显式高度方法中规中矩，意料之中；绝对定
位方法剑走偏锋，支持隐式高度计算，给人意外之喜，但本身脱离文档流，使其仅在某些场景有
四两拨千斤的效果，比方说“图片左右半区点击分别上一张图下一张图效果”的布局。

原理很简单，就是在图片外面包一层具有“包裹性”同时具有定位特性的标签。例如：
.box { 
 display: inline-block; 
 position: relative; 
} 
此时，只要在图片上覆盖两个绝对定位，同时设 height:100%，则无论图片多高，我们的左
右半区都能自动和图片高度一模一样，无须任何使用 JavaScript 的计算。
```
## vertical-align
## float
## 1px问题
### 像素比 dpi
### 马赛克
### 手机像素显示问题
