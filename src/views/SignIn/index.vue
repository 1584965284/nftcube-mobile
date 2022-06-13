<template>
  <div>
    <div>
      <van-calendar
          title="日历"
          :poppable="false"
          :show-confirm="false"
          :style="{ height: '500px' }" readonly :min-date="minDate" :max-date="maxDate"
      />
    </div>
    <div>
      <van-button type="info" @click="signIn">签到</van-button>

    </div>
  </div>
</template>


<script>
import axios from "axios";
import {Toast} from "vant";

export default {
  data(){
    return{
      minDate:'',maxDate:'',num:0,
    }
  },
  methods:{
    async signIn(){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        this.$router.push('/login');
        return;
      }else {
        let res=await axios({
          method: 'get',
          url: 'http://114.55.119.223/prod-api/api/user/activity/signIn',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
        });
        Toast({
          message: res.data.message,
          position: 'top',
        });
        let res2=await axios({
          method: 'get',
          url: 'http://114.55.119.223/prod-api/api/user/activity/getSignInfo',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
        });


      }
    },
    // formatter(day) {
    //   const month = day.date.getMonth() + 1;
    //   const date = day.date.getDate();
    //
    //   if (month === 5) {
    //     if (date === 1) {
    //       day.topInfo = '劳动节';
    //     } else if (date === 4) {
    //       day.topInfo = '青年节';
    //     } else if (date === 11) {
    //       day.text = '今天';
    //     }
    //   }
    //
    //   if (day.type === 'start') {
    //     day.bottomInfo = '入住';
    //   } else if (day.type === 'end') {
    //     day.bottomInfo = '离店';
    //   }
    //
    //   return day;
    // },
  },

  async created() {
    let now=Date.now();
    this.maxDate=new Date(2629800000+now);
    this.minDate=new Date(now-2629800000);
    // console.log(this.maxDate);
    let res=await axios({
      method: 'get',
      url: 'http://114.55.119.223/prod-api/api/user/activity/getSignInfo',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    });
    if(res.data.errCode===0){
      this.num=res.data.data.num;

    }

  }
}

</script>

