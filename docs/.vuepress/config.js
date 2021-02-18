module.exports = {
  title: '文档',
  description: '总结',
  theme: '@vuepress/theme-default',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/module/' },
      { text: '搜索', link: 'https://baidu.com' },
    ],
    sidebar: {
      '/module/': [
        '',
        ['one', '123'],
        ['two', '345']
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