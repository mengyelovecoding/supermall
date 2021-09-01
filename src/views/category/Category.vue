<template>
  <div id="category">
    <nav-bar class="cateNavbar"><div slot="center-slot">商品分类</div></nav-bar>
    <div class="categoryItem">
      <scroll class="scroll-left" :probe-type="3">
        <div class="cateBar">
          <div
            v-for="(item, index) in category"
            class="cateBarItem"
            :class="{ active: currentIndex === index }"
            @click="cateBarClick(index)"
          >
            {{ item.title }}
          </div>
        </div>
      </scroll>
      <scroll class="scroll-right" ref="scroll">
        <div class="cateItem">
          <div v-for="item in miniCategoryGoods" class="miniCateGoods">
            <a :href="item.link">
              <img :src="item.image" alt="" class="miniCateImg" />
              <div>{{ item.title }}</div>
            </a>
          </div>
        </div>
        <tab-control
          :controlText="recommendText"
          ref="tabControl"
          class="cateTabControl"
          @tabControlClick="controlClick"
        ></tab-control>
        <recommend-goods
          :pop="recommendGoods[showTabControl]"
          class="recommendGoods"
        ></recommend-goods>
      </scroll>
    </div>
    <!-- <back-top class="backTop"></back-top> -->
  </div>
</template>
<script>
import BackTop from "components/content/backTop/BackTop.vue";
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import RecommendGoods from "components/content/recommendGoods/RecommendGoods.vue";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { POP, SELL, NEW } from "common/const";
export default {
  name: "Category",
  components: {
    BackTop,
    NavBar,
    Scroll,
    TabControl,
    RecommendGoods,
  },
  data() {
    return {
      category: [],
      currentIndex: 0,
      controlIndex: 0,
      miniCategoryGoods: [],
      recommendText: ["综合", "新品", "销量"],
      recommendGoods: {
        pop: [],
        sell: [],
        new: [],
      },
      showTabControl: "pop",
    };
  },
  created() {
    getCategory().then((res) => {
      // console.log(res);
      this.category = res.data.data.category.list;
      // console.log(this.category);
      this.getSubcategories(0);
    });
  },
  methods: {
    getSubcategories(index) {
      getSubcategory(this.category[index].maitKey).then((res) => {
        // console.log(res);
        this.miniCategoryGoods = res.data.data.list;
        // console.log(index);
        this.getCategoryRecommend(POP);
        this.getCategoryRecommend(SELL);
        this.getCategoryRecommend(NEW);
      });
    },
    getCategoryRecommend(type) {
      getCategoryDetail(
        this.category[this.currentIndex].miniWallkey,
        type
      ).then((res) => {
        // console.log(res);
        // console.log(type);
        this.recommendGoods[type] = res.data;
        // console.log(this.recommendGoods);
      });
    },
    cateBarClick(index) {
      this.getSubcategories(index);
      this.currentIndex = index;
      this.showTabControl = "pop";
      this.$refs.tabControl.zeroTo();
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    controlClick(index) {
      // console.log(index);
      switch (index) {
        case 0: {
          this.showTabControl = "pop";
          // console.log(this.showTabControl);
          break;
        }
        case 1: {
          this.showTabControl = "sell";
          // console.log(this.showTabControl);
          break;
        }
        case 2: {
          this.showTabControl = "new";
          // console.log(this.showTabControl);
          break;
        }
      }
    },
  },
};
</script>
<style scoped>
#category {
  height: 100vh;
  width: 100vw;
}
.cateNavbar {
  background-color: var(--color-tint);
  color: aliceblue;
  position: relative;
  z-index: 9;
}
.categoryItem {
  display: flex;
  height: calc(100% - 44px - 49px);
  width: 100%;
}
.scroll-left {
  height: 100%;
  width: 25%;
  overflow: hidden;
}
.cateBar {
  /* width: 20%; */
  text-align: center;
}
.cateBarItem {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  background-color: #ededed;
  /* background-color: #677; */
}
.active {
  color: #ff5777;
  font-weight: 700;
  background-color: #fff;
  border-left: 6px solid var(--color-high-text);
}
.scroll-right {
  width: 75%;
  height: 100%;
}
.cateItem {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
  margin-left: 10px;
  padding-left: 5px;
}
.miniCateGoods {
  margin-top: 20px;
  margin-right: 4px;
  margin-left: 14px;
}
.miniCateImg {
  width: 67px;
  height: 67px;
}
.miniCateImg + div {
  width: 60px;
  text-align: center;
  font-size: 12px;
  margin-top: 12px;
  margin-left: 4px;
}
.cateTabControl {
  margin-top: 10px;
  background-color: #dbdbdb;
}
.recommendGoods {
  margin-top: 5px;
}
.backTop {
  position: fixed;
  right: 20px;
  bottom: 70px;
}
</style>