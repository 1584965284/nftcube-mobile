<template>
  <div>
    <van-nav-bar class="navBar"
        title="消息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <van-cell-group inset>
            <van-cell v-for="item in list" :key="item"
                      :title="item.name" :value="item.time.slice(0,10)" :label="item.mes"/>
          </van-cell-group>

        </van-list>
      </van-pull-refresh>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      count:1,
      sum:0,
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push('/layout/my')
    },
    async onLoad(){
      let mes=[];
      let res= await axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/user/interact/getMes',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{page:this.count,num:10},
      });
      if(res.data.errCode===0){
        this.count=this.count+1;
        mes=res.data.data.mes;
        this.list=this.list.concat(res.data.data.mes);
        this.sum=this.sum+10;
        // 加载状态结束
        this.loading = false;
      }
      // 数据全部加载完成
      if(this.count>=res.data.data.count||mes.length===0){
        this.finished=true;this.loading = false;
      }

    },
    async onRefresh() {
      // 清空列表数据
      this.finished = false;
      this.list=[];
      this.sum=0;this.count=1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      await this.onLoad();
      this.loading=false;
      this.refreshing=false;
    },

  },

}
</script>

<style scoped>

</style>