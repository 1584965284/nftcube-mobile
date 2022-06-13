<template>
  <div>
    <!--我的nft-->
    <van-popup v-model="showPop1" get-container="body">
      <app-swiper :nfts="nfts"></app-swiper>
    </van-popup>
    <!--支付设置-->
    <van-popup v-model="isShowPayment" get-container="body">
      <app-inset :isAlipay="isAlipay" :alipayInfo="alipayInfo"></app-inset>
    </van-popup>
    <!--关注 列表-->
    <van-popup v-model="isShowFollowList" get-container="body" closeable>
      <app-followList :fatherList="list" style="marginTop:1rem"></app-followList>
    </van-popup>

    <!--粉丝 列表-->
    <van-popup v-model="isShowFansList" get-container="body" closeable>
      <app-fansList :fatherList="list" style="marginTop:1rem"></app-fansList>
    </van-popup>
    <!--个人设置-->
    <van-popup v-model="isShowSetting" get-container="body">
      <app-setting :switchChecked="switchChecked" :verified_status="verified_status" :username="username" :sex="sex"
                   :description="description"></app-setting>
    </van-popup>

    <!--头像裁剪-->
    <div v-if="showCropper"
         style="position:fixed;width:100%;height:100%;left: 0;top: 0; background-color:black; z-index: 98;opacity:0.6;"></div>

    <app-cropper :fatherImg="optionImg" @callBack="callBack" v-if="showCropper"
                 style="position:absolute;z-index:999; top:6rem;left:1rem;"></app-cropper>

<!--    <van-action-sheet-->
<!--        v-model="show"-->
<!--        :actions="actions"-->
<!--        cancel-text="取消"-->
<!--        round-->
<!--        close-on-click-action="true"-->
<!--        @cancel="onCancel"-->
<!--    />-->

    <div class="body1">

      <div id="myhead" class='myhead'>
        <div
            class="head1">
          <van-uploader v-model="fileList" multiple :max-count="1" :max-size="5000 * 1024"
                        @oversize="onOversize" :after-read="afterRead" :before-read="beforeRead" :readonly="false"
                        :deletable="false" image-fit="cover">

            <van-image
                round
                width="2.5rem"
                height="2.5rem"
                :src="avatar"
                class="avatar1"
            />
          </van-uploader>

          <div class="name1">
            <p id="name" style="font-size:24px;" color="#585959">{{ username }}</p>
            <p style="font-size:14px; overflow: hidden;" color="#585959">地址：{{ address }}</p>

            <!--<p style="font-size:14px">{{description}}</p>-->
          </div>
        </div>
        <div class="numbox">
          <van-cell title="获赞" :value="likeNum" class="nums" style="color:#585959" clickable @click="Toast"/>
          <van-cell title="关注" :value="followNum" class="nums" style="color:#585959" clickable @click="showList(1)"/>
          <van-cell title="粉丝" :value="fansNum" class="nums" style="color:#585959" clickable @click="showList(2)"/>
        </div>
      </div>
      <div id="functionmode" class="functionmode1">
        <div id="MyNFT" class="MyNFT" @click="showPopup1()">
          我的藏品
        </div>
        <div id="changeAlipay" class="payment" @click="showPayment()">
          支付设置
        </div>
        <div id="changeMy" class="changeMy" @click="showSetting()">
          个人设置
        </div>
        <div id="agency" class="agency" @click="toMessage">
          消息管理

        </div>
      </div>
      <div class="order">
        <div id="myOrders" class="myOrders" @click="logOut()">
          退出登录
        </div>
        <div id="mySold" class="mySold" @click="showPopup1()">
          我的发售
        </div>
      </div>
      <div style="height:10%;width:100%">

      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  </div>

</template>

<script>
import Nftswiper from '@/components/Nftswiper'
import Inset from '@/components/Inset'
import FansList from '@/components/FansList'
import FollowList from '@/components/FollowList'
import Order from '@/components/Order'
import Setting from '@/components/Setting'
import Cutting from '@/components/Cutting'
import {Toast} from 'vant';
import axios from 'axios';

export default {
  inject: ['reload'],
  components: {
    "app-swiper": Nftswiper,
    Image,
    "app-inset": Inset,
    "app-setting": Setting,
    "app-fansList": FansList, "app-followList": FollowList,
    "app-order": Order, "app-cropper": Cutting,
  },
  async created() {
    //用户信息
    await axios({
      method: 'get',
      url: 'http://114.55.119.223/prod-api/api/user/getUserInfo',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },

    }).then(
        res => {
          //	console.log(res)
          let userInfo = res.data.data;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.user = userInfo;
          this.address = userInfo.address;
          this.sex = userInfo.address;
          this.username = userInfo.username;
          this.description = userInfo.description;
          this.avatar = 'http://114.55.119.223:8000' + userInfo.avatar;
        }
    );
    //粉丝数
    await axios({
      method: 'post',
      url: 'http://114.55.119.223/prod-api/api/user/interact/getFansNum',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      data: {
        toAddress: localStorage.getItem('token')
      }

    }).then(
        res => {
          //console.log(res)
          this.fansNum = res.data.data.fansNum;
          this.likeNum = res.data.data.likeNum;
        }
    );
    //关注数
    await axios({
      method: 'get',
      url: 'http://114.55.119.223/prod-api/api/user/interact/getFollowNum',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    }).then(
        res => {
          //console.log(res)
          this.followNum = res.data.data.followNum;
        }
    );
    //余额
    await axios({
      method: 'get',
      url: 'http://114.55.119.223/prod-api/api/user/wallet/getBalance',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },

    }).then(
        res => {
          if (res.data.data.balance)
            this.balance = res.data.data.balance;
        }
    );
    //支付宝 /api/user/wallet/getWithdrawInfo
    await axios({
      method: 'get',
      url: 'http://114.55.119.223/prod-api/api/user/wallet/getWithdrawInfo',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },

    }).then(
        res => {
          let alipayInfo = res.data.data;
          //console.log(alipayInfo)
          if (res.data.data.alipay_address != '' && res.data.data.alipay_address != null && res.data.data.alipay_address != undefined) {
            this.alipayInfo = alipayInfo;
            this.isAlipay = true;
          }
        }
    );
  },
  data() {
    return {
      balance: 0, isAlipay: false, alipayInfo: {},
      likeNum: 0, fansNum: 0, followNum: 0,
      artist: {},
      //user
      address: '', username: '', avatar: '', description: '', sex: '',
      user: {},
      nfts: [],
      //pop
      ANFT2: {}, ANFT3: {}, ANFT4: {},
      showPop1: false,
      isShowPayment: false, isShowFansList: false, isShowFollowList: false, list: [],
      isShowSetting: false,
      showPop3: false,
      showPop4: false,
      show: false,
      actions: [{name: '注册机构'}, {name: '加入机构'}, {name: '机构成员认证'}],
      verified_status: false,
      switchChecked: false,
      //裁剪
      optionImg: '', imageFileName: '', showCropper: false,
    };
  },

  methods: {
    toMessage(){
      this.$router.push('/message')
    },
    beforeRead(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        Toast('请上传 jpg 格式图片');
        return false;
      }

      this.imageFileName = file.name;
      return true;
    },
    imageToBase64(file) {
      let reader = new FileReader()
      //console.log(reader)
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.optionImg = reader.result
      }
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.showCropper = true;
      // this.imageToBase64(file.content);
      this.optionImg = file.content;
      /*	let formdata=new FormData();
        formdata.append('file',file.file)
          console.log(file);*/
      /*let res= await  axios({
               method: 'post',
               url: 'http://114.55.119.223/prod-api/api/user/avatar',
               headers: {
                 "Authorization": "Bearer " + localStorage.getItem('token')
             },
              data:formdata,
      });
      if(res.data.errCode==0){
        Toast({message: '修改头像成功',position: 'top',});
        this.avatar='http://114.55.119.223:8000'+res.data.data.url;
        //this.reload();
        location.reload();
      }else{
        Toast({message: '修改头像失败',position: 'top',});location.reload();
      }*/
    },

    async showList(index) { //index:    1 follow     2 fans
      switch (index) {
        case 1:
          this.list = [];
          let followRes = await axios({
            method: 'post',
            url: 'http://114.55.119.223/prod-api/api/user/interact/getFollows',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            data: {
              page: 1, num: 10,
            },
          });
          if (followRes.data.errCode == 0) {
            this.list = followRes.data.data.follow;
          }
          this.list = this.list.filter(function (s) {
            return s;
          });
          this.isShowFollowList = true;
          break;
        case 2:
          this.list = [];
          let fansRes = await axios({
            method: 'post',
            url: 'http://114.55.119.223/prod-api/api/user/interact/getFans',
            headers: {
              "Authorization": "Bearer " + localStorage.getItem('token')
            },
            data: {
              page: 1, num: 10,
            },
          });
          if (fansRes.data.errCode == 0) {
            this.list = fansRes.data.data.fans;
          }
          this.list = this.list.filter(function (s) {
            return s;
          });
          this.isShowFansList = true;

          break;
        default:
      }
    },
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 5M');
    },
    Toast() {
      this.$toast({
        message: this.likeNum,
        icon: 'like-o',
      })

    },

    onCancel() {
      Toast('取消');
    },
    async showPopup1() {
      //我的nft
      //    console.log(this.address,2)
      await axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/user/getNFTs',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data: {

          status: {
            creater: this.address,
          }
        },
      }).then(
          res => {
            console.log(res)
            this.nfts = res.data.data.nfts
          }
      );
      this.showPop1 = true;
    },
    async showPayment() {
      this.isShowPayment = true;

      let res = await axios({
        method: 'get',
        url: 'http://114.55.119.223/prod-api/api/user/wallet/getWithdrawInfo',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      })
      console.log(res)
      //this.verified_status=res.data.data.verified_status;
      //if(res.data.data.verified_status==true){
      //	this.switchChecked=true;
      //}
    },
    showPopup3() {
      this.showPop3 = true;
    },
    showPopup4() {
      this.showPop4 = true;
    },
    async showSetting() {
      let res = await axios({
        method: 'get',
        url: 'http://114.55.119.223/prod-api/api/user/getVerifiedInfo',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
      })
      //console.log(res)
      this.verified_status = res.data.data.verified_status;
      if (res.data.data.verified_status == true) {
        this.switchChecked = true;
      }
      this.isShowSetting = true;
    },
    logOut() {
      localStorage.clear();
      Toast({message: '已退出', position: 'top',});
      this.$router.push("/login");
    },
    callBack(flag, data) {
      if (flag == 1) {
        this.showCropper = data;

      }
    },


  },

}
</script>

<style>

.body1 {
  width: 90%;
  margin: auto;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

.myhead {
  background: #e2eef0;
  height: 30%;
  margin-bottom: 1rem;
}

.head1 {
  width: 100%;
  height: 70%;
  margin: auto;
  justify-content: center;
  display: flex;
  align-items: center;
  flex: 5;
  flex-direction: row;
  flex-wrap: wrap;
}

.name1 {
  width: 50%;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  color: #585959;
  font-weight: bold;

}

#tag {
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

#van-tag {

}

.numbox {
  justify-content: space-evenly;
  align-items: center;
  height: 30%;
  display: flex;
  margin: auto;
  width: 90%;
  padding: 1;


}

.numbox .van-cell__value {
  color: #585959;

}

.nums {
  font-size: 16px !important;
  color: #585959;
  font-weight: 550;
  width: 33%;
  margin-right: 0.2rem;
  margin-left: 0.2rem;
  background-color: transparent !important;
}

#button {
  width: 3rem;
  flex: 1 0 0;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.functionmode1 {
  width: 90%;
  height: 20%;
  background: url("../../../public/aaa.png") no-repeat;
  border-radius: 1rem;
  background-size: 360px 140px;
  margin: auto;
  right: 0;
  left: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.order {
  width: 80%;
  height: 30%;
  font-size: 14px;
  border-radius: 1rem;
  margin-top: 3rem;
  margin: auto;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;

}

.MyNFT, .agency, .payment, .changeMy {
  width: 50%;
  height: 50%;


  border-radius: 1rem;
  font-size: 14px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: #373737;
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem

}

.myOrders {
  margin-top: 1rem;

}

.myOrders, .mySold {
  height: 30%;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 1rem;
  font-size: 14px;
  margin-bottom: 0.1rem;
  color: #5e5e5e;
}

.mySold {
  margin-top: 0.8rem;
}
</style>
