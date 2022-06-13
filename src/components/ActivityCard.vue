<template>

  <div class="ANFTCard">
    <van-image :src="'http://'+ANFT.s3" alt="" class="LargeNFTImg" fit="cover" height="4rem" width="4.4rem" @click.stop="preview"></van-image>
    <p class="nftPrice2"> &nbsp;￥{{ANFT.price}}</p>
    <div class="largeNftName"> &nbsp;{{ANFT.name}}
      <div class="rightTokenId">编号：{{ANFT.tokenId}}&nbsp;&nbsp;</div>
    </div>
    <div class="nftAuthor2"><span class="leftAuthor2"> &nbsp;&nbsp;艺术家</span><div class="rightAuthor2"><van-icon name="manager" />{{ANFT.author}}&nbsp;&nbsp;</div></div>
    <div class="nftPrice"> <span class="leftPrice">&nbsp;&nbsp;</span>
      <div class="rightPrice">
        <van-button plain  class="buyButton" @click="cardBtn(ANFT.tokenId)" style="border-radius:15px;" v-if="isAvailable===true&&isPick===false">领取</van-button>
        <van-button plain  class="buyButton" @click="cardBtn(ANFT.tokenId)" style="border-radius:15px" v-else-if="isPick===true">已领取</van-button>
        <van-button plain  class="buyButton" @click="cardBtnGray(ANFT.tokenId)" style="border-radius:15px;background-color: gray !important;" v-else>领取</van-button>
      </div>
    </div>
  </div>
</template>


<script>
import { ImagePreview } from 'vant';
import axios from 'axios';
import { Toast } from 'vant';

export default {
  props:['ANFT','isAvailable'],
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data(){
    return{
      isPick:false,
    };
  },
  methods:{
    preview(){
      const img=[];
      img.push('http://'+this.ANFT.s3);
      ImagePreview({images:img,"swipe-duration":20})
    },
    async cardBtn(tokenId){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        localStorage.setItem("history",'/sharing')
        this.$router.push('/login');
        return;
      }else {
        if(this.isPick===false){
          this.isPick=true;
          Toast({
            message: '领取成功',
            position: 'top',
            duration:1000,
          });
        }else{
          Toast({
            message: '已领取',
            position: 'top',
            duration:1500,
          });
        }
      }

    },
    cardBtnGray(tokenId){
      Toast({
        message: '任务目标还未完成哦，请加油完成任务后再来领取您的奖励',
        position: 'top',
        duration:2700,
      });
    }

  },
  created(){

  }
}


</script>

<style scoped>

.van-popup--center{
  border-radius: 5px !important;
  box-shadow:0px 0px 10px rgb(0 0 0 / 30%);
}

.ANFTCard{
  width: 4.4rem;
  height:8.3rem;
  border-radius: 5px;
  box-shadow:0px 0px 10px rgb(0 0 0 / 30%);
  background-color: white;
  font-family: Noto Sans SC;
  letter-spacing:0.5px;

}

.LargeNFTImg{

}
.nftPrice2{
  font-size:0.55rem;
  color: #F8A15B;
}
.largeNftName{
  height:1.1rem;
  font-size:0.5rem;
  font-weight: bold;
  color: black;
  margin-top: 0.2rem;
}
.rightTokenId{
  font-size: 0.3rem;
  margin-top: 0.2rem;
  text-align: right;
  color: #ff9900;
  position: relative;
  bottom:0.16rem;
}
.nftAuthor2{
  height:0.7rem;
}
.nftAuthor2 .leftAuthor2{
  font-size: 0.4rem;    color: #585959;
  position: relative;
  bottom:0.4rem;
}
.nftAuthor2 .rightAuthor2{
  font-size: 0.4rem;
  text-align: right;
  position: relative;
  bottom:1.2rem;
}
.ANFTCard .van-button{
  background-color: #006A79;
  height: 0.8rem;
  width: 1.8rem;
  color: white;
  font-weight: bold;
  border-radius: 5px;
}
.buyButton{
  width:2rem !important;
  margin-right: 0.2rem;
}

</style>
