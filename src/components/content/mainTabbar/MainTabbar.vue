<template>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/首页未选中.svg" alt="">
        <img slot="item-active" src="~assets/img/tabbar/首页选中.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/分类未选中.svg" alt="">
        <img slot="item-active" src="~assets/img/tabbar/分类选中.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/购物车未选中.svg" alt="">
        <img slot="item-active" src="~assets/img/tabbar/购物车选中.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deeppink">
        <img slot="item-icon" src="~assets/img/tabbar/我的未选中.svg" alt="">
        <img slot="item-active" src="~assets/img/tabbar/我的选中.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
    name:'MainTabbar',
    components:{
        TabBar,
        TabBarItem
    }
}
</script>
<style>

</style>