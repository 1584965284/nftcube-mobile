<template>
  <div>
    <van-popup v-model="showPop" get-container="body" closeable><app-artist :artist="oneArtist" :nfts="arr"></app-artist></van-popup>
<!--    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">-->

  <van-list class="vanList" @load="onLoad"  v-model="loading" :finished="finished" finished-text="没有更多了">

        <div class="cardb"  v-for="(artist, index) in artists" :key="index">
          <div id="card" class="card">

            <van-image
                round
                width="1.7rem"
                height="1.7rem"
                :src="'http://114.55.119.223:8000'+artist.avatar"
                class="avatar"
                @click="preview('http://114.55.119.223:8000'+artist.avatar)"
            />
            <div class="namefan2">
              <p id="name" color="#3f3f3f">{{artist.name}}</p>
              <p id="fansNum" color="#3f3f3f" >{{artist.description}}</p>


            </div>


            <div  class="workname2" id="artistWork">

              <div style="position: absolute;left:-1.2rem">
                <van-button  type="primary" class="follow2" id="follow2" color="#177785" @click="unFollow(artist.name)" v-if="artist.isFollow">取消关注</van-button>
                <van-button icon="plus" type="primary" class="follow2" id="follow2" color="#177785" @click="join(artist.name)" v-else>加入机构</van-button>
              </div>

              <div class="workClick2" @click="workClick(artist.name)">
                <span id="workname2" style="font-size:13px" color="#3f3f3f">&nbsp;&nbsp;<van-icon name="arrow" /></span>
              </div>

            </div>

          </div>

        </div>
      </van-list>
<!--    </van-pull-refresh>-->


    <p>&nbsp;</p>
    <p>&nbsp;</p>

  </div>


</template>

<script>
import axios from 'axios';
import {ImagePreview, Toast} from 'vant';
import ArtistCard from '@/components/ArtistCard';

export default {
  data(){
    return{
      artists:[], artistsNum:0,
      arr:[],
      followBtn:'关注',
      showPop:false, finished:false,loading:false,refreshing:false,
      oneArtist:{},count:1,sum:0,
    }

  },

  components: {
    "app-artist":ArtistCard,
  },

  methods: {
    // async onRefresh() {
    //   // 清空列表数据
    //   this.finished = false;
    //   this.artists=[];
    //   this.sum=0;this.count=1;
    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   await this.onLoad();
    //   this.loading=false;
    //   this.refreshing=false;
    // },

    async onLoad() {
      // 异步更新数据
      console.log(this.count)
      let address=''
      if(localStorage.getItem("token")){
        address=JSON.parse(localStorage.getItem('userInfo')).address;
      }
      let res=await axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/market/getAgencies',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{

        }
      })

      let artists=res.data.data.res;

        this.finished = true;

      this.artists=this.artists.concat(artists);
      this.count=this.count+1;

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成


    },
    async workClick(name){
      this.$router.push({path:'/agency',query:{name:name}})
    },

    onFollow(){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        this.$router.push('/login');
        return;
      }
    },
    onLike(index,toAddress){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        this.$router.push('/login');
        return;
      }

      if(this.artists[index].isLike===false){
        this.artists[index].likeMe=this.artists[index].likeMe+1;
        axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/user/interact/like',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          data:{

            "toAddress": toAddress,
          }
        }).then(
            res=>{
              //console.log(res)
              if(res.data.errCode===0){
                Toast({
                  message: '点赞成功',
                  position: 'top',
                });
              }

            }
        )
      }else{
        this.artists[index].likeMe=this.artists[index].likeMe-1;
        axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/user/interact/unlike',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          data:{

            "toAddress": toAddress,
          }
        }).then(
            res=>{
              if(res.data.errCode===0){
                Toast({
                  message: '取消成功',
                  position: 'top',
                });
              }

            }
        )

      }
      this.artists[index].isLike=! this.artists[index].isLike;


    },
    join(name){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        this.$router.push('/login');
        return;
      }
      axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/agency/joinAgency',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{
          "name":name,
        }
      }).then(
          res=>{
            // console.log(res)
            if(res.data.errCode===0){
              Toast({
                message:res.data.message,
                position: 'top',
              });
            }

          }
      )
      this.artists[index].fansNum++;
      this.artists[index].isFollow=!this.artists[index].isFollow;
    },
    unFollow(index,toAddress){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        this.$router.push('/login');
        return;
      }
      axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/user/interact/unfollow',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{

          "toAddress": toAddress,
        }
      }).then(
          res=>{
            //console.log(res)
            if(res.data.errCode===0){
              Toast({
                message: '取关成功',
                position: 'top',
              });
            }

          }
      )
      this.artists[index].fansNum--;
      this.artists[index].isFollow=!this.artists[index].isFollow;
    },
    preview(avatar){
      const img=[];
      img.push(avatar);
      ImagePreview({images:img, closeable: true,})
    },
  },

  created(){
    let address=''
    if(localStorage.getItem("token")){
      address=JSON.parse(localStorage.getItem('userInfo')).address;
    }

    // axios({
    //   method: 'post',
    //   url: 'http://114.55.119.223/prod-api/api/market/getAritists',
    //   headers: {
    //     "Authorization": "Bearer " + localStorage.getItem('token')
    //   },
    //   data:{
    //     'address':address,
    //     "num":7,
    //     page:1,
    //   }
    // }).then(
    //     res=>{
    //       this.artists=res.data.data.aritists;
    //     }
    // );

    axios({
      method: 'get',
      url: 'http://114.55.119.223/prod-api/api/market/getAritistsNum',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    }).then(
        res=>{
          this.artistsNum=res.data.data.num;
        }
    );

  },

}



/*<van-popup v-model="showPop1" get-container="body">
	<app-card1 :ANFT1="ANFT1"></app-card1>
	</van-popup> */
</script>


<style scoped>
.vanList{
  margin-top: 0.5rem;
}
#login {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.cardb{justify-content: center;
  display: flex;
  align-items: center;
  height:5.2rem}
.card{height:4rem;
  width:88%;
  background-color:#fff;
  margin:auto;
  border-radius:0.3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.cardb .avatar{margin-top:0.3rem;
  position:relative;
  left:0.3rem
}
.namefan2{
  width: 6rem;
  font-size:16px;
  color:#434343;
  padding-top:0.5rem;
  margin-left:0.5rem;
  justify-content: center;
  overflow: hidden;
  align-items: center;
}
#artistWork{
  height: 2rem;
  font-size:16px;
  position: relative;
  left: 1.2rem;
}
#follow2{
  margin-top:0.5rem;
  left:0.4rem;
  width:3rem;
  height:1rem;
  border-radius:1rem;

}
.workshow{
  margin:auto;
  top:0;
  bottom:0;
  right:0;
  left:0;
  border-radius:0.3rem
}
.workname2{

  display: flex;
  justify-content: flex-end;
  height:1rem;
  width:4.5rem;

}
#workname2{
  font-size:0.4rem !important;
  font-weight: bold;
  line-height: 1.5rem;
  float: right;
  position: relative;
  left: 2.5rem;
  top:0.3rem;
}
.workClick2{
  height:1.5rem;
  width:4rem;
  text-align:right;
  float: right;
}


</style>
