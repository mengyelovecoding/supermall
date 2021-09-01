<template>
  <div class="detail-comment" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-title">
      <span>用户评价</span>
      <div class="more-div">
        <span class="more">更多</span>
        <div class="gt-more"></div>
      </div>
    </div>
    <div class="shop-name">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="comment-content">
      <p>{{ commentInfo.content }}</p>
      <span>{{ commentInfo.created | showDate }}</span>
      <span>{{ commentInfo.style }}</span>
    </div>
    <div class="comment-bottom">
        <img :src="url" alt="" v-for="url in commentInfo.images">
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/common/utils.js";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default: {},
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>
<style scoped>
.detail-comment {
  padding: 15px 12px;
  border-bottom: 5px solid rgba(100, 100, 100, .08);
}
.comment-title {
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(100, 100, 100, .2);
}
.more-div {
  float: right;
}
.gt-more {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 1px solid;
  border-right: 1px solid;
  transform: rotate(45deg);
}
.more {
  font-size: 10px;
}
.shop-name {
  margin-bottom: 20px;
}
.shop-name img {
  position: relative;
  top: 15px;
  width: 42px;
  height: 42px;
  border-radius: 50px;
  margin-right: 15px;
}
.comment-content p{
  font-size: 14px;
  margin-bottom: 10px;
}
.comment-content span {
  font-size: 12px;
  margin-right: 10px;
}
.comment-bottom img{
    width: 70px;
    height: 70px;
    margin-top: 10px;
    margin-right: 10px;
}
</style>