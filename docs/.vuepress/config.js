module.exports = {
  title: '文档',
  description: '总结',
  dest: "public",
  theme: '@vuepress/theme-default',
  plugins: [
    'leo-demo-block'
  ],
  css: {
    includePaths: ["./public/styles/commons.css"]
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/module/' },
      { text: 'css兼容问题', link: '/css/' },
      { text: '搜索', link: 'https://baidu.com' },
    ],
    sidebar: {
      '/module/': [
        '',
        ['one', 'one'],
        ['two', 'two']
      ],

      '/css/': [
        '',
        ['one', '图形效果'],
        ['two', '趋势']
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}