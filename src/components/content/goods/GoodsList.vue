<template>
  <div class="goods">
    <!-- 展示商品图片的小组件 -->
    <!-- {{goods}} -->
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item">
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  // 从home中获取商品数据
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
  
<style scoped>
  .goods {
    display: flex;
    /* 决定一行中显示多少个商品 */
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
    /* z-index: -1; */
  }
</style>