module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      // 1.视窗的宽度，对应设计稿的宽度
      viewportWidth:375,
      // 2.视窗的高度，可以不配置
      viewportHeight:667,
      // 3.指定px转换为视窗单位值的小数位数
      unitPrecision:5,
      // 4.指定需要转换成的视窗单位，建议使用vw
      viewportUnit:'vw',
      // 5.指定不需要转换的类
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],
      // 6.小于或者等于1px不转换为视窗单位
      minPixelValue:1,
      // 7.允许在媒体查询中转换px
      mediaQuery:false
    }
  }
}