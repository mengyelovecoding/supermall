<template>
  <div id="tab-bar">
    <!-- <tab-bar-item></tab-bar-item>
    <tab-bar-item></tab-bar-item>
    <tab-bar-item></tab-bar-item>
    <tab-bar-item></tab-bar-item> -->
    <slot></slot>
  </div>
</template>
<script>
import TabBarItem from "./TabBarItem.vue";
export default {
  components: {
    TabBarItem,
  },
  name: "TabBar",
};
</script>
<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
  line-height: 18px;
}
</style>