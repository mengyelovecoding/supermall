<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      :current-index="currentIndex"
    ></detail-nav-bar>
    <scroll
      class="detail-content"
      @scroll="contentScroll"
      ref="scroll"
      :probe-type="3"
    >
      <div
        class="index-set"
        :class="{
          'show-index': indexSetShow,
          'fade-index': indexSetFade,
        }"
      >
        加入成功
      </div>
      <!-- <div v-for="item in $store.state.addCartList">{{ item }}</div> -->
      <detail-swiper ref="swiper" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" />
      <detai-img-info :detailInfo="detailInfo" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <recommend-goods ref="recommend" :pop="recommendGoods">
        <div class="divide-recommend">热门推荐</div>
      </recommend-goods>
    </scroll>
    <detail-tabbar
      class="detail-tabbar"
      @addToCart="addToCart"
      @showSuccessCart="showSuccessCart"
    />
    <back-top
      class="back"
      @click.native="backClick"
      v-show="backShow"
    ></back-top>
  </div>
</template>
<script>
import DetailNavBar from "./childDetail/DetailNavBar.vue";
import DetailSwiper from "./childDetail/DetailSwiper.vue";
import DetailBaseInfo from "./childDetail/DetailBaseInfo.vue";
import DetailShopInfo from "./childDetail/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import DetaiImgInfo from "./childDetail/DetaiImgInfo.vue";
import DetailParamInfo from "./childDetail/DetailParamInfo.vue";
import DetailCommentInfo from "./childDetail/DetailCommentInfo.vue";
import RecommendGoods from "components/content/recommendGoods/RecommendGoods.vue";
import DetailTabbar from "./childDetail/DetailTabbar.vue";

import { backTopMixin } from "@/common/mixin.js";
// import { debounce } from "@/common/utils.js";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendGoods: [],
      detailItemTop: [],
      // themeTops: [],
      getDetailTopY: null,
      currentIndex: 0,
      showSucess: false,
      indexSetShow: false,
      indexSetFade: false,
    };
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetaiImgInfo,
    DetailParamInfo,
    DetailCommentInfo,
    RecommendGoods,
    DetailTabbar,
  },
  updated() {
    // this.detailItemTop = [];
    // this.detailItemTop.push(0);
    // this.detailItemTop.push(this.$refs.param.$el.offsetTop);
    // this.detailItemTop.push(this.$refs.comment.$el.offsetTop);
    // this.detailItemTop.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.detailItemTop);
    this.getOffsetTops();
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取详情页文字描述和图片资源
      this.detailInfo = data.detailInfo;
      //获取尺码表数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //这样子获取offsetTop有些不正确，是因为即使已经使用$nextTick来等待下一帧来等待vue组件渲染，
      //等待$el渲染完后，但是还是会有图片未加载完全导致获取offsetTop值不准确
      // this.$nextTick(() => {
      //   this.detailItemTop.push(this.$refs.swiper.$el.offsetTop);
      //   this.detailItemTop.push(this.$refs.param.$el.offsetTop);
      //   this.detailItemTop.push(this.$refs.comment.$el.offsetTop);
      //   this.detailItemTop.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.detailItemTop);
      // });
    });
    getRecommend().then((res) => {
      // console.log(res);
      this.recommendGoods = res.data.data.list;
    });
  },
  methods: {
    //监听滚动，到达设定值显示回到顶部按钮
    contentScroll(position) {
      //我想到的方法进行判断
      // if(position.y<-1000){
      //   this.backShow=true;
      // }
      // else
      //   this.backShow=false;
      //老师的判断
      this.backShow = position.y < -1000;
      // this.controlActive = -position.y > this.tabOffsetTop;
      // console.log(this.detailItemTop);
      // if (-position.y < this.detailItemTop[1]) this.currentIndex = 0;
      // else if (
      //   -position.y > this.detailItemTop[1] &&
      //   -position.y < detailItemTop[2]
      // )
      //   this.currentIndex = 1;
      // else if (
      //   -position.y > this.detailItemTop[2] &&
      //   -position.y < detailItemTop[3]
      // )
      //   this.currentIndex = 2;
      // else this.currentIndex = 3;
      this.listenScrollTheme(-position.y);
    },
    //判断滚动的position.y值是否超过临界值
    listenScrollTheme(position) {
      let length = this.detailItemTop.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.detailItemTop[i];
        // console.log(typeof(i));
        /**
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         */
        if (position >= iPos && position < this.detailItemTop[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
    },
    //点击navbar跳转
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.detailItemTop[index], 300);
    },
    //获取offsetTop的函数
    getOffsetTops() {
      this.detailItemTop = [];
      this.detailItemTop.push(this.$refs.swiper.$el.offsetTop);
      this.detailItemTop.push(this.$refs.param.$el.offsetTop);
      this.detailItemTop.push(this.$refs.comment.$el.offsetTop);
      this.detailItemTop.push(this.$refs.recommend.$el.offsetTop);
      this.detailItemTop.push(Number.MAX_VALUE);
      // console.log(this.detailItemTop);
    },
    // 触发加入购物车事件，是从tabbar那边自定义事件
    addToCart() {
      const product = {};
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.newPrice = this.goods.realPrice;
      product.count = 0;
      //触发mutation
      this.$store.commit("addCart", product);
    },
    showSuccessCart() {
      this.indexSetShow = true;
      setTimeout(() => {
        this.indexSetShow = false;
        this.indexSetFade = true;
      }, 4000);
      setTimeout(() => (this.indexSetFade = false), 0);
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  width: 100%;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
.divide-recommend {
  margin: 15px 0 15px 10px;
}
.detail-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 58px;
  background-color: #fff;
}
.back {
  position: fixed;
  bottom: 70px;
  right: 20px;
}
.index-set {
  position: absolute;
  top: 50%;
  left: 40%;
  width: 100px;
  height: 50px;
  background-color: #dcdbdc;
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  opacity: 0;
  z-index: -100;
}

/****渐渐隐藏出现样式****/
.show-index {
  animation: show 5s linear 0s 1;
  animation-fill-mode: both;
  -webkit-animation-fill-mode: forwards; /* Safari 和 Chrome */
  -webkit-animation: show 5s linear 0s 1; /*Safari and Chrome*/
}

.fade-index {
  animation: fade 5s linear 0s 1;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards; /* Safari 和 Chrome */
  -webkit-animation: fade 5s linear 0s 1; /*Safari and Chrome*/
}

@keyframes show {
  from {
    opacity: 0;
    z-index: -100;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
    z-index: 888;
  }
}

@keyframes fade {
  from {
    z-index: 888;
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 0;
    z-index: -100;
  }
}
</style>