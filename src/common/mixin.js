import {debounce} from 'common/utils'


export const itemListenerMixin = {
  data() {
    return {
      itemListener:null
    }
  },
  mounted() {
    // 1.图片是否加载完成的事件监听
    const funRefresh = this.$refs.scroll?.refresh;
    const refresh = debounce(funRefresh,200);

    this.itemListener = () => {
      // console.log('----')
      // 加问好，先判断scroll是否已经加载完成，在执行后续操作
      // 封装一个函数 在执行refresh之前进行防抖操作
      // this.$refs.scroll?.refresh()
      
      refresh();
    }
    // 监听事件总线
    this.$bus.$on('itemImageLoad',this.itemListener);

    console.log("mixin")
  },
}