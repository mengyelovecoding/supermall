<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/首页未选中.svg" alt="">
    <div>首页</div> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  },
  data() {
    return {
      // isActive: false,         不能写死
    };
  },
  methods:{
      itemClick(){
          this.$router.replace(this.path)
      }
  }
};
</script>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 10px;
}
.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 6px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>