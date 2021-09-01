<template>
  <div class="cart">
    <nav-bar class="cartNavbar">
      <div slot="center-slot">
        购物车({{ $store.state.addCartList.length }})
      </div>
    </nav-bar>
    <cart-goods></cart-goods>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartBottomBar from "./childCart/CartBottomBar.vue";
import CartGoods from "./childCart/CartGoods.vue";
export default {
  components: {
    NavBar,
    CartBottomBar,
    CartGoods,
  },
  name: "Cart",
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.cartNavbar {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>