import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'

// 1.安装插件
Vue.use(Vuex);

// 2.创建store对象
const state = {
  cartList:[]
};

const store = new Vuex.Store({
  state,
  //修改store里的东西都需要经过mutations
  // mutations中的每个方法尽可能完成的事件单一一点
  // 唯一的目的就是修改state中的状态
  mutations,
  actions,
})

// 3.挂载到vue实例上
export default store;