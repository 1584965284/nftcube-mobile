<template>


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
   
        <p class="artistName">{{artist.username}}</p>
      <van-divider
            :style="{ color: '#177785', borderColor: '#177785', padding: '0 16px' }"
            >
            描述
            </van-divider>

        <div class="artistDescription">{{artist.description}}</div>
        <van-divider
            :style="{ color: '#177785', borderColor: '#177785', padding: '0 16px' }"
            >
            作品
            </van-divider>

        <app-swiper :nfts="nfts"></app-swiper>

</div>



</template>

<script>
import axios from 'axios';
import Nftswiper from '@/components/Nftswiper';
import { ImagePreview } from 'vant';

export default{ 
    components: {"app-swiper": Nftswiper,},
     props:['artist','nfts'],
    data(){
        return{
            
        }
    },
    methods:{
        preview(avatar){
			const img=[];
			img.push(avatar);
			ImagePreview({images:img, closeable: true,})
		},
    }
    	
}
/*  <p><van-icon name="friends" /><van-icon name="like" /></p>*/
</script>

<style scoped>
.artistCard{
    width:9rem !important;
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