<template>
  <div class="bottom-bar">
    <div class="content">
      <check-button  class="check-all" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calClick">
      去结算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
  export default {
    name:"CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue+item.price * item.count
        },0).toFixed(2)
      },
      checkedLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.$store.state.cartList.length === 0){
          return false
        }
        return this.$store.state.cartList.every(item => item.checked)
      }
    },
    methods: {
      checkClick(){
        // console.log('----')
        if(this.isSelectAll){
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
            // this.isSelectAll = false;
          });
        }else{
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
            // this.isSelectAll = true;
          });
        }
      },
      calClick(){
        // if(!this.isSelectAll){
        //   this.$toast.show('请选择购买的商品')
        // }
      }
    },
  }
</script>

<style scoped>
  .bottom-bar{
    height: 35px;
    /* background-color: orange; */
    background-color: #eee;
    position: relative;
    /* bottom: 40px; */
    line-height: 35px;
    display: flex;
    font-size: 14px;
  }
  .content{
    display: flex;
    height: 100%;
    width: 60px;
    margin-left: 10px;
  }
  .check-all{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: auto 0;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>