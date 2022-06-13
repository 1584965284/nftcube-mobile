<template>

<div>


    <div>
    <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="搜索市场"
        @search="onSearch"
        @cancel="onCancel"
    />
    </form>
        </div>

    <div>
        <van-swipe :autoplay="3000">
          <van-swipe-item @click="toActivity"><img src="../../../src/assets/poster.png" class="ad-swipe"></van-swipe-item>
          <van-swipe-item><img src="../../../public/1651929508.jpg" class="ad-swipe"></van-swipe-item>
<!--  <van-swipe-item><img src="../../../public/1651929508.jpg" class="ad-swipe"></van-swipe-item>-->
<!--  <van-swipe-item><img src="../../../public/1651929508.jpg" class="ad-swipe"></van-swipe-item>-->
</van-swipe>
    </div>

    <div id="middle">
        <van-button plain type="primary" id="greatworks" replace to="/layout/home/works">优秀作品</van-button>
        <span class="line">|</span>
        <van-button plain type="info" id="greatartists" replace to="/layout/home/artists">优秀创作者</van-button>
        <div>
            <router-view></router-view>
        </div>
    </div>

<div id="end"> <van-button type="info" replace to="/layout/market">探索CUBE</van-button>
</div>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>

</div>
   
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios';
export default {
    
    data() {
        return {
        value: '',
        };
    },
    methods: {
        onSearch(val) {
            Toast(val);
        },
        onCancel() {
           // Toast('取消');
        },
        onChange(index) {
            //Toast('当前 Swipe 索引：' + index);
        },
        toActivity(){
          this.$router.push('/activity')
        },
    },
};
</script>

<style >
    .ad-swipe{
      height:6rem;
      width: 100%;
    }
    #middle{
        width:90%;
        margin: 0.3rem auto 0.4rem;
        border:#e2eef0 solid 0.1rem;
        border-radius: 15px;
        background-color: #e2eef0;
    }
    .line{
        
        font-size: 0.5rem;
        display: inline-block;
       vertical-align:baseline;
       color: #006A79;
       position: relative;
       bottom: 8px;
    }
    #greatworks{
        height:1.1rem;
        margin-top:-0.2rem  ;
        width:48%;
        border: #e2eef0;
        background-color: #e2eef0;
        color: #575959;
        font-weight: bold;
        font-size: 0.45rem;
        vertical-align: middle;
    }
    #greatartists{
        height:1.1rem;
        margin-top:-0.2rem;
         width:50%;
         border: #e2eef0;
        background-color: #e2eef0;
        color: #575959;
        font-weight: bold;
        font-size: 0.45rem;
        vertical-align: middle;
    }
    #end{
        width:9rem;
        
        margin-left: auto;
        margin-right: auto;
    }
    #end button{
        width: 9rem;
        background-color: #006a79;
        
    }
</style>