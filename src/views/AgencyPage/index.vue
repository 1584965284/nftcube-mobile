<template>
  <div>
    <van-popup v-model="showPop" get-container="body" closeable><app-artist2 :artist="oneArtist" :nfts="arr"></app-artist2></van-popup>

    <van-nav-bar class="navBar"
                 title="机构"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft"
    />
    <div>

      <div class="artistCard">
        <div class="artistAvatar">
          <van-image
              round
              width="1.7rem"
              height="1.7rem"
              :src="'http://114.55.119.223:8000'+artist.avatar"
              @click="preview('http://114.55.119.223:8000'+artist.avatar)"
          />
        </div>

        <p class="artistName">{{artist.name}}</p>
        <van-divider
            :style="{ color: '#177785', borderColor: '#177785', padding: '0 16px' }"
        >
          描述
        </van-divider>

        <div class="artistDescription">{{artist.description}}</div>
        <van-divider
            :style="{ color: '#177785', borderColor: '#177785', padding: '0 16px' }"
        >
          艺术家
        </van-divider>
        <div class="cardsZone">
          <div v-for="(one,index) in list" :key="index" style="width: 100%;margin-bottom: 1rem;">
            <app-artist :fatherArtist="one"></app-artist>
          </div>
        </div>



      </div>



    </div>
  </div>


</template>

<script>
import axios from 'axios';
import Nftswiper from '@/components/Nftswiper';
import Artist from '@/components/ArtistListOne'

import { ImagePreview } from 'vant';
import ArtistCard from "@/components/ArtistCard";

export default{
  components: {"app-artist": Artist,"app-artist2":ArtistCard,},
  data(){
    return{
      artist:{},
      name:this.$route.query.name,
      list:[],
    }
  },
  methods:{
    onClickLeft(){this.$router.push('/layout/artists')},
    preview(avatar){
      const img=[];
      img.push(avatar);
      ImagePreview({images:img, closeable: true,})
    },
  },
  async created() {
    let res=await axios({
      method: 'post',
      url: 'http://114.55.119.223/prod-api/api/agency/getAgencyInfo',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      data:{name:this.name}
    })
    if(res.data.errCode===0){
      this.artist=res.data.data.res;
    }

    let resArtists=await axios({
      method: 'post',
      url: 'http://114.55.119.223/prod-api/api/agency/getMembers',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      data:{name:this.name}
    })
    if(resArtists.data.errCode===0){
      this.list=resArtists.data.data.res;
    }
  }

}
/*  <p><van-icon name="friends" /><van-icon name="like" /></p>*/
</script>

<style scoped>
.artistCard{
  width:100%;
}
.artistName{
  text-align: center;
}
.artistAvatar{
  width: 1.7rem;
  margin: 0.5rem auto 0rem;

}
.artistDescription{
  font-size: 0.4rem;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
}


</style>