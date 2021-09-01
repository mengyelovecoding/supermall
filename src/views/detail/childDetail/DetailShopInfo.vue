<template>
  <div class="detailShopInfo">
    <div class="shopLogoName">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="shopSellDetail">
      <div class="left-div">
        <div class="left-div-child">
          <div class="left-child">
            <div class="shop-sell">{{ tofixed(shop.sells) }}</div>
            <div>总销量</div>
          </div>
          <div class="right-child">
            <div class="shop-num">{{ shop.goodsCount }}</div>
            <div>全部宝贝</div>
          </div>
        </div>
      </div>
      <div class="right-div">
        <table class="right-div-table">
          <tr v-for="(item, index) in shop.score" :key="index">
            <td class="name-td">{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default: {},
    },
  },
  methods: {
    tofixed(num) {
      num = Number(num);
      if (num == 0) {
        return num + "";
      } else if (num > 1 && num < 10000) {
        return num + "";
      } else {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>
<style scoped>
.detailShopInfo {
  border-top: 5px solid rgba(100, 100, 100, 0.08);
  border-bottom: 5px solid rgba(100, 100, 100, 0.08);
  padding-bottom: 25px;
}
.shopLogoName img {
  position: relative;
  top: 20px;
  left: 12px;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 50%;
}
.shopLogoName span {
  margin-left: 22px;
}
.shopSellDetail {
  display: flex;
  margin-top: 30px;
  text-align: center;
}
.left-div,
.right-div {
  flex: 1;
}
.left-div {
  padding: 10px 0;
}
.left-div-child {
  border-right: 1px solid;
  font-size: 12px;
  display: flex;
}
.left-child,
.right-child {
  flex: 1;
}
.shop-sell {
  font-size: 18px;
}
.shop-num {
  font-size: 18px;
  margin-top: 4px;
}
.right-div-table {
  display: table;
  font-size: 13px;
}
.right-div-table td {
  padding: 2px 14px;
  display: table-cell;
}
.score {
  color: #5ea732;
}
.score-better {
  color: #f13e3a;
}
.better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
}

.better-more span {
  background-color: #f13e3a;
}
.shop-bottom{
    margin-top: 10px;
}
.enter-shop{
    height: 30px;
    line-height: 30px;
    width: 120px;
    margin: 0 auto;
    text-align: center;
    background-color: #f2f5f8;
    border-radius: 10px;
}
</style>