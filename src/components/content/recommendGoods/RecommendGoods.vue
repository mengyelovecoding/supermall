<template>
  <div>
    <slot></slot>
    <div class="recommendGoods">
      <recommend-goods-item
        v-for="item in pop"
        class="forGoods"
        :goodsItem="item"
      />
    </div>
  </div>
</template>
<script>
import RecommendGoodsItem from "./childVue/RecommendGoodsItem.vue";
export default {
  name: "RecommendGoods",
  props: {
    pop: Array,
  },
  components: {
    RecommendGoodsItem,
  },
};
</script>
<style scoped>
.recommendGoods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 4px;
}
</style>