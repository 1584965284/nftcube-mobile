<template>
<div>
<div id="singleScroll">
    <div  v-for="(nft, index) in fNFTs" :key="index">
        <app-card :ANFT="nft"></app-card>
    </div>

</div>

<p> &nbsp;</p>
<p> &nbsp;</p>


</div>

</template>



<script>
import { Image ,ImagePreview } from 'vant';
import axios  from 'axios';
import Vue from 'vue'

  import Card from '@/components/Card'

    export default {
        props:['fAscNFTs','fDescNFTs','fNFTs'],
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
    
  },
};

</script>

<style>
.singleScroll{
    margin: 0.5rem auto;
}
#singleScroll .ANFTCard{
    width: 8.5rem;
    border-radius: 5px !important;
    height: 12rem;
    box-shadow:0px 0px 10px rgb(0 0 0 / 30%);
    margin: 0.5rem auto;
  
}
</style>