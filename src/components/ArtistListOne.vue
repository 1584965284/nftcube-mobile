<template>
  <div>
    <van-popup v-model="showPop" get-container="body" closeable><app-artist2 :artist="artist" :nfts="arr"></app-artist2></van-popup>

          <div id="card" class="card">
            <div class="artistAvatar">
              <van-image
                  round
                  width="1.7rem"
                  height="1.7rem"
                  :src="'http://114.55.119.223:8000'+artist.avatar"
                  class="avatar"
                  @click="preview('http://114.55.119.223:8000'+artist.avatar)"
              />
            </div>

            <div class="namefan">
              <p id="name" color="#3f3f3f">{{artist.username}}</p>
              <p id="fansNum" color="#3f3f3f">粉丝：{{artist.fansNum}}</p>


            </div>
            <van-button  type="primary" class="follow" id="follow" color="#177785" @click="unFollow(artist.address)" v-if="artist.isFollow">取消关注</van-button>
            <van-button icon="plus" type="primary" class="follow" id="follow" color="#177785" @click="follow(artist.address)" v-else>关注</van-button>

            <div  class="workname" id="artistWork">
              <div class="workClick" @click="workClick(artist)">
                <span id="workname" style="font-size:13px" color="#3f3f3f">作品数：{{artist.work_num}}&nbsp;&nbsp;<van-icon name="arrow" /></span>

              </div>
            </div>

            <div @click="onLike()" id="likeIcon">
              <van-icon name="like"  v-if="artist.isLike===false" id="likeIcon1"/>
              <van-icon name="like" id="unLikeIcon" v-else/>&nbsp;
              <span>{{artist.likeMe}}</span>
            </div>
          </div>

  </div>


</template>

<script>
import axios from 'axios';
import {ImagePreview, Toast} from 'vant';
import Nftswiper from '@/components/Nftswiper';
import ArtistCard from '@/components/ArtistCard';

export default {
  components: {"app-artist2":ArtistCard,},

  props:['fatherArtist'],
  data(){
    return{
      artist:this.fatherArtist,
      artistsNum:0,
      arr:[],
      followBtn:'关注',
      showPop:false, finished:false,loading:false,refreshing:false,
      oneArtist:{},count:1,sum:0,
    }

  },



  methods: {

    async workClick(artist){
      this.oneArtist=artist;

      let res=await axios({
        method: 'post',
        url: 'http://114.55.119.223/prod-api/api/market/getNFTs',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{
          status:{
            creater:artist.address
          },
          maxPrice:'',minPrice:'',
        },

      });
      // console.log(res)
      //console.log(res.data.data.nfts)
      this.arr=res.data.data.nfts;
      this.showPop=true;
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
    onLike(toAddress){
      if(!localStorage.getItem("token")){
        Toast({
          message: '请先登录',
          position: 'top',
        });
        this.$router.push('/login');
        return;
      }

      if(this.artists.isLike===false){
        this.artists.likeMe=this.artists.likeMe+1;
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
        this.artists.likeMe=this.artists.likeMe-1;
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
      this.artists.isLike=! this.artists.isLike;


    },
    follow(toAddress){
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
        url: 'http://114.55.119.223/prod-api/api/user/interact/follow',
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
              this.artist.fansNum++;
              this.artist.isFollow=!this.artists.isFollow;
              Toast({
                message: '关注成功',
                position: 'top',
              });
            }else{
              Toast({
                message:res.data.message,
                position: 'top',
              });
            }

          }
      )

    },
    unFollow(toAddress){
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
              this.artists.fansNum--;
              this.artists.isFollow=!this.artists[index].isFollow;
              Toast({
                message: '取关成功',
                position: 'top',
              });
            }

          }
      )

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
.avatar{margin-top:0.3rem;
  position:relative;
  left:0.3rem
}
.namefan{
  width: 3.5rem;
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
#follow{
  margin-top:0.5rem;
  left:0.4rem;
  width:2.4rem;
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
.workname{

  display: flex;
  justify-content: flex-end;
  height:1rem;
  width:4.5rem;

}
#workname{
  font-size:0.4rem !important;
  font-weight: bold;
  line-height: 1.5rem;
  float: right;
  position: relative;
  left: 2.5rem;
  top:0.3rem;
}
.workClick{
  height:1.5rem;
  width:4rem;
  text-align:right;
  float: right;

}
#like{
  margin-top:0.1rem;
  margin-left:2.5rem;
  border-radius:1rem;
  height:2rem;
  position: relative;
  right: 2.5rem;
}
#likeIcon{

  font-size:0.55rem;
  color:#cecccd ;
  display: flex;
  justify-content: flex-start;
  width:2rem;
  align-items:center;
  position: relative;
  right: 3.8rem;

}
#likeIcon span{
  font-size: 0.45rem;
}
#likeIcon #likeIcon1{
  color:#cecccd !important;
}
#likeIcon #unLikeIcon {
  color:#d81e06 !important;
}

</style>
