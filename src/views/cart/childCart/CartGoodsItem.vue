<template>
  <div class="cartGoodsItem" v-model="goodsItem">
    <div class="goodsItemleft" @click="icClick">
      <img :src="img" alt="" class="iconImg" />
    </div>
    <div class="goodsItemCenter">
      <img :src="goodsItem.imgURL" alt="" class="goodsImg" />
    </div>
    <div class="goodsItemRight">
      <div class="goodsTitle">{{ goodsItem.title }}</div>
      <div class="goodsDesc">{{ goodsItem.desc }}</div>
      <div class="goodsPrice">
        <div class="newPrice">{{ "￥" + goodsItem.newPrice }}</div>
        <div class="count">{{ "x" + goodsItem.count }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartGoodsItem",
  props: {
    goodsItem: {
      type: Object,
      default: {},
    },
  },
  computed: {
    img() {
      if (this.goodsItem.checked) {
        return require("assets/img/cart/icon选中.svg");
      } else return require("assets/img/cart/icon未选中.svg");
    },
  },
  methods: {
    icClick() {
      this.goodsItem.checked = !this.goodsItem.checked;
    },
  },
};
</script>
<style scoped>
.cartGoodsItem {
  display: flex;
  padding: 10px 0;
  font-size: 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  width: 100%;
}
.iconImg {
  position: relative;
  top: 40px;
  left: 5px;
  width: 20px;
  height: 20px;
}
.goodsImg {
  width: 80px;
  height: 100px;
  border-radius: 5px;
  margin-left: 10px;
}
.goodsItemRight {
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goodsTitle {
  font-size: 17px;
  font-family: \5fae\8f6f\96c5\9ed1;
  width: 94%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goodsDesc {
  font-size: 14px;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 15px;
}
.goodsPrice {
  font-size: 17px;
  position: relative;
}
.newPrice {
  position: absolute;
  top: 18px;
  color: #ff4500;
}
.count {
  float: right;
  position: relative;
  top: 23px;
  right: 20px;
}
</style>