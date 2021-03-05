<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailnav"
    ></detail-nav-bar>
    <!-- 滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--  -->
      <detail-goods-info
        :detail-info="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <!-- 评价 -->
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <!-- 推荐 -->
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <!-- 底部工具栏 -->
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>

    <!-- 组件监听点击需要click.native -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>

    <!-- <toast :message="message" :show="show"></toast> -->

  </div>
</template>

<script>
import DetailNavBar from "./childcpn/DetailNavBar";
import DetailSwiper from "./childcpn/DetailSwiper";
import DetailBaseInfo from "./childcpn/DetailBaseInfo";
import DetailShopInfo from "./childcpn/DetailShopInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childcpn/DetailGoodsInfo.vue";
import DetailParamInfo from "./childcpn/DetailParamInfo.vue";
import DetailCommentInfo from "./childcpn/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailBottomBar from './childcpn/DetailBottomBar.vue';
import BackTop from 'components/content/backTop/BackTop';


import { getDetail, getRecommend, Goods, Shop, Param } from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";


// import Toast from '../../components/common/toast/Toast.vue';


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getthemeTopYs: null,
      currentIndex: 0,
      // 是否显示回到顶部
      isShow:false,

      // message:'',
      // show:false
    };
  },
  mixins: [itemListenerMixin],
  created() {
    // 拿到listitem传过来的iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid)

    // 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品详情信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule);

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      //   // 根据最新的视距 dom已经被渲染出来了
      //   // 但是图片可能还没有加载完成
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      //   console.log(this.themeTopYs)
      // })
    });

    // 根据iid请求推荐数据
    getRecommend().then((res) => {
      // console.log(res)
      this.recommends = res.data.list;
    });

    this.getthemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
    }, 200);
  },
  methods: {
    imgLoad() {
      // 刷新
      this.$refs.scroll?.refresh();

      this.getthemeTopYs();
    },

    titleClick(index) {
      // console.log(-this.themeTopYs[index]);
      this.$refs.scroll?.scrollTo(0, -this.themeTopYs[index], 100);
    },

    contentScroll(position) {
      // console.log(position)
      // 1.获取Y
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      // 2.和theme中的y进行对比
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          // console.log(i);
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex;
        }
      }

      // 3.是否显示回到顶部
      // 控制backtop是否显示
      this.isShow = (-position.y) > 1000 
    },

     // 回到顶部
    backClick(){
      // scroll
      this.$refs.scroll?.scrollTo(0,0,1000)
    },

    // 加入购物车
    addCart(){
      // console.log("-----")
      // 1.获取部分商品信息 展示在购物车中
      const product = {};
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.RealPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      // 调用vuex中actions的addcart方法
      this.$store.dispatch('addCart',product).then(res => {
        // console.log(res);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)

        this.$toast.show(res,2000);
      })
    }
  },
  mounted() {
    // console.log(this.themeTopYs)
  },
  // updated() {
  //   this.themeTopYs = []
  //   //
  //     this.themeTopYs.push(0);
  //     this.themeTopYs.push(this.$refs.param.$el.offsetTop)
  //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

  //     console.log(this.themeTopYs)
  // },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: white;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
/* 两种方式都可以实现在固定区域滚动 */

/* .content{
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
} */
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/* .detail-bot{
  position: relative;
  z-index: 9;
} */

/* .content ul{
  width: 100%;
  z-index: 9;
} */
</style>