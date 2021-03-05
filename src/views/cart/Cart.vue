<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
      <cart-list></cart-list>
    

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/nav-bar/NavBar"
import CartList from './childcpn/CartList.vue'
import CartBottomBar from './childcpn/CartBottomBar.vue'


// 将getters中的东西转换为更方便使用的计算属性
import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed:{
      // 将getters中的东西转换为更方便使用的计算属性
      ...mapGetters(['cartLength'])
    }
  }

</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
  }

</style>
