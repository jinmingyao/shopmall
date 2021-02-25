<template>
  <div>
    <!-- 轮播图代码部分 -->
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// 导入轮播图
import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name:"HomeSwiper",
    data() {
      return {
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    // 从父组件home.vue请求数据
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad');
          this.isLoad = true;
        }
      }
    },
  }
</script>

<style scoped>

</style>