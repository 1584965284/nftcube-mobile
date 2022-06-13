<template>
	<div id="login">
		<div class="top">
     <van-icon name="arrow-left" color="#006a79" size="30" @click="goBack"/>
    </div>
		<div class="body">
			<van-cell-group inset>
			  <van-field v-model="value" label="手机号" placeholder="请输入手机号"  style="width:8rem;height:1.3rem;background-color:white;opacity: 0.8;label-color:#fff"/>
			</van-cell-group>
			<van-cell-group inset style="margin-top:0.5rem">
			  <van-field
			      v-model="password"
				  v-if="isPassword"
			      type="password"
			      name="密码"
			      label="密码"
			      placeholder="密码"
				  style="width:8rem;height:1.3rem;background-color:white;opacity: 0.8;"
			      :rules="[{ required: true, message: '请填写密码' }]"
			    />
				<div v-else>
						 <van-field
			      v-model="sms"
				  
			      center
			      clearable
			      label="验证码"
			  	style="width:8rem;opacity: 0.8;"
			    >
			      <template #button>
			        <van-button size="small" type="primary" style="background-color:#006A79;border-radius: 8px;" @click="getVerificationCode" :disabled="!disabledCodeBtn">{{codeText}}</van-button>
			      </template>
			    </van-field>
				</div>
			   
			  
			</van-cell-group >
			

			 <van-field name="checkbox" style="margin-top: 0.3rem; background-color: transparent;" id="agreement">
  <template #input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <van-checkbox v-model="checkbox" shape="square" style="margin-right: 0.3rem; "/>
		<span style="vertical-align: -8%;font-size: 12px; ">
				  		我已阅读并同意<a href="#">《服务协议》</a>/<a href="#">《隐私政策》</a>
				  	</span>
  </template>
</van-field>
			<van-button type="primary" class="logBtn" size="large" style="background-color:#006A79;border-color:#006A79;width:8rem;margin-top:0.5rem" @click="login">登录</van-button>
		<div>	<van-button type="primary" class="logBtn"  size="large" style="background-color:#006A79;border-color:#006A79;width:3rem;margin-top:0.5rem; margin-right: 1rem;" @click="goRegister">去注册</van-button>
<van-button type="primary" size="large" class="logBtn"  style="background-color:#006A79;border-color:#006A79;width:3rem;margin-top:0.5rem;" @click="goPassword">{{isPasswordBtn}}</van-button>
		</div>
		
		</div>
	</div>
	
</template>

<script>
	import axios from 'axios';
import { ref } from 'vue';
import { CLOSING } from 'ws';
import { Toast } from 'vant';
	
	export default {
	  data(){
		  return{
			  value:'',
			  password:'',
			   checkbox:false,
			   isPassword:false,
			    codeText:'获取验证码',
			   disabledCodeBtn:true,
			   sms:'',
			   isPasswordBtn:'密码登录',
		  }
	  },
	  methods:{
      goBack(){
        let history=localStorage.getItem('history');
        if(history){
          this.$router.push(history);
        }else{
          this.$router.push('/');
        }
      },
      async getVerificationCode(){
        await axios({
					method: 'post',
					url: 'http://114.55.119.223/prod-api/api/getVerificationCode',
					headers: {
						"Authorization": "Bearer " + localStorage.getItem('token')
					},
					data:{
						
						"phone": this.value,
					}        
				}).then(
					res=>{
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
					
					}
				)
		  },
		  login(){
			  if(this.checkbox!=true){
				  	Toast({
						message: '请勾选服务协议',
						position: 'top',
						});
						return;
			  }
			  if(this.isPassword==true){
				  console.log(1)
				  axios({
					method: 'post',
					url: 'http://114.55.119.223/prod-api/api/login/loginByPhone',
					headers: {
						"Authorization": "Bearer " + localStorage.getItem('token')
					},
					data:{
						
						"phone": this.value,
						"password":this.password,
					}        
				}).then(
					res=>{
					//console.log(res)
						if(res.data.errCode===0)
						{
							Toast({
									message: '登录成功',
									position: 'top',
									
									});
							
							this.$router.push('/');
							localStorage.setItem("token", res.data.data.token)
							//console.log(localStorage.getItem('token'))
						}
						else{
							Toast({
									message: '登录失败',
									position: 'top',
									});
						}
					
					}
				);
			  }else{
				  axios({
					method: 'post',
					url: 'http://114.55.119.223/prod-api/api/login/loginBySms',
					headers: {
						"Authorization": "Bearer " + localStorage.getItem('token')
					},
					data:{
						
						"phone": this.value,
						"smsCode":this.sms,
					}        
				}).then(
					res=>{
					//console.log(res)
						if(res.data.errCode===0)
						{
							Toast({
									message: '登录成功',
									position: 'top',
									
									});
							
							this.$router.push('/');
							localStorage.setItem("token", res.data.data.token)
							//console.log(localStorage.getItem('token'))
						}
						else{
							Toast({
									message: '登录失败',
									position: 'top',
									});
						}
					
					}
				);
			  }
			  
	axios({
          method: 'get',
          url: 'http://114.55.119.223/prod-api/api/user/getUserInfo',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
         
      }).then(
        res=>{
		//	console.log(res)
			let userInfo=res.data.data;
           localStorage.setItem("userInfo", JSON.stringify(userInfo) );
          
        }
      );
				
		  },
		  goRegister(){
			  this.$router.replace('/register');
		  },
		  goPassword(){
			  if(this.isPassword==true){
				  this.isPassword=!this.isPassword;
			  this.isPasswordBtn='密码登录'

			  }else{
				   this.isPassword=!this.isPassword;
			  this.isPasswordBtn='验证码登录'

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
	  }
	};

</script>

<style scope>
#login {
  background: url("../../../public/855d608567e1e5a04c7f816f8bbc25a.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.top{
	height:9rem;
}
	.item{margin-top:1rem;
	color:#00007f}
	
		.downbackimage{width:100%;
		margin-top:80px;
		padding-bottom:0px}
	.body{width:85%;
	margin-top:80px;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
		display: flex; 
		align-items: center;
		margin:auto;
		right:0;left:0
	}

	.radio{height:1rem;
		width:100%;
		justify-content: center;
			display: flex; 
			align-items: center;
		
	}
	#agreement .van-checkbox__icon {
		color: black;
	}
	.logBtn{
		border-radius:0.8rem !important;
	}
</style>

