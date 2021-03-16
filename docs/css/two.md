# 前端案例
## 创意特效
* [demo](/css/demo/css.html)
* <a href="https://www.cnblogs.com/moqiutao/p/10547330.html" target="_blank">demo</a>
## 案例
* <a href="https://www.html.cn/tool/css-clip-path/" target="_blank">demo</a>
::: demo
```html
<template>
  <div class="box-vue">
    <img id="clipped" src="https://mdn.mozillademos.org/files/12668/MDN.svg"
    alt="MDN logo">
    <svg height="0" width="0">
      <defs>
        <clipPath id="cross">
          <rect y="110" x="137" width="90" height="90"/>
          <rect x="0" y="110" width="90" height="90"/>
          <rect x="137" y="0" width="90" height="90"/>
          <rect x="0" y="0" width="90" height="90"/>
        </clipPath>
      </defs>
    </svg>

    <!-- <select id="clipPath">
      <option value="none">none</option>
      <option value="circle(100px at 110px 100px)" selected>circle</option>
      <option value="url(#cross)" >cross</option>
      <option value="inset(20px round 20px)">inset</option>
      <option value="path('M 0 200 L 0,110 A 110,90 0,0,1 240,100 L 200 340 z')">path</option>
    </select> -->
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
#clipped {
  margin-bottom: 20px;
  clip-path: url(#cross);
}
</style>
```
:::
