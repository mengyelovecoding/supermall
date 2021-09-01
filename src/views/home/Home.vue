<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center-slot">购物街</div>
    </nav-bar>
    <tab-control
      @tabControlClick="controlClick"
      :control-text="['流行', '新款', '精选']"
      ref="tabControl1"
      class="tab-control"
      v-show="controlActive"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @upLoad="loadMore"
    >
      <home-swiper
        :banners="banners"
        @imgLoad="tabImgLoad"
        ref="hSwiper"
      ></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature-view></home-feature-view>
      <tab-control
        @tabControlClick="controlClick"
        :control-text="['流行', '新款', '精选']"
        ref="tabControl2"
      ></tab-control>
      <recommend-goods :pop="showList"></recommend-goods>
    </scroll>
    <back-top
      class="back"
      @click.native="backClick"
      v-show="backShow"
    ></back-top>
  </div>
</template>
<script>
//公共组件
import BackTop from "components/content/backTop/BackTop";
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import RecommendGoods from "components/content/recommendGoods/RecommendGoods";
//特有子组件
import HomeSwiper from "./childHome/HomeSwiper.vue";
import HomeRecommend from "./childHome/HomeRecommend.vue";
import HomeFeatureView from "./childHome/HomeFeatureView.vue";
import Scroll from "components/common/scroll/Scroll.vue";
//方法
import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    RecommendGoods,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      tabControl: "pop",
      backShow: false,
      tabOffsetTop: 0,
      controlActive: false,
      keepSaveY: 0,
    };
  },
  created() {
    //请求数据成功之后保存数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    //通过测试发现，如果这里的第三个参数设置为0，会出现点回首页突然跳到顶部的bug，
    // 看弹幕里说也可以通过先刷新再跳转来解决
    this.$refs.scroll.scrollTo(0, this.keepSaveY, 1);
    this.$refs.hSwiper.startTimer();
  },
  deactivated() {
    //保存Y值
    this.keepSaveY = this.$refs.scroll.getScrollY();
    this.$refs.hSwiper.stopTimer();
  },
  methods: {
    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        // console.log(this.banners);
        this.recommends = res.data.data.recommend.list;
        // console.log(this.recommends)
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        // console.log(this.goods[type].list);
        this.goods[type].page += 1;
        //完成上拉加载更多，以便再次触发到达底部刷新
        this.$refs.scroll.finishPullUp();
      });
    },
    //事件相关
    controlClick(index) {
      if (index === 0) this.tabControl = "pop";
      else if (index === 1) this.tabControl = "new";
      else this.tabControl = "sell";
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      //不用if可以用switch
      // switch(index){
      //   case 0:this.tabControl='pop'
      //   case 1:this.tabControl='new'
      //   case 2:this.tabControl='sell'
      // }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //我想到的方法进行判断
      // if(position.y<-1000){
      //   this.backShow=true;
      // }
      // else
      //   this.backShow=false;
      //老师的判断
      this.backShow = position.y < -1000;
      this.controlActive = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.tabControl);
      //解决图片加载过慢而导致滚动不了的bug，原因是计算滚动高度的问题
      // this.$refs.scroll.scroll.refresh();
    },
    tabImgLoad() {
      //不应该直接在mounted来获取这个offsetTop,因为有可能轮播图图片加载慢影响该值的获取不正确
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  computed: {
    showList() {
      return this.goods[this.tabControl].list;
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  /* 下面属性只需用在原生滚动时，然而现在用的是better-scroll,所以用不上了 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
.back {
  position: fixed;
  bottom: 70px;
  right: 20px;
}
/* 行不通，会出现tabControl瞬间弹走不会停留 
:class="{ tabControlClass:controlActive }"*/
/* .tabControlClass {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>