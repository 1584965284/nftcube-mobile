<template>
  <div id="login">
    <div class="top1">
    </div>
    <div class="body">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-cell-group inset>
          <van-field
              v-model="phone"
              name="手机号"
              label="手机号"
              placeholder="请填写手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"

          />
          <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ pattern, required: true, message: '密码长度必须为5-20个字符' }]"
          />
          <van-field
              v-model="password2"
              type="password"
              name="密码"
              label="密码"
              placeholder="请再次输入密码"
              :rules="[{ validator,required: true, message: '两次密码不一致' }]"

          />
          <van-field
              v-model="icode"
              name="邀请码"
              label="邀请码"
              placeholder="请填写邀请码（非必需）"
              :rules="[{ required:false}]"

          />
        </van-cell-group>
        <van-cell-group inset style="margin-top:0.5rem">
          <van-field
              v-model="sms"
              center
              clearable
              label="验证码"
              style="width:8rem;opacity: 0.8;"
          >
            <template #button>
              <van-button size="small" type="primary" style="background-color:#006A79;border-radius: 8px;"
                          @click="getVerificationCode" :disabled="!disabledCodeBtn">{{ codeText }}
              </van-button>
            </template>
          </van-field>
        </van-cell-group>


        <van-field name="checkbox" style="margin-top: 0.3rem; background-color: transparent; " id="agreement">
          <template #input>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <van-checkbox v-model="checkbox" shape="square" style="margin-right: 0.3rem; "/>
            <span style="vertical-align: -8%;font-size: 12px; ">
				  		我已阅读并同意<a href="#">《服务协议》</a>/<a href="#">《隐私政策》</a>
				  	</span>
          </template>
        </van-field>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit"
                      style="background-color:#006A79;border-color:#006A79;width:8rem;margin-top:0.5rem"
                      @click="register">
            注册
          </van-button>
          <van-button round block type="primary" native-type="submit"
                      style="background-color:#006A79;border-color:#006A79;width:8rem;margin-top:0.5rem"
                      @click="goLogin">
            去登录
          </van-button>


        </div>
      </van-form>

    </div>
  </div>

</template>


<script>
import {ref} from 'vue';
import axios from 'axios';
import {Toast} from 'vant';

export default {
  data() {
    return {
      username: '',
      password: '', password2: '',
      phone: '',
      sms: '',
      pattern: /^.{5,20}$/,
      codeText: '获取验证码',
      disabledCodeBtn: true,
      checkbox: false,
      icode:'',
    }
  },
  methods: {
    async getVerificationCode() {
      await axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/getVerificationCode',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data: {

          "phone": this.phone,
        }
      }).then(
          res => {
            if (res.data.errCode === 0) {
              Toast({
                message: '验证码已发送',
                position: 'top',
              });

              this.countDown(60);
            } else {
              Toast({
                message: '发送失败，请1分钟后再试',
                position: 'top',
              });
            }

          }
      )
    },
    register() {
      if (this.checkbox != true) {
        Toast({
          message: '请勾选服务协议',
          position: 'top',
        });
        return;
      }
      axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/login/registerByPhone',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data: {
          "phone": this.phone,
          "pwd": this.password,
          "vericode": this.sms,
          icode:this.icode,
        }
      }).then(
          res => {
            //console.log(res)
            if (res.data.errCode === 0) {
              Toast({
                message: '注册成功',
                position: 'top',
              });
              this.$router.push('/login');


            } else {
              Toast({
                message: '注册失败',
                position: 'top',
              });
            }

          }
      )
    },
    goLogin() {
      this.$router.push('/login');
    },
    validator(val) {
      if (val === this.password) {
        return true;
      } else {
        return false;
      }
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true
        this.codeText = "获取验证码"
        return
      } else {
        this.disabledCodeBtn = false;
        this.codeText = '重新发送(' + time + ')'
        time--
      }
      setTimeout(() => {
        this.countDown(time)
      }, 1000)
    },
  },

  created() {
    let icode=localStorage.getItem("icode")
    if(icode){
      this.icode=icode;
    }
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
  overflow: scroll;
}

.top1 {
  height: 8rem;
}

.item {
  margin-top: 1rem;
  color: #00007f
}

.downbackimage {
  width: 100%;
  margin-top: 80px;
  padding-bottom: 0px
}

.body {
  width: 100%;
  margin-top: 80px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: auto;
  right: 0;
  left: 0
}

.radio {
  height: 1rem;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;

}

</style>
