<template>
  <div class="upDiv">
    <div v-for="item in recommends" class="recommendItem">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props:{
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  }
};
</script>
<style scoped>
.upDiv {
  display: flex;
  padding: 5px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommendItem{
    flex: 1;
    text-align: center;
    font-size: 14px;
}
.recommendItem img{
    width: 70px;
    height: 70px;
    margin-bottom: 2px;
}
</style>