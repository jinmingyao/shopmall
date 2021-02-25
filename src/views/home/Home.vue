<template>
  <div id="home">
    <!-- 最上方导航栏 -->
    <nav-bar class="home-nav"><div slot="center">shopping street</div></nav-bar>
    <!-- 多放一个tabcontrol制造吸顶效果 -->
    <tab-control :titles="['pop', 'new', 'sell']" @tabClick="tabClick" ref="tabcontrol1" class="tab-control" v-show="isTabFixed"></tab-control>


    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <!-- 轮播图组件插入 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 轮播图下方 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行插件 -->
      <feature></feature>
      <!-- 切换控制 -->
      <tab-control :titles="['pop', 'new', 'sell']" @tabClick="tabClick" ref="tabcontrol"></tab-control>
      <!-- 商品图片展示 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 组件监听点击需要click.native -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
// 子组件中导入
import HomeSwiper from "./childCpn/HomeSwiper";
import RecommendView from "./childCpn/RecommendView";
import Feature from "./childCpn/Feature.vue";
// 公共组件中导入
import NavBar from "components/common/nav-bar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from '../../components/common/scroll/Scroll';
import BackTop from '../../components/content/backTop/BackTop';



// 导入数据
import { getHomeData, getHomeGoods } from "network/home";
import {debounce} from 'common/utils'

// import BScroll from 'better-scroll'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 存储请求过来的数据
      // result:null
      // 1.轮播图
      banners: [],
      // 2.recommend-view
      recommends: [],
      // 3.tabcontrol下方的数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 当前点击类型
      currentType: "pop",
      // 是否显示回到顶部
      isShow:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 调用函数1
    this.getHomeData();
    // 调用函数2
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片是否加载完成的事件监听
    const funRefresh = this.$refs.scroll?.refresh;
    const refresh = debounce(funRefresh,200);
    // 监听事件总线
    this.$bus.$on('itemImageLoad',() => {
      // console.log('----')
      // 加问好，先判断scroll是否已经加载完成，在执行后续操作
      // 封装一个函数 在执行refresh之前进行防抖操作
      // this.$refs.scroll?.refresh()
      
      refresh();
    });
  },
  activated() {
    // console.log(111)
    // 进入页面时
    this.$refs.scroll?.refresh()
    this.$refs.scroll?.scrollTo(0,this.saveY,0);
  },
  deactivated() {
    // console.log(222)
    // 离开页面时
    this.saveY = this.$refs.scroll?.getScrollY()
  },
  methods: {
    // 网络请求相关方法
    getHomeData() {
      //  1.请求多个数据
      getHomeData().then((res) => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 2.请求商品数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then((res) => {
        // console.log(res);
        // 解构赋值
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成向上加载更多
        this.$refs.scroll?.finishPullUp()
      });
    },

    // 事件监听相关方法
    tabClick(index) {
      // index为传进来的默认参数
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // this.currentType = Object.keys(this.goods)[index]
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol.currentIndex = index;
    },

    // 回到顶部
    backClick(){
      // scroll
      this.$refs.scroll?.scrollTo(0,0,2000)
    },

    // 控制回到顶部按钮的位置
    contentScroll(position){
      // 控制backtop是否显示
      this.isShow = (-position.y) > 1000 

      // 决定tabcontrol是否吸顶 position:fixed
      this.isTabFixed = (-position.y) > this.tabOffsetTop 
    },

    // 执行加载更多
    loadMore(){
      // console.log("more")
      this.getHomeGoods(this.currentType);
    },
      
    // 获取tabControl的offSetop
    swiperImageLoad(){
      // 1.
      //   所有组件都有一个$el属性用来获取组件中的元素
      this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop;
    }
    
  },
};
</script>

<style scoped>
#home {
  /* width: 100%;
  height: 820.4px; */
  /* padding-top: 44px; */
  /* padding-bottom: 49px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /*设置顶部导航条  */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 9;
}

.content{
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* 吸顶效果 */
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
