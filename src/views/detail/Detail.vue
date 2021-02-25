<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childcpn/DetailNavBar'
  export default {
    name:"Detail",
    components:{
      DetailNavBar
    },
    data() {
      return {
        iid:null
      }
    },
    created() {
      // 拿到listitem传过来的id
      this.iid = this.$route.params.iid;
      // console.log(this.iid)
    },
  }
</script>

<style scoped>

</style>