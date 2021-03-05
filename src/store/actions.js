export default {
  addCart(context,payload){
    return new Promise((reslove,reject) => {
      // 1.查找之前数组中是否有该商品
      //数组find()方法
      let oldProduct = context.state.cartList.find(function(item){
        return item.iid === payload.iid
      })

      // 2.判断oldProduct是否有值
      if(oldProduct){
        // oldProduct.count += 1;
        context.commit('addCount',oldProduct)
        reslove('当前商品数量+1')
      }else {
        payload.count = 1;
        // payload.checked = true;
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        reslove('添加了新的商品')
      }
    })
  }
}