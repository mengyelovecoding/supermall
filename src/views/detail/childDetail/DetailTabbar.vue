<template>
  <div class="detail-tabbar">
    <div class="tabbar-left">
      <div>
        <img src="~assets/img/detailTabbar/客服.svg" alt="" />
        <div class="text">客服</div>
      </div>
      <div>
        <img src="~assets/img/detailTabbar/店铺.svg" alt="" />
        <div class="text">店铺</div>
      </div>
      <div>
        <img src="~assets/img/detailTabbar/收藏.svg" alt="" />
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="tabbar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "DetailTabbar",
  methods: {
    // 自定义事件
    addToCart() {
      this.$emit("addToCart"), this.$emit("showSuccessCart");
    },
  },
};
</script>
<style scoped>
.detail-tabbar {
  display: flex;
}
.tabbar-left {
  display: flex;
  width: 55%;
  text-align: center;
}
.tabbar-left div {
  flex: 1;
}
.tabbar-left img {
  width: 22px;
  height: 22px;
  margin-top: 6px;
}
.text {
  font-size: 13px;
}
.tabbar-right {
  flex: 1;
  display: flex;
}
.tabbar-right div {
  flex: 1;
  font-size: 15px;
  text-align: center;
  line-height: 58px;
}
.cart {
  background-color: #ffe817;
  color: #333;
}
.buy {
  background-color: #f69;
  color: seashell;
}
</style>