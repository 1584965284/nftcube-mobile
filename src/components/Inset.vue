<template>
	<div id="" class="my-form">

<!--提现-->
			<van-popup v-model="showWithdraw" get-container="body" >
		<van-form validate-first @failed="onFailed" style="width:9rem">
  <van-field
    v-model="money"
    name="pattern"
     label="提现金额"
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />
  <van-field
    v-model="paymentPwd"
    name="validator"
    label="支付密码"
    type="password"
    :rules="[{ validator, message: '请输入正确内容' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" @click="alipayWithdraw">提现</van-button>
  </div>
</van-form>
		</van-popup>

	<!--绑定支付宝-->

		<van-popup v-model="showPop" get-container="body" >
		<van-form validate-first @failed="onFailed" style="width:6.5rem">
		<van-field
    v-model="alipayId"
    name="validator"
    placeholder="支付宝账号"
    :rules="[{ validator, message: '请输入正确内容' }]"
  />
  <van-field
    v-model="alipayName"
    name="pattern"
    placeholder="姓名"
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />
  
  <div style="margin: 16px;">
    <van-button round block type="info" @click="submitAlipay">提交</van-button>
  </div>
</van-form>
		</van-popup>
		<van-form  >
	 
	  
	  <van-field name="switch" label="绑定支付宝" left-icon="alipay" >
	    <template #input>
	      <van-button type="info" class="settingBtn" @click="changeAlipay" style="position: relative; left: 2.3rem;">设置</van-button>
	    </template>
	  </van-field>
	  <van-field name="switch" label="支付宝账号" left-icon="user-o" v-if="isAlipay==true">
	    <template #input>
			{{alipayInfo.alipay_address}} 
	    </template>
	  </van-field>
	 <!-- <van-field name="switch" label="姓名" left-icon="alipay" v-if="isAlipay==true">
	    <template #input>
			{{alipayInfo.alipay_name}}
	    </template>
	  </van-field>-->
	  <van-field label="我的余额" :value="balance" left-icon="balance-o" readonly input-align="center"/>
	  <van-field name="stepper" label="充值"  left-icon="refund-o" input-align="center">
	    <template #input>
	      <van-stepper v-model="stepper" step="10" theme="round" button-size="25" input-width="40%" :integer="true" />
	    </template>
		
	  </van-field>
	  
	 
	  
	<div style="margin: 16px;">
	  <van-button round block type="info"  @click="recharge">充值</van-button>
	</div>
	  <div style="margin: 16px;">
	  <van-button round block type="info"  @click="withdraw">提现</van-button>
	</div>
	  
	  
	</van-form>
	</div>
	
</template>

<script>
import axios from "axios";
   import { Toast } from 'vant';

export default {
	props:['isAlipay','alipayInfo'],
  data() {
    return {
		aliPayUrl:'',
	    switchChecked: false,
		alipayName:'',
		alipayId:'',
		checkbox: false,
		switchDisabled:false,
		showPop:false, showWithdraw:false,
		stepper: 1,balance:0,money:'',paymentPwd:'',
    };
  },
  methods: {
	  async submitAlipay(){
		let res=   await axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/user/wallet/changeWithdrawInfo',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
	      data:{alipay_name:this.alipayName, alipay_address:this.alipayId}

      	})
		  Toast({
				message: '绑定成功',
				position: 'top',
				});
			this.showPop=false;
	  },

	 async recharge(){
		  await	axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/market/getAlipay',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
	      data:{
			  address:JSON.parse(localStorage.getItem('userInfo')).address,
			  money:this.stepper,
		  },

      }).then(
        res=>{
          this.aliPayUrl=res.data.data.alipayUrl;
		  console.log(this.aliPayUrl)
		  //window.location.replace(this.aliPayUrl)
		 window.location.href=this.aliPayUrl
        }
      );
	  },
	  async alipayWithdraw(){
		  if(this.isAlipay==false){
			  Toast({
				message: '请先绑定支付宝',
				position: 'top',
				});
				this.showWithdraw=false;
			  return;
		  }
		  let res=await	axios({
			method: 'post',
			url: 'http://114.55.119.223/prod-api/api/market/alipayWithdraw',
			headers: {
				"Authorization": "Bearer " + localStorage.getItem('token')
			},
			data:{
				address:JSON.parse(localStorage.getItem('userInfo')).address,
				money:this.money,
				paypass:this.paymentPwd,
			},

		  })
		  Toast({
				message: res.data.message,
				position: 'top',
				});
			if(res.data.errCode==0){
				this.showWithdraw=false;
			}
	  },
	  changeAlipay(){
		  this.showPop=true;

	  },withdraw(){this.showWithdraw=true;},
	
	

},
	created(){
		axios({
          method: 'get',
          url: 'http://114.55.119.223/prod-api/api/user/wallet/getBalance',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },

      }).then(
        res=>{
			console.log(res)
          this.balance=res.data.data.balance;
        }
      );
	},
}
/** <button class="recharge" @click="recharge" >
	  充值 
 </button>
	 */
</script>

<style>
	.my-form{
		width: 8.5rem;
		  
		height: 70%;
	}
	.recharge{
		width:3.5rem;
		height: 1rem;
		font-size: 0.5rem;
		
		border-radius:20px !important;
		background-color: #f4596a !important;
		color: #fafcfc;
		float: right;
		position: relative;
		right:2rem;
		border: transparent;

	}
</style>
