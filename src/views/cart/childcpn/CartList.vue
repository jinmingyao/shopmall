<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>


  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

  export default {
    name:"CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll?.refresh();
    },
  }
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 35px);
}
  /* .content{
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
    overflow: hidden;
  } */

  .content {
  height: 100%;
  overflow: hidden;
}
</style>