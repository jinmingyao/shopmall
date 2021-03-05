<template>
  <div class="check-btn" :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">

  </div>
</template>

<script>
  export default {
    name:"CheckButton",
    props:{
      // 是否是选中状态
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  .check-btn{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .active{
    border-color: red;
    background-color: orangered;

  }
</style>