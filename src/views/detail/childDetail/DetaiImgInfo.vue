<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="start"></div>
    <div class="desc">{{ detailInfo.desc }}</div>
    <div class="end"></div>
    <div v-for="item in detailInfo.detailImage">
      <div class="info-desc">{{ item.key }}</div>
      <img v-for="img in item.list" :src="img" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailImgInfo",
  props: {
    detailInfo: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style scoped>
.start {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #333;
  margin-left: 15px;
  margin-top: 20px;
}
.start::before {
  position: absolute;
  bottom: 0;
  display: block;
  content: "";
  width: 5px;
  height: 5px;
  background-color: #333;
}
.desc {
  padding: 15px 10px;
  font-size: 16px;
}
.end {
  position: relative;
  float: right;
  top: 15px;
  right: 20px;
  width: 90px;
  height: 1px;
  background-color: #333;
}
.end::after {
  position: absolute;
  right: 0;
  bottom: 0;
  content: "";
  display: block;
  width: 5px;
  height: 5px;
  background-color: #333;
}
.info-desc {
  margin-top: 35px;
  margin-left: 15px;
  margin-bottom: 10px;
  color: #000;
}
img {
  width: 100%;
}
</style>