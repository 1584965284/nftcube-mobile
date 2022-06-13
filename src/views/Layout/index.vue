<template>
<div>
  <div class="navBar">
        <van-nav-bar
        title="数字立方"
        right-text="活动"
        @click-right="onClickRight"
        />
    </div>

    <div>
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    
    <van-tabbar v-model="active" route>
  <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="search" replace to="/layout/market/double">市场</van-tabbar-item>
  <van-tabbar-item icon="friends-o" replace to="/layout/artists">创作者</van-tabbar-item>
  <van-tabbar-item icon="setting-o" replace to="/layout/my">我的</van-tabbar-item>
</van-tabbar>
    
    </div>

</template>

<script>

import  Toast  from 'vant';
import axios from 'axios';


export default {
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload                                              
            }
        },
   data() {
    return {
      active: 0,isRouterAlive: true,
    };
  },
  methods: {
    onClickRight() {
      this.$router.push("/activity");
    },
  },
    reload () {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
            this.isRouterAlive = true;         //再打开
        }) 
    },
};
</script>

<style >
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.navBar .van-nav-bar__content{
  background-color: #006c79;
  
}
.navBar .van-ellipsis{
    color: white !important;
    font-weight:999;
    font-size:0.5rem;
}

.navBar .van-nav-bar__text{
    color: white !important;
    font-weight:550;
    font-size:0.36rem;
}
</style>