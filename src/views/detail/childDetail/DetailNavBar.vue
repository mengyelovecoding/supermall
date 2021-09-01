<template>
  <nav-bar>
    <div slot="left-slot" class="left-bar" @click="backClick"></div>
    <div slot="center-slot" class="center-bar">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      // currentIndex: 0,
    };
  },
  methods: {
    //点击navbar按钮发射事件给detail组件，并将点击按钮的index传过去
    itemClick(index) {
      // this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.left-bar {
  width: 18px;
  height: 18px;
  border-top: 3px solid;
  border-left: 3px solid;
  transform: rotate(-45deg);
  margin-top: 13px;
  margin-left: 30px;
}
.center-bar {
  display: flex;
  font-size: 15px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>