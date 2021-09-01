<template>
  <div class="bottomBar">
    <div class="icon" @click="iconClick">
      <img :src="isAllChecked?imgChecked2:imgChecked1" alt="" v-model="isChecked" />
    </div>
    <span class="bottom-span1">全选</span>
    <span class="bottom-span2">合计:{{ "￥" + countPrice }}</span>
    <span class="bottom-span3">
      去计算({{ $store.state.addCartList.length }})
    </span>
  </div>
</template>
<script>
export default {
  name: "CartBottomBar",
  data() {
    return {
      current: 0,
      imgChecked1: require("assets/img/cart/icon未选中.svg"),
      imgChecked2: require("assets/img/cart/icon选中.svg"),
      isAllChecked: true,
    };
  },
  computed: {
    countPrice() {
      const cartList = this.$store.getters.cartList;
      let countPrice = 0;
      for (let item of cartList) {
        if (item.checked) {
          countPrice += item.newPrice * item.count;
        }
      }
      // console.log(countPrice);
      // return this.returnFloat(countPrice);
      return countPrice.toFixed(2);
    },
    isChecked() {
      return this.$store.getters.cartList.find((item) => item.checked === false)===undefined
        ? (this.isAllChecked = true)
        : (this.isAllChecked = false);
    },
  },
  methods: {
    iconClick() {
      if (this.$store.state.addCartList.length !== 0) {
          this.isAllChecked = !this.isAllChecked;
      }
      let isSelectAll = this.$store.getters.cartList.find(
        (item) => !item.checked
      );

      // 2.有未选中的内容, 则全部选中
      if (isSelectAll) {
        this.$store.getters.cartList.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.$store.getters.cartList.forEach((item) => {
          item.checked = false;
        });
      }
    },
    // checkBtnClick() {
    //   // 1.判断是否有未选中的按钮
    //   let isSelectAll = this.$store.getters.cartList.find(
    //     (item) => !item.checked
    //   );

    //   // 2.有未选中的内容, 则全部选中
    //   if (isSelectAll) {
    //     this.$store.state.cartList.forEach((item) => {
    //       item.checked = true;
    //     });
    //   } else {
    //     this.$store.state.cartList.forEach((item) => {
    //       item.checked = false;
    //     });
    //   }
    // },
    //把保留两位小数的问题想复杂了
    // returnFloat(value) {
    //   var value = Math.round(parseFloat(value) * 100) / 100;
    //   var xsd = value.toString().split(".");
    //   if (xsd.length == 1) {
    //     value = value.toString() + ".00";
    //     return value;
    //   }
    //   if (xsd.length > 1) {
    //     if (xsd[1].length < 2) {
    //       value = value.toString() + "0";
    //     }
    //     return value;
    //   }
    // },
  },
};
</script>
<style scoped>
.bottomBar {
  position: fixed;
  bottom: 50px;
  background-color: #eee;
  width: 100%;
  height: 44px;
  padding: 0 0 0 35px;
}
.icon {
  position: absolute;
  top: 12px;
  left: 10px;
}
.icon img {
  width: 20px;
  height: 20px;
}
.bottom-span1 {
  font-size: 14px;
  line-height: 44px;
}
.bottom-span2,
.bottom-span3 {
  font-size: 16px;
}
.bottom-span2 {
  margin-left: 20px;
}
.bottom-span3 {
  width: 25%;
  position: absolute;
  right: 0;
  color: #fff;
  background-color: #ff4500;
  line-height: 44px;
  text-align: center;
}
</style>