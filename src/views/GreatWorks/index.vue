<template>
    <div>
<van-popup v-model="showPop" get-container="body" >

<app-card :ANFT="ANFT"></app-card>
</van-popup>
      
        <van-swipe :autoplay="3000" indicator-color="#198391">
  <van-swipe-item v-for="(image, index) in images" :key="index" @click="showPopup(index)" class="lazySwipe" >
    <van-image v-lazy="image"  :src="image" class="lazy" fit="cover" height="6rem" width="7rem"></van-image>
    
  </van-swipe-item>
</van-swipe>
    </div>
</template>


<script>
//@click.stop="preview(index)"
import axios from 'axios';
import Vue from 'vue'
import { Lazyload } from 'vant';
import { ImagePreview } from 'vant';

  import Card from '@/components/Card'


Vue.use(Lazyload);

    export default{
        components: {
        "app-card": Card,
    
            },
        created(){
        axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/market/getNFTs',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        data:{
            "status": {
                "sold": true,
                "labels": [
                    "ArtProduct"
                ]
            },
            "minPrice": "",
            "maxPrice": "",
            "num": 30
        }        
      }).then(
        res=>{
            let nft=res.data.data.nfts;
            this.nfts=nft;
           // console.log(nft)
            for(let i=0;i<nft.length;++i){
                this.images.push('http://'+nft[i].s3)
            }
          
        }
      )
      
    },
      data(){
            return{
                 images: [],
                nfts:[],
                ANFT:{},
                showPop:false,
        };
        },
    methods:{
         preview(i){
       const img=[];
        img.push(this.images[i]);
        ImagePreview(img)
        },
        showPopup(index){
            this.showPop=true;
            this.ANFT=this.nfts[index];
           console.log(this.ANFT)
        },
    },
   

    }

</script>


<style>
.lazySwipe{
 
}
    .lazy{
        margin:0.8rem auto;
        position: relative;
        left:1rem;
    }

</style>