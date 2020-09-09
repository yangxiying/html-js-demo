module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  presets: ['@vue/app'],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  // plugins: [
  //   [
  //     'import',
  //     {
  //       libraryName: 'vant',
  //       libraryDirectory: 'es',
  //       // 指定样式路径
  //       style: (name) => `${name}/style/less`,
  //     },
  //     'vant',
  //   ],
  // ],
}
