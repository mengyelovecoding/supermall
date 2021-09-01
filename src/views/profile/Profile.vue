<template>
  <div id="profile">
    <nav-bar class="profileNavbar"><div slot="center-slot">我的</div></nav-bar>
    <div class="topLogin">
      <div>
        <img src="~assets/img/profile/我的头像.svg" alt="" class="headImg" />
      </div>
      <div>
        <div class="loginText">登录/注册</div>
        <div class="phoneText">
          <img src="~assets/img/profile/手机.svg" alt="" />
          <span>暂无绑定手机号</span>
        </div>
      </div>
      <div class="arrow"></div>
    </div>
    <div class="countItem">
      <div class="leftCountItem">
        <div><span class="number">0.00</span> <span>元</span></div>
        <div class="text">我的余额</div>
      </div>
      <div class="centerCountItem">
        <div><span class="number">0</span><span>个</span></div>
        <div class="text">我的优惠</div>
      </div>
      <div class="rightCountItem">
        <div><span class="number">0</span><span>分</span></div>
        <div class="text">我的积分</div>
      </div>
    </div>
    <div class="message">
      <img src="~assets/img/profile/我的消息.svg" alt="" class="log" />
      <div>我的消息</div>
    </div>
    <div class="message">
      <img src="~assets/img/profile/积分商城.svg" alt="" class="log">
      <div>积分商城</div>
    </div>
    <div class="member">
      <img src="~assets/img/profile/会员卡.svg" alt="" class="log">
      <div>会员卡</div>
    </div>
    <div class="message" @click="cartItemClick">
      <img src="~assets/img/profile/我的购物车.svg" alt="" class="log">
      <div>我的购物车</div>
    </div>
    <div class="bottomItem">
      <img src="~assets/img/profile/购物.svg" alt="" class="log">
      <div>下载购物APP</div>
    </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "Profile",
  components: {
    NavBar,
  },
  methods:{
    cartItemClick(){
      this.$router.push('/cart')
    }
  }
};
</script>
<style>
.profile {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.profileNavbar {
  background-color: var(--color-tint);
  color: aliceblue;
}
.topLogin {
  display: flex;
  background-color: var(--color-tint);
  width: 100%;
  height: 90px;
}
.headImg {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-left: 15px;
  margin-top: 15px;
}
.loginText {
  color: #fff;
  margin-top: 20px;
  margin-left: 10px;
}
.phoneText {
  margin-top: 4px;
  margin-left: 7px;
}
.phoneText img {
  width: 20px;
  height: 26px;
}
.phoneText span {
  position: relative;
  top: -8px;
  font-size: 14px;
}
.arrow {
  position: absolute;
  top: 82px;
  right: 20px;
  width: 15px;
  height: 15px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
}
.countItem {
  display: flex;
  height: 84px;
  border-bottom: 12px solid rgba(100, 100, 100, 0.08);
}
.countItem div {
  flex: 1;
}
.leftCountItem,
.centerCountItem,
.rightCountItem {
  text-align: center;
  padding-top: 10px;
}
.number {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.number + span {
  font-size: 13px;
  color: #666;
}
.text {
  font-size: 13px;
  color: #666;
}
.centerCountItem {
  border-left: 1px solid rgba(100, 100, 100, 0.1);
  border-right: 1px solid rgba(100, 100, 100, 0.1);
}
.message {
  position: relative;
  height: 45px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  /* padding-bottom: 8px; */
}
.log {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 25px;
  height: 25px;
}
.log + div {
  line-height: 45px;
  margin-left: 50px;
}
.member{
  position: relative;
  height: 57px;
  border-bottom: 12px solid rgba(100, 100, 100, .08);
  padding-bottom: 12px;
}
.bottomItem{
  position:relative;
}
</style>