<template>
<div class="doubleCards">
    <van-popup v-model="showPop" get-container="body" ><app-card :ANFT="ANFT"></app-card>
    </van-popup>


            <div id="scroll">
                <van-row gutter="0" type="flex" justify="space-between" v-for="(image, index) in fImages" :key="index">
                <van-col span="11" class="vanCol" >
                  <div class="NFTCards" @click="showPopup(image[0].tokenId)">
                    <van-image :src="'http://'+image[0].s3" alt="" class="NFTImg" fit="cover" height="3rem" width="4.3rem"></van-image>
                    <p class="nftName"> &nbsp;{{image[0].name}}</p>
                    <div class="nftAuthor"><span class="leftAuthor"> &nbsp;&nbsp;艺术家</span><div class="rightAuthor"><van-icon name="manager" />{{image[0].author}}&nbsp;&nbsp;</div></div>
                    <div class="nftPrice"> <span class="leftPrice">&nbsp;&nbsp;价值</span><div class="rightPrice">￥{{image[0].price}}&nbsp;&nbsp;</div></div>
                  </div>
                  
                  </van-col>
                <van-col span="11" class="vanCol" offset="5px">
                   <div class="NFTCards" @click="showPopup(image[1].tokenId)">
                    <van-image :src="'http://'+image[1].s3" alt="" class="NFTImg" fit="cover" height="3rem" width="4.3rem"></van-image>
                  <p class="nftName"> &nbsp;{{image[1].name}}</p>
                  <div class="nftAuthor"><span class="leftAuthor"> &nbsp;&nbsp;艺术家</span><div class="rightAuthor"><van-icon name="manager" />{{image[1].author}}&nbsp;&nbsp;</div></div>
                    <div class="nftPrice"> <span class="leftPrice">&nbsp;&nbsp;价值</span><div class="rightPrice">￥{{image[1].price}}&nbsp;&nbsp;</div></div>
                  </div>
                </van-col>
                
              </van-row>
              

            </div>
       
    </div>
    



</template>


<style>

  
  .NFTCards{
    width: 4.3rem;
    border-radius: 5px;
    box-shadow:0px 0px 10px rgb(0 0 0 / 30%);
  }
  .van-hairline--surround .van-tag--primary{
    background-color: #006a79;
  }
  .vanCol{
    height: auto;
    max-height:5rem;
    margin-bottom:1.3rem;
  }
  #scroll{
    width:94%;
    margin:0.5rem auto;
  }
  
  .van-image__loading{
    display: none !important;
  }
  .nftName{
    
    
    font-size: 0.5rem;
    color: #585959;
    font-weight: bold;
  }
  .nftAuthor{
    margin-top: 0.3rem;
    font-size: 0.35rem;
    color: #c8c7c7;font-weight:600;
    height: 0.6rem;
  }
  .nftPrice{
    font-size: 0.3rem;
    margin-top: 0.2rem; color: #c8c7c7;font-weight:600; 
     height: 0.6rem;
  }
  
  .rightAuthor{
    
    color: #585959;
    text-align: right;
    position: relative;
    bottom:0.4rem;
  }
  .rightPrice{
    font-size: 0.4rem;
    margin-top: 0.2rem;
    text-align: right;
    color: #ff9900;
    position: relative;
    bottom:0.63rem;
  }
 

</style>



<script>
import { Image ,ImagePreview } from 'vant';
import axios  from 'axios';
import Vue from 'vue'

  import Card from '@/components/Card'

    export default {
        props:['fImages','fAscNFTs','fDescNFTs','fNFTs'],
      components: {
          "app-card": Card,
    Image,
  },
  data() {
    return {
      flag:true,
     images:this.$route.query.images, 
      ANFT:{},
                showPop:false,
    };
  },
  methods: {
      preview(i){
       const img=[];
        img.push(this.images[i]);
        ImagePreview(img)
        },
     showPopup(id){
            this.showPop=true;
           // console.log(id)
            this.ANFT=this.fNFTs.find(v=>{
                return v.tokenId==id
            });
           //console.log(this.ANFT)
        },
    
  },
};

</script>