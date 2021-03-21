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
```html
抛开 inherit 这类全局属性值不谈，我把 vertical-align 属性值分为以下 4 类：
• 线类，如 baseline（默认值）、top、middle、bottom； 
• 文本类，如 text-top、text-bottom； 
• 上标下标类，如 sub、super； 
• 数值百分比类，如 20px、2em、20%等。
实际上，“数值百分比类”应该是两类，分别是“数值类”和“百分比类”，这里之所以把
它们合在一起归为一类，是因为它们有不少共性，包括“都带数字”和“行为表现一致”。
```
* <a href="/css/demo/vertical-align.html" target="_blank">demo</a>

### vertical-align 作用的前提
```html
因为 vertical-align 起作用是有前提条件的，这个前提条件就是：只能应用于内联元
素以及 display 值为 table-cell 的元素。
换句话说，vertical-align 属性只能作用在 display 计算值为 inline、inlineblock，inline-table 或 table-cell 的元素上。因此，默认情况下，<span>、<strong>、
<em>等内联元素，<img>、<button>、<input>等替换元素，非 HTML 规范的自定义标签
元素，以及<td>单元格，都是支持 vertical-align 属性的，其他块级元素则不支持。
当然，现实世界是没有这么简单的。CSS 世界中，有一些 CSS 属性值会在背后默默
地改变元素 display 属性的计算值，从而导致 vertical-align 不起作用。比方说，
浮动和绝对定位会让元素块状化，因此，下面的代码组合 vertical-align 是没有理由
出现的：
有一些 CSS 属性值会在背后默默
地改变元素 display 属性的计算值，从而导致 vertical-align 不起作用。比方说，
浮动和绝对定位会让元素块状化，因此，下面的代码组合 vertical-align 是没有理由
出现的：
.example { 
 float: left; 
 vertical-align: middle; /* 没有作用 */ 
} 
.example { 
 position: absolute; 
 vertical-align: middle; /* 没有作用 */ 
}

我好像听到有人说：“不是 vertical-align 没有作用，而是下面这种情况。”

<style>
    .vertical-div2 { 
      height: 128px; 
    } 
    .vertical-div2 img { 
      height: 96px; 
      vertical-align: middle; 
    }
  </style>
  <h2>场景二</h2>
  <div class="vertical-div2">
    
    <img src="/img/img1.jpg">
  </div>
此时图片顶着.ertical-div2 元素的上边缘显示，根本没垂直居中，完全没起作用！
这种情况看上去是 vertical-align:middle 没起作用，实际上，vertical-align
是在努力地渲染的，只是行框盒子前面的“幽灵空白节点”高度太小，如果我们通过设置一个
足够大的行高让“幽灵空白节点”高度足够，就会看到 vertical-align:middle 起作用了，
CSS 代码如下：

.vertical-div2 { 
  height: 128px;
  line-height: 128px; /* 关键 CSS 属性 */ 
} 
.vertical-div2 img { 
  height: 96px; 
  vertical-align: middle; 
}
```

### vertical-align 和 line-height 之间的关系

```html
vertical-align 和 line-height 之间的关系很明确，即“朋友”关系。
最明显的就是 vertical-align 的百分比值是相对于 line-height 计算的，但表面所
见的这点关系实际是只是冰山一角，实际是只要出现内联元素，这对好朋友一定会同时出现。？这就
是这对好朋友搞的鬼。这里要为大家深入讲解一下为什么会出现这样的现象。首先，我们仔细
看一下相关的代码：
<style>
    .vertical-div3 {
      line-height: 32px;
    }

    .vertical-div3 span {
      font-size: 24px;
    }
  </style>
  <h2>场景三 </h2>
  <div class="vertical-div3">
    x<span>文字 x</span>
  </div>
其中有一个很关键的点，那就是 24px 的 font-size 大小是设置在<span>元素上的，这就导
致了外部<div>元素的字体大小和<span>元素有较大出入。
这里也是类似的，<span>标签前面实际上有一个看不见的类似
字符的“幽灵空白节点”。看不见的东西不利于理解，因此我们不妨使用一个看得见的字符 x
占位，同时“文字”后面也添加一个 x，便于看出基线位置，于是就有如下 HTML：

<div class="vertical-div3">
  x<span>文字 x</span>
</div>
此时，我们可以明显看到两处大小完全不同的文字。一处是字母 x 构成了一个“匿名内联
盒子”，另一处是“文字 x”所在的<span>元素，构成了一个“内联盒子”。由于都受 lineheight:32px 影响，因此，这两个“内联盒子”的高度都是 32px。下面关键的来了，对字符
而言，font-size 越大字符的基线位置越往下，因为文字默认全部都是基线对齐，所以当字
号大小不一样的两个文字在一起的时候，彼此就会发生上下位移，如果位移距离足够大，就会
超过行高的限制，而导致出现意料之外的高度。

非常直观地说明了为何最后容器的高度会是 36px，而非 line-height 设置的
32px。


知道了问题发生的原因，那问题就很好解决了。我们可以让“幽灵空白节点”和后面<span>
元素字号一样大，也就是：
.vertical-div4 {
  line-height: 32px; 
  font-size: 24px; 
}

.vertical-div4 span {
  font-size: 24px;
}
或者改变垂直对齐方式，如顶部对齐，这样就不会有参差位移了：
.vertical-div4 { line-height: 32px; } 
.vertical-div4 span { 
 font-size: 24px; 
 vertical-align: top; 
} 
搞清楚了大小字号文字的高度问题，对更为常见的图片底部留有间隙的问题的理解就容易
多了。现象是这样的：任意一个块级元素，里面若有图片，则块级元素高度基本上都要比图片
的高度高。例如：
  <style>
    .vertical-div5 {
      width: 280px;
      outline: 1px solid #aaa;
      text-align: center;
    }

    .vertical-div5 img {
      height: 96px;
    }
  </style>
  <h2>场景五 </h2>
  <div class="vertical-div5">
    <img src="/img/img1.jpg">
  </div>
结果.vertical-div5 ，底部平白无故多了 4 像素。
间隙产生的三大元凶就是“幽灵空白节点”、line-height 和 vertical-align 属性。
为了直观演示原理，我们可以在图片前面辅助一个字符 x 代替“幽灵空白节点”，并想办法通过
背景色显示其行高范围

当前 line-height 计算值是 20px，而 font-size 只有 14px，因此，字母 x 往下一定
有至少 3px 的半行间距（具体大小与字体有关），而图片作为替换元素其基线是自身的下边缘。
根据定义，默认和基线（也就是这里字母 x 的下边缘）对齐，字母 x 往下的行高产生的多余的
间隙就嫁祸到图片下面，让人以为是图片产生的间隙，实际上，是“幽灵空白节点”、
line-height 和 vertical-align 属性共同作用的结果。


知道了原理，要清除该间隙，就知道如何对症下药了。方法很多，具体如下。
（1）图片块状化。可以一口气干掉“幽灵空白节点”、line-height 和 verticalalign。 
（2）容器 line-height 足够小。只要半行间距小到字母 x 的下边缘位置或者再往上，自
然就没有了撑开底部间隙高度空间了。比方说，容器设置 line-height:0。 
（3）容器 font-size 足够小。此方法要想生效，需要容器的 line-height 属性值和当
前 font-size 相关，如 line-height:1.5 或者 line-height:150%之类；否则只会让下
面的间隙变得更大，因为基线位置因字符 x 变小而往上升了。
（4）图片设置其他 vertical-align 属性值。间隙的产生原因之一就
是基线对齐，所以我们设置 vertical-align 的值为 top、middle、
bottom 中的任意一个都是可以的。
```


## line-height
* 内联元素的基石 line-height 下面中所有的“行高”指的就是 line-height。
* <a href="/css/demo/line-height.html" target="_blank">demo</a>
```js
<script type="text/javascript">
  var style = document.body.currentStyle || document.defaultView.getComputedStyle(document.body, '')
  console.log(style.fontSize);
  var div = document.getElementById('div');
  console.log(div.style.fontSize);
</script>
```
### 内联元素的高度之本 -- 基础高度

* <a href="https://img-blog.csdnimg.cn/20201014225605688.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1MxMTIyX2hx,size_16,color_FFFFFF,t_70#pic_center" target="_blank">行距班行距说明</a>
```html
先思考下面这个问题：默认空<div>高度是 0，但是一旦里面写上几个文字，<div>高度
就有了，请问这个高度由何而来，或者说是由哪个 CSS 属性决定的？
如果仅仅通过表象来确认，估计不少人会认为<div>高度是由里面的文字撑开的，也就是
font-size 决定的，但本质上是由 line-height 属性全权决定的，尽管某些场景确实与
font-size 大小有关。
我们不妨设计一个简单的例子来看看真相究竟是什么。例如：
<div class="test1">我的高度是？</div> 
.test1 { 
 font-size: 16px; 
 line-height: 0; 
 border: 1px solid #ccc; 
 background: #eee; 
} 
和
<div class="test2">我的高度是？</div> 
.test1 { 
 font-size: 0; 
 line-height: 16px; 
 border: 1px solid #ccc; 
 background: #eee; 
} 
这两段代码的区别在于一个 line-height 行高为 0，一个 font-size 字号为 0。结果，第
一段代码，最后元素的高度只剩下边框那么丁点儿，而后面
一段代码，虽然文字小到都看不见了，但是 16px 的内部高度依然坚挺.
很显然，从上面这个例子可以看出，<div>高度是由行
高决定的，而非文字。

对于文本这样的纯内联元素，line-height 就是高度计算的
基石，用专业说法就是指定了用来计算行框盒子高度的基础高度。比方说，line-height 设为
16px，则一行文字高度是 16px，两行就是 32px，三行就是 48px，所有浏览器渲染解析都是
这个值，1 像素都不差。

如果是块级元素，line-height 在其中又扮演什么角色呢？
在回答这个问题之前，我们最好先把 line-height 作用于内联元素的细节给搞明白。
通常，line-height 的高度作用细节都是使用“行距”和“半行距”来解释的。那么什
么是“行距”，什么又是“半行距”呢？

首先大家需要明确这一点：字体设计以及文字排版是门很深入的学问，英文和中文又有很
多不同之处，但是，我们平常构建页面无须如此事无巨细的知识。因此，这里只简单介绍部分
知识.
我个人是这么认为的：内联元素的高度由固定高度和不固定高度组成，这个不固定的部
分就是这里的“行距”。换句话说，line-height 之所以起作用，就是通过改变“行距”来
实现的。

中国古代四大发明之一的活字印刷术使用的是雕刻好的胶泥字模，大家可以回忆一下北
京奥运会开幕式上活字印刷术表演中那些凸起的方块，它使用的字体是宋体，注意，是宋体。
然而，如果这些方块都是密密麻麻无缝隙铺在一起，印出来的文字就是方方正正的一团，
那么我们会无法一眼看出应该横着读还是竖着念。要知道古人的排版是竖排的，但我们去看古人的印刷
作品却不会错误地横着看，为什么呢？因为印出来的文字垂直方向确实一个接着一个，但是，水
平方向，列与列之间却有着明显的间隙, 这个间隙其实就是“行距”。
所以，“行距”的作用是可以瞬间明确我们的阅读方向，让我们阅读文字更轻松。在 CSS 世
界中，“行距”其实也是类似的东西，但还是有些差别的。以水平阅读流举例，传统印刷的“行距”
是上下两行文字之间预留的间隙，是个独立的区域，也就意味着第一行文字的上方是没有“行距”
的；但是在 CSS 中，“行距”分散在当前文字的上方和下方，也就是即使是第一行文字，其上方也
是有“行距”的，只不过这个“行距”的高度仅仅是完整“行距”高度的一半，因此，也被称为“半
行距”。

设计图和实际开发中有可能会遇到的问题。设计师并不是开发人员，他们并没有把网页中无处不
在行间距考虑在内，所有与文字相关的间距都是从文字的上边缘和下边缘开始标注的。除非我
们全局行高设置为 line-height:1，否则这些标注的距离和我们使用的 margin 间距都是不
一致的

```

### line-height 可以让内联元素“垂直居中”

```html
坊间流传着这么一种说法：“要想让单行文字垂直居中，只要设置 line-height 大小和
height 高度一样就可以了。”类似下面这样的代码：
.title { 
 height: 24px; 
 line-height: 24px; 
} 
从效果上看，似乎验证了这种说法的正确性。但是，实际上，上面的说法对 CSS 初学者会产生
两个严重的误导，同时，语句本身也存在不严谨的地方！
行高控制文字垂直居中，不仅适用于单行，多行也是可以的。准确的说法应该是
“line-height 可以让单行或多行元素近似垂直居中”。这里有个词似乎和上面的表述
有点儿微妙的差异，“近似垂直居中”？没错，一定要加上“近似”二字，这样的说法才足够严
谨。换句话说，我们通过 line-height 设置的垂直居中，并不是真正意义上的垂直居中！究
竟是怎么一回事？
这里，其实要解答的是两个问题，一个是为何可以“垂直居中”，另一个是为何是“近似”。
行高可以实现“垂直居中”原因在于 CSS 中“行距的上下等分机制”，如果行距的添加规则是在文字的上方或者下方，
则行高是无法让文字垂直居中的。
说“近似”是因为文字字形的垂直中线位置普遍要比真正的“行框盒子”的垂直中线位置
低，譬如我们拿现在用得比较多的微软雅黑字体举例：
<style>
    .line-div2 {
      font-size: 80px; 
      line-height: 120px; 
      background-color: #666; 
      font-family: 'microsoft yahei'; 
      color: #fff;
    }

  </style>
  <h2>场景二 </h2>
  <p class="line-div2">微软雅黑</p>
由于我们平时使用的 font-size 都比较小，12px～16px 很多，因此，虽然微软雅黑字
体有下沉，但也就 1 像素的样子，所以我们往往觉察不到
这种“垂直对齐”其实并不是真正意义上的垂直居中，只
是感官上看上去像是垂直居中罢了。这也是我总是称
line-height 实现的单行文本垂直居中为“近似垂直居
中”的原因。

```
### 案例
```html
  <style>
    .line-div3 {
      line-height: 96px;
    }

    .line-div3 span {
      line-height: 20px;
    }

    .line-div3-1 {
      line-height: 20px;
    }

    .line-div3-1 span {
      line-height: 96px;
    }
  </style>
  <h2>场景三 </h2>
  <div class="line-div3"> 
    <span>内容...</span> 
  </div>
  <div class="line-div3-1"> 
    <span>内容...</span> 
  </div>
```

## float
## 1px问题
### 像素比 dpi
### 马赛克
### 手机像素显示问题
