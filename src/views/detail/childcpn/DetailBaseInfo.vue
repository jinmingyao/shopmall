<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <div class="n-price">{{ goods.newPrice }}</div>
      <div class="o-price">{{ goods.oldPrice }}</div>
      <div class="discount" v-if="goods.discount">{{ goods.discount }}</div>
    </div>
    <div class="info-other" >
      <div class="divone">{{ goods.columns[0] }}</div>
      <div class="divtwo">{{ goods.columns[1] }}</div>
      <div class="divthree" v-if="goods.services !== undefined">{{ goods.services[goods.services.length - 1].name }}</div>
    </div>
    <div class="info-service"   v-if="goods.services !== undefined">
      <div
        v-for="index in goods.services.length - 1"
        :key="index"
        class="info-service-item"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        {{ goods.services[index - 1].name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.info-title {
  margin: 10px 0;
  padding: 0 4px;
  font-size: 14px;
  line-height: 20px;
}
.info-price {
  display: flex;
  padding: 0 4px 10px;
}
.info-price .n-price {
  color: var(--color-high-text);
}
.info-price .o-price {
  color: #999;
  font-size: 12px;
  margin: 0 4px;
  text-decoration: line-through;
}
.info-price .discount {
  color: #fff;
  font-size: 12px;
  border-radius: 100px;
  padding: 2px 6px;
  background-color: var(--color-high-text);
}
.info-other {
  display: flex;
  color: #999;
  font-size: 12px;
  padding: 10px 4px;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;

}
.info-other div {
  flex: 1;
}
.info-other .divone{
	text-align: left;
}
.info-other .divtwo{
	text-align: center;
}
.info-other .divthree{
	text-align: right;
}
.info-service {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 4px;
  justify-content: space-between;
  border-bottom: 4px solid #ededed;
}
.info-service img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
</style>
