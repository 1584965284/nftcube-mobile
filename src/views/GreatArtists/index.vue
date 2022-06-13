<template>
    <div>
<van-popup v-model="showPop" get-container="body" closeable><app-artist :artist="oneArtist" :nfts="arr"></app-artist></van-popup>
       
         <van-swipe :autoplay="3000" class="artistsSwipe" indicator-color="#198391">
  <van-swipe-item v-for="(artist, index) in artists" :key="index" @click.stop="preview(artist)">
    <van-image
  width="2rem"
  height="2rem"
  :src="'http://114.55.119.223:8000'+artist.avatar"
  class="avatar"
  round
/>
<div class="artistName">{{artist.username}}</div>
  </van-swipe-item>
</van-swipe>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'
import { Lazyload } from 'vant';
import { ImagePreview } from 'vant';
import Nftswiper from '@/components/Nftswiper';
import ArtistCard from '@/components/ArtistCard';

Vue.use(Lazyload);
 export default{
   components: {
	        "app-swiper": Nftswiper,
			"app-artist":ArtistCard,
	  Image,
	  
	},
        data(){
            return{
                artists: [],
                nfts:[],
                arr:[],
                oneArtist:{},showPop:false,
        };
        },
        created(){
        axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/market/getAritists',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{
            "num": 30,
        }        
      }).then(
        res=>{
            let artists=res.data.data.aritists;
            console.log(artists)
            
              this.artists=artists;
            
          
        }
      )
      
    },
    methods:{
      async preview(artist){
           this.showPop=true;
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
        },
    },
   

    }
</script>

<style scope>
.avatar{
    position: relative;
    left: 3.5rem;
}
.artistName{
    font-size:0.6rem;
    text-align: center;
    width: 80%;
    overflow: hidden;
    margin: 0 auto;
    
}
.artistsSwipe{
    height:5rem;
    margin: 1rem auto;
}
.artistsSwipe .van-swipe__indicators{
  //width: 100%;
}
</style>