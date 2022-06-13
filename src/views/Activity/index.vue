<template>
  <div style="background:rgb(2, 105, 122);  width: 100%; height: 24rem; ">
    <div>
      <form action="/" style="height: 2rem;">
        <van-icon name="arrow-left" color="#fff" size="30" @click="goBack" style="position:relative ;top: 0.28rem"/>
        <van-search
          v-model="value"
          shape="round"
          background="rgb(2, 105, 122)"
          placeholder="搜索活动" show-action  input-align="center" style="width:90%;position: relative;left:0.85rem;bottom: 1.2rem">
          <template #action>
            <van-icon name="cross" size="1rem" @cancel="onCancel" color="rgba(255, 255, 255)" style="margin-top:0.2rem;"/>
          </template>
        </van-search>
      </form>
    </div>
    <div class="cardZone1">
      <div class="cardDate">&nbsp;&nbsp;2022/5/24</div>
      <div class="activityCard1">
          <div class="cardUp">
            <!--<van-image src="../../../assets/poster.png" alt="" class="LargeNFTImg" fit="cover"
                       height="8rem" width="8rem" @click.stop="preview"></van-image>-->
          </div>
          <div class="cardDown">
            <div style="padding-left:0.13rem;padding-top: 0.2rem">
              <p style="font-weight: bold">竹林七贤NFT赠送活动</p>
              <p style="font-weight:550;margin-top:0.1rem"><img src="@/assets/nftcubeLogo.png" class="cardDownImg" />Cube 数字立方</p>
            </div>

            <div class="cardBtn" @click="cardBtn"><p>立即探索&nbsp;</p></div>
          </div>

      </div>
    </div>

<!--    <div class="cardZone1">-->
<!--      <div class="cardDate">日期</div>-->
<!--      <div class="activityCard1">-->
<!--        <div class="cardUp">-->
<!--          &lt;!&ndash;<van-image src="../../../assets/poster.png" alt="" class="LargeNFTImg" fit="cover"-->
<!--                     height="8rem" width="8rem" @click.stop="preview"></van-image>&ndash;&gt;-->
<!--        </div>-->
<!--        <div class="cardDown">-->
<!--          <p>activityName</p>-->
<!--          <p><img src="@/assets/nftcubeLogo.png" style="width:auto;height: auto;max-width: 2rem;max-height: 2rem"/>constraction</p>-->
<!--          <div class="cardBtn" @click="cardBtn"><p>立即探索&nbsp;&nbsp;</p></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

  </div>
</template>

<script>
export default {
  methods:{
    cardBtn(){
      //this.$router.push('/sharing')
      this.$router.push({ path: '/sharing' })
    },
    goBack(){
      this.$router.push('/')

    },
  },
  created() {
    let agent = navigator.userAgent.toLowerCase();
    let result = (agent.match(/MicroMessenger/i) === "micromessenger" || agent.match(/QQ/i) === "qq");
    if (result) {
      localStorage.setItem('agent','qq');
    } else {
      localStorage.setItem('agent','else');
    }
  }
}

</script>

<style>
@import  " ~@openfonts/noto-sans-sc_chinese-simplified/index.css " ;
.cardZone1 {
  color: rgb(255, 255, 255);
  font-size: 24px;
  text-align: left;
  margin-top: 0.2rem;
}
.cardDate {
  color: rgb(255, 255, 255);
  font-family: Noto Sans SC;
  font-size: 24px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 1px;
  text-align: left;
}
.activityCard1 {
  width:90%;
  margin: 0.7rem auto;
  overflow: hidden;
  background-color: transparent;
  border-radius:20px;
  box-shadow: 2px 2px 10px rgba(25,26,50,0.8);
  //box-shadow: 0px 10px 50px rgba(30, 136, 238, 0.06), inset 5px -5px 50px rgba(147, 130, 255, 0.35);
}

.cardUp {
  height: 295.56px;
  background: url("../../assets/poster.png"), linear-gradient(rgba(114, 112, 255, 64) 0%, rgba(25, 26, 50, 255) 100%);
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center;
  //border-radius: 0px 0px 20px 20px;
  box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px 20px 0px 0px;
}
.cardDown {
  height:3.6rem;
  background: rgba(184, 184, 184, 0.2);
  box-shadow: inset 0px 0px 4px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 0px 0px 20px 20px;
}
.cardDown .cardDownImg{
  width:auto;
  height: auto;
  max-width: 2rem;
  max-height: 2rem;
  position: relative;
  top: 0.14rem;
}
.cardDown p:nth-child(2){
  font-size: 15px;
}
.cardBtn{
  background-image: url("../../assets/cardBtn.svg");
  background-repeat: no-repeat;
  background-origin:content-box;
  background-position: center;
  padding-left:0.1rem;
  padding-top:0.3rem;
  height:1rem;
  width:8rem;
  //text-align: center;
  margin: 0.2rem auto;
}
.cardBtn p{
  line-height: 1rem;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-align: center;
  color: rgb(16, 54, 60);
  font-family: Noto Sans SC;
}

</style>

