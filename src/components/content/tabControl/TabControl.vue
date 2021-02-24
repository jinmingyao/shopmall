<template>
  <div class="tab-control">
    <!-- 选项卡控制组件 -->
    <div v-for="(item, index) in titles" 
        :key="index" 
        class="tabcontrol-item" 
        :class="{active:index === currentIndex}"
        @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  // 从父组件获取信息
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 记录当前状态谁被选中
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      // 将子组件发生的点击事件传递出去
      this.$emit('tabClick',index)
    }
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  
}
.tabcontrol-item {
  flex: 1;
}
.tabcontrol-item span{
  padding: 5px;
}

/* 被选中时的样式设计 */
.active{
  color: var(--color-high-text);
  
}
.active span{
  border-bottom: 3px solid var(--color-tint);
}
</style>