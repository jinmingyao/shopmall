<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <!-- 商品标题 -->
      <p>
        {{goodsItem.title}}
      </p>
      <!-- 商品价格和star -->
      <span class="price">
        {{goodsItem.price}}
      </span>
      <span class="collect">
        {{goodsItem.cfav}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name:"GoodsListItem",
    // 从goodslist获取item对象
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      //原生js监听图片是否加载完成
      imageLoad(){

        this.$bus.$emit('itemImageLoad');


        // // 判断事件是否发生在首页
        // if(this.$route.path.indexOf('/home') !== -1){
        //   // 发送事件到bus总线 在home首页监听
        //   this.$bus.$emit('homeitemImageLoad');
        // }
        // else if(this.$route.path.indexOf('/detail') !== -1){
        //   this.$bus.$emit('detailitemImageLoad');
        // }
        
      },

      // 点击跳转详情页
      itemClick(){
        // console.log('pp')
        this.$router.push('./detail/'+ this.goodsItem.iid)
      }
    },
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;

    width:48%;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>