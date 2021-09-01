<template>
  <div>
    <cart-goods-item v-for="item in this.$store.state.addCartList" :goodsItem="item"></cart-goods-item>
  </div>
</template>
<script>
import CartGoodsItem from './CartGoodsItem.vue';
export default {
  components: { CartGoodsItem },
  name: "CartGoods",
};
</script>
<style scoped>
</style>