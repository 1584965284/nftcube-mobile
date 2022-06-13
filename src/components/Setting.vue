<template>
	<div id="" class="my-form">
<!--实名认证-->
		<van-popup v-model="showAuth" get-container="body" @close="closeAuthPop">
		<van-form validate-first>
  <van-field
    v-model="name"
    name="pattern"
    placeholder="姓名"
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />
  <van-field
    v-model="id"
    name="validator"
    placeholder="身份证"
    :rules="[{ validator, message: '请输入正确内容' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" @click="submitAuth">提交</van-button>
  </div>
</van-form>
		</van-popup>

<!--修改个人信息-->
	<van-popup v-model="showUser" get-container="body" >
		<van-form validate-first  style="width:8rem">
  <van-field
    v-model="nick"
    name="pattern"
    placeholder="昵称"
    label="昵称"
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />
  <van-field name="radio" label="性别">
  <template #input>
    <van-radio-group v-model="s" direction="horizontal">
      <van-radio name="男">男</van-radio>
      <van-radio name="女">女</van-radio>
    </van-radio-group>
  </template>
</van-field>

  <van-field
  v-model="des"
  rows="2"
  autosize
    label="个性签名"
  type="textarea"
  maxlength="50"
  placeholder="请输入个性签名"
  show-word-limit
/>
  <div style="margin: 16px;">
    <van-button round block type="info" @click="submitUser">提交</van-button>
  </div>
</van-form>
		</van-popup>

    <!--设置交易密码  -->

	<van-popup v-model="showPaymentPwd" get-container="body" >
		<van-form validate-first  style="width:9rem">
  <van-field
    v-model="phone"
    name="pattern"
     label="手机号"
    :rules="[{ pattern, message: '请输入正确内容' }]"
  />
  <van-field
    v-model="sms"
    name="validator"
    placeholder="验证码"
    :rules="[{ validator, message: '请输入正确内容' }]"
  />
	      <van-button type="info" class="settingBtn" @click="sendSms" 
          style="position:absolute; left: 5.1rem;bottom:3.4rem; width:3.5rem !important; 
          height:0.8rem !important;" :disabled="!disabledCodeBtn">
          {{codeText}}
          </van-button>

  <van-field
    v-model="paymentPwd"
    name="validator"
    label="支付密码"
    type="password"
    :rules="[{ validator, message: '请输入正确内容' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" @click="submitPaymentPwd">修改</van-button>
  </div>
</van-form>
		</van-popup>

<!--setting正文-->
		<van-form  >
	 
	  <van-field name="switch" label="实名认证"  >
	    <template #input>
	      <van-switch v-model="verified_status2" size="20" :disabled="switchChecked2" @click="switchChanged" />
	    </template>
	  </van-field>
	 <van-cell title="修改个人信息"><van-button type="info" class="settingBtn" @click="changeUserInfo">修改</van-button></van-cell>
	 <van-cell title="设置交易密码"><van-button type="info" class="settingBtn" @click="changePaymentPwd">设置</van-button></van-cell>
	</van-form>
	</div>
	
</template> 

<script>
import axios from "axios";
   import { Toast } from 'vant';


export default{
    props:['verified_status',"switchChecked",'sex','username','description',],
    data(){
        return{
            showAuth:false,showUser:false,showPaymentPwd:false,
            name:'',id:'',paymentPwd:'',phone:'',sms:'',
            nick:this.username,
            s:this.sex,  des:this.description,
			   disabledCodeBtn:true,
            codeText:'获取验证码',switchChecked2:this.switchChecked, verified_status2:this.verified_status,
            verified:false,
            
        }
    },
    methods:{
        async changeUserInfo(){
            this.showUser=true;
        },
        switchChanged(){
            if(this.verified_status2==false){
                this.showAuth=true;

            }else{
                Toast({
                        message: "已实名",
                        position: 'top',
                        });
            }
        },
        changePaymentPwd(){this.showPaymentPwd=true},
        
        async submitAuth(){
                let res=await axios({
                method: 'post',
                url: 'http://114.55.119.223/prod-api/api/user/authentication',
                headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
                },
                data:{idCard:this.id,realName:this.name},
                })
                //console.log(res.data.message)
                Toast({
                        message: res.data.message,
                        position: 'top',
                        });
                if(res.data.errCode==0){
                   this.verified=true;
                }
                this.showAuth=false; 
        },
        async submitUser(){
            let res=await axios({
                method: 'post',
                url: 'http://114.55.119.223/prod-api/api/user/changeUserInfo',
                headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
                },
                data:{username:this.nick,description:this.des,sex:this.s},
                })
                //console.log(res.data.message)
                if(res.data.errCode==0){
                    Toast({
                        message:'修改成功',
                        position: 'top',
                        });
                        this.showUser=false; 
                }
                
            
        },
        async sendSms(){
           let res=await axios({
              method: 'post',
              url: 'http://114.55.119.223/prod-api/api/getVerificationCode',
              headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
              },
              data:{
                "phone": this.phone,
                "smsCode":this.sms,
              }        
            });
          if(res.data.errCode===0)
						{
							Toast({
									message: '验证码已发送',
									position: 'top',
									});

							this.countDown(60);
						}
						else{
							Toast({
									message: '发送失败，请1分钟后再试',
									position: 'top',
									});
						}
            
        },
        async submitPaymentPwd(){
          let res=await axios({
              method: 'post',
              url: 'http://114.55.119.223/prod-api/api/user/changePaymentPassword',
              headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
              },
              data:{
                "smsCode": this.sms,
                "new_password":this.paymentPwd,
              }        
            });
             if(res.data.errCode===0)
						{
							Toast({
									message: '修改成功',
									position: 'top',
									});
              this.showPaymentPwd=false; 
						}
						else{
							Toast({
									message: '修改失败',
									position: 'top',
									});
						}
        },
         countDown (time) {
              if (time === 0) {
                this.disabledCodeBtn = true
                this.codeText = "获取验证码"
                return
              } else {
                this.disabledCodeBtn = false;
                this.codeText = '重新发送(' + time + ')'
                time--
              }
              setTimeout(()=> {
               this.countDown(time);
              }, 1000)
         },
         closeAuthPop(){
              if(this.verified==true){
                  this.verified_status2=true;
                  this.switchChecked2=true;
              }else{
                this.verified_status2=false;
              }
         },
    },
   
}
</script>

<style>
.settingBtn{
   position:absolute;
   right: 0;
   font-size: 14px !important;
   height:0.6rem !important;
   width:1.6rem !important;
}
</style>