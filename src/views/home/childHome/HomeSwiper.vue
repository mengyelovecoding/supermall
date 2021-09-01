<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: Array,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    swiperImgLoad() {
      //这里使用isLoad来控制获取offsetTop值的次数，只需要获取一次，此处用的是发送事件
      if (!this.isLoad) {
        this.$emit("imgLoad");
        this.isLoad = true;
      }
    },
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    },
  },
};
</script>
<style scoped>
</style>