<template>
  <div class="shop-info" v-if="Object.keys(shop).length !== 0">
		<!-- 店铺名和logo -->
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{ shop.name }}</span>
      <div class="enter-shop">进店逛逛</div>

    </div>

    <div class="shop-middle">

			<!-- 左侧 -->
      <div class="middle-item middle-left">
				<!-- 销量 -->
        <div class="info-sells">
          <div class="count">{{ shop.sells | saveNum }}</div>
          <div class="text">总销量</div>
        </div>
				<!-- 商品数目 -->
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>

			<!-- 右侧 -->
      <div class="middle-item middle-right">
				<table>
					<tr v-for="(item, index) in shop.score" :key="index">
          	<td>{{ item.name }}</td>
          	<td class="score" :class="{ 'isscore': item.isBetter }">{{item.score}}</td>
          	<td class="better" :class="{ 'isbetter': item.isBetter }"><span>{{item.isBetter ? "高" : "低"}}</span></td>
        	</tr>
				</table>
        
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  filters: {
    saveNum(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info{
	padding: 25px 8px;
	border-bottom: 5px solid #f2f5f8;
}
.shop-top{
	line-height: 45px;
	display: flex;

	align-items: center;
}
.shop-top img{
	width: 45px;
	height: 45px;
	border-radius: 50%;
	border: 1px solid rgba(0,0,0,.1);
}
.shop-top .title{
	margin-left: 10px;
	vertical-align: center;
}
.enter-shop {
  display: inline-block;
  background-color: #f2f2f2;
  font-size: 12px;
  padding: 6px 30px;
  border-radius: 100px;
  margin: 10px 10px 10px auto;
}

.shop-middle{
	margin-top: 15px;
	display: flex;
	align-items: center;
}

.middle-item{
	flex: 1;
}

.middle-left{
	display: flex;
	justify-content: space-evenly;
	color: #333;
	text-align: center;
	border-right: 1px solid rgba(0,0,0,.1);
}

.count,.goods-count{
	font-size: 18px;
}
.text,.goods-text{
	margin-top: 10px;
	font-size: 12px;
}

.middle-right{
	font-size: 13px;
	color: #333;
}
.middle-right table{
	width: 120px;
	margin-left: 30px;
}
.middle-right table td{
	padding: 5px 0;
}
.middle-right .score{
	color: #5ea732;
}
.middle-right .isscore{
	color: #f13e3a;
}
.middle-right .better span{
	background-color: #5ea732;
	color: #fff;
	text-align: center;
}
.middle-right .isbetter span{
	background-color: #f13e3a;
}



</style>
