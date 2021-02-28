<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <!-- 滚动区域 -->
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images = "topImages"></detail-swiper>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!--  -->
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <!-- 参数信息 -->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- 评价 -->
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <!-- 推荐 -->
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childcpn/DetailNavBar'
import DetailSwiper from './childcpn/DetailSwiper'
import DetailBaseInfo from './childcpn/DetailBaseInfo'
import {getDetail,getRecommend,Goods,Shop,Param} from 'network/detail'
import DetailShopInfo from './childcpn/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailGoodsInfo from './childcpn/DetailGoodsInfo.vue'
import DetailParamInfo from './childcpn/DetailParamInfo.vue'
import DetailCommentInfo from './childcpn/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
  export default {
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
    },
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[]
      }
    },
    created() {
      // 拿到listitem传过来的iid
      this.iid = this.$route.params.iid;
      // console.log(this.iid)

      // 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        // 1.顶部图片轮播数据
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo);

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 4.保存商品详情信息
        this.detailInfo = data.detailInfo;

        // 5.获取参数信息
        this.paramInfo = new Param(data.itemParams.info,data.itemParams.rule);

        // 6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];

        }
      });

      // 根据iid请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list;
      })
    },
    methods: {
      imgLoad(){
        // 刷新
        this.$refs.scroll.refresh()
      }
    },
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color:white;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
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
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>