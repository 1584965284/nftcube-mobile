<template>
  <div class="sharingBackground" style="background-color: #276b78;  overflow:scroll;">
    <van-popup v-model="showLoadingPop" get-container="body" :close-on-click-overlay="false" style="width: 4rem;height:2.3rem;background-color: #e2eef0">
      <van-loading v-show="loadingShow" size='50' color="#276b78" vertical text-color='#276b78' style="font-weight: 700;">邀请海报生成中...</van-loading>
    </van-popup>
    <van-popup v-model="showImg" v-if="isQQ===true" get-container="body"  style="width:9.5rem;height:16rem;background-color: #e2eef0" closeable>
      <van-image
          width="auto"
          height="auto"
          :src="imgsrc"
      />
      <p style="font-size: 18px;text-align: center">请长按图片保存海报~</p>
    </van-popup>
    <div class="sharingHeader"><van-icon name="arrow-left" color="#fff" size="30" @click="goBack"/></div>
    <div class="sharingImg"></div>
    <div class="sharing">
      <div class="progress">
        <el-slider
            v-model="value"
            :marks="marks"  :step="10" disabled
            style="width:85%; margin:0.5rem auto;" >
        </el-slider>
      </div>
      <a style="margin:0 auto;width: 4rem;display: block;" :download="file">
        <van-button class="sharingBtn" @click="sharingBtn">分享邀请&nbsp;&nbsp;<van-icon name="share" /></van-button>
      </a>
    </div>
    <div class="info">
      <div style="margin: 0 auto;width:7.5rem;">
        <p style="font-size:20px">&nbsp;&nbsp;&nbsp;活动说明:</p>
        <p style="font-size:18px">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;平台限时开展“是真名士自风流”，竹林七贤主题NFT赠送活动。活动期间登录即可获赠主题徽章“竹林名士”，前五百位登录的用户更可额外获得一个典藏版勋章“名士风流”（持有典藏版勋章的用户可以获得活动奖励优先抽取权之后会获得每月三次免费铸造权）。
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“竹林七贤”系列NFT共计八款，七个普通款以及一个隐藏款。完成邀请新用户任务即可获赠前五个普通款，另两个普通款获取方式敬请关注平台相关活动，集齐七个普通款后可直接获得隐藏款作为奖励。
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在邀请新用户任务中，分别邀请成功（在平台注册账号）1/3/5/10/20位新用户均可获得该阶段的普通款NFT奖励，完成一个阶段性任务才可以进入下一个任务。
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本活动最终解释权由本平台所有。
        </p>
      </div>

    </div>

    <div>
      <div class="cardZone">
        <div class="oneCard" v-for="(nft, index) in nfts" :key="index">
          <app-card :ANFT="nft" :isAvailable="isAvailable[index]"></app-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {Image, Toast} from "vant";
import ActivityCard from "@/components/ActivityCard";

export default {
  components: {
    "app-card": ActivityCard,
  },
  data(){
    return{
      nfts:[], file:'',loadingShow:false,showLoadingPop:false,isAvailable:[],showImg:false,
      icode:this.$route.query.icode,
      value:0,imgsrc:'',isQQ:true,
      marks: {
        5: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '1人')
        },
        15: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '3人')
        },
        25: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '5人')
        },
        50: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '10人')
        },
        100: {
          style: {
            color: '#fff'
          },
          label: this.$createElement('strong', '20人')
        },
      }
    }
  },
  methods:{
    async sharingBtn(){
      let icode='';
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        localStorage.setItem("history",'/sharing')
        this.$router.push('/login');
        return;
      }else {
        let res=await axios({
          method: 'get',
          url: 'http://114.55.119.223/prod-api/api/user/createCode',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
        });
        console.log(res.data);
        if(res.data.errCode==0){
          icode=res.data.data.icode;
          this.showLoadingPop=true;
          this.loadingShow=true;
          let resPoster=await axios({
            method: 'post',
            url: 'http://114.55.119.223/prod-api/api/user/createPoster',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            data:{url:'http://www.nftcubecn.com/mobile/#/sharing?icode='+icode},
            //data:{url:'http://localhost:8080/#/sharing?icode='+icode}
            responseType: 'blob',
          });
          //console.log(resPoster.data);
          // window.open(resPoster.data.data);

          const blob = new Blob([resPoster.data],{type:'image/png'})
          blob.lastModifiedDate =new Date();
          const fileName = 'qudaoerweima.png'
          const dlink = document.createElement('a')
          if(this.isQQ===false){
            if ('download' in document.createElement('a')) { // 非IE下载
              const dlink = document.createElement('a')
              dlink.download = fileName
              dlink.style.display = 'none'
              dlink.href = URL.createObjectURL(blob)
              document.body.appendChild(dlink)
              dlink.click()
              URL.revokeObjectURL(dlink.href) // 释放URL 对象
              document.body.removeChild(dlink)
            } else { // IE10+下载
              navigator.msSaveBlob(blob, fileName)
            }
          }else{
            const a = new FileReader();
            a.readAsDataURL(blob);
            a.onload = (e) => {
              const base64 = e.target.result
              // const qrUrl = window.URL.createObjectURL(base64)
              const qrUrl = base64;
              this.imgsrc = qrUrl;
              this.showImg=true;
            }

          }


          this.loadingShow=false;
          this.showLoadingPop=false;
        }else{
          Toast({
            message: '生成邀请码失败',
            position: 'top',
          });
        }
      }
    },
    goBack(){
      this.$router.push('/activity');
    },
  },

  async created() {


      let agent = navigator.userAgent.toLowerCase();
      let result = (agent.match(/MicroMessenger/i) == "micromessenger" || agent.match(/QQ/i) == "qq");
      if (result) {
        localStorage.setItem('agent','qq');
        this.isQQ=true;
        // Toast({
        //   message: 'qq',
        //   position: 'top',
        // });
      } else {
        localStorage.setItem('agent','else');
        this.isQQ=false;
      }
    let resNFT=await axios({
      method: 'post',
      url: 'http://114.55.119.223/prod-api/api/market/getNFTs',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      data:{
        "status": {
          "sold": true,
          "labels": [
            "ArtProduct"
          ]
        },
        "minPrice": "",
        "maxPrice": "",
        "num": 30
      }
    });
    this.nfts=resNFT.data.data.nfts;
    if(!localStorage.getItem("token")){
      for(let i=0;i<resNFT.data.data.nfts.length;++i){
        this.isAvailable.push(true)
      }
    }else{
      this.isAvailable=[true,true,false,false]
    }


    if(this.icode){
      localStorage.setItem("icode",this.icode);
    }
    if(localStorage.getItem("token")){
      let res=await axios({
        method: 'get',
        url: 'http://114.55.119.223/prod-api/api/user/getIcodeTmt',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      });
      let resInviNum=await axios({
        method: 'get',
        url: 'http://114.55.119.223/prod-api/api/user/activity/inviNum',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      });
      if(resInviNum.data.data.num!=null&&resInviNum.data.data.num!=undefined){
        this.value=5*resInviNum.data.data.num;
      }

      // console.log(this.value);
    }


  }
}
</script>

<style>
.sharingImg{
  width:85%;
  height:5.5rem;
  margin: 1rem auto;
  border-radius:20px;
  background: url("../../assets/poster.png");
  background-size:contain ;
  background-position: center;
  background-repeat: no-repeat;

}
.sharing{
  width:85%;
  height:4rem;
  margin: 0rem auto;
  border-radius:20px;
  background-color:white;
  background: rgba(184, 184, 184, 0.2);
  box-shadow: inset 0px 0px 4px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  overflow: scroll;
}
.sharingBtn{
  background-color:gray !important;
  border-radius: 10px !important;
  width: 4rem;
  height:1rem;
  color: white !important;
  font-family: Noto Sans SC;
  font-weight: 700;
  letter-spacing: 1px;
}
.info{
  width:85%;
  height:8rem;
  margin: 1rem auto;
  border-radius:20px;
  background-color:white;
  background: rgba(184, 184, 184, 0.2);
  box-shadow: inset 0px 0px 4px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  overflow: scroll;
  font-family: Noto Sans SC;

}
.cardZone{
  width:95%;
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;

}
.oneCard{
  width:4rem;
  margin-bottom:0.8rem;
}
.progress .el-tooltip {
  width: 12px !important;
  height: 12px !important;
  position: relative !important;
  bottom:0.25rem !important;
}

</style>