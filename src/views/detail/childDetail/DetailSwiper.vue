<template>
  <div class="detail-swiper">
    <!-- 这个地方的类名不要取一样的，不然会报错，因为在封装的Swiper里面使用的是qureyselector来获取的dom -->
    <swiper class="de-swiper">
      <swiper-item v-for="item in topImages">
          <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import {Swiper,SwiperItem} from "components/common/swiper/index.js";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  name: "DetailSwiper",
  data() {
    return {};
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.de-swiper{
    height: 300px;
    overflow: hidden;
}
</style>