<template>
  <div>
    <!-- 轮播图代码部分 -->
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
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
    }
  }
</script>

<style scoped>

</style>