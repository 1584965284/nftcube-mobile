

<template>
    <div>
		
		<van-empty description="无内容" v-if="this.nfts.length==0" style="width:6rem;margin: 0 auto;">
		 
		</van-empty>

        <van-swipe :autoplay="3000" indicator-color="#198391"  class="my-swipe" v-else>
  <van-swipe-item v-for="(nft, index) in nfts" :key="index" @click="showPopup(index)">
     <app-card :ANFT="nft"></app-card>
  </van-swipe-item>
</van-swipe>

    </div>
</template>

<script>
	import Card from '@/components/Card';
	import axios from 'axios';
	
	 export default {
	       components: {
	                "app-card": Card,
	          Image,
	        },
			props:['nfts'],
	       data() {
	         return {
	           images:[],
	           ANFT:{},
	           showPop:false,
			   empty:false,
	         };
	       },
		   created(){
			   console.log(this.nfts)
			   if(this.nfts.length==0){
				   this.empty=true;
			   }
		   },
	       methods: {
	        show(){
				this.$refs.swipe.resize();
			},
	          showPopup(){
	                 this.showPop=true;
	                // console.log(id)
	                 this.ANFT=this.fNFTs.find(v=>{
	                     return v.tokenId==id
	                 });
	                //console.log(this.ANFT)
	             },
	         
	       },
	    }
	
</script>

<style>
	.my-swipe{width: 8.5rem;
    
  height: 12rem;
  margin:auto;
}
.bottom-button {
	    width: 160px;
	    height: 40px;
	  }
</style>
