<template>
  <div class="tabControl">
    <div
      v-for="(item, index) in controlText"
      class="controlViewItem"
      :class="{ active: index === currentIndex }"
      @click="showClick(index)"
      :key="index"
    >
      <span>{{ item }}</span>
      <div v-show="index === currentIndex" class="currentShow"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    controlText: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    showClick(index) {
      this.currentIndex = index;
      this.$emit("tabControlClick", index);
    },
    zeroTo() {
      this.currentIndex = 0;
    },
  },
};
</script>
<style scoped>
.tabControl {
  display: flex;
  padding-top: 6px;
  text-align: center;
  height: 40px;
  background-color: #fff;
  z-index: 10;
}
.controlViewItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.currentShow {
  height: 1px;
  width: 30px;
  background-color: var(--color-high-text);
  margin: auto;
}
</style>