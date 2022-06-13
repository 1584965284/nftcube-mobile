<template>
  <div>
    <div style="margin-top:0.3rem;">
      <van-button type="primary" class="topBtn" @click="changeView">{{ topBtn }}</van-button>
    </div>
    <div style="position: absolute;top:2rem;">
      <app-artists v-if="isArtists"></app-artists>
      <app-agency v-else></app-agency>
    </div>
  </div>
</template>

<script>
import Artists from "@/components/Artists";
import Agencies from '@/components/Agencies'
export default {
  components:{
    'app-artists':Artists,
    'app-agency':Agencies,
  },
  data(){
    return{
      topBtn:'查看机构',isArtists:true,
    }
  },
  methods:{
    changeView() {
      if(this.isArtists===true){
        this.isArtists=!this.isArtists;
        this.topBtn='查看艺术家';
      }else{
        this.isArtists=!this.isArtists;
        this.topBtn='查看机构';

      }
    },
  },
}
</script>

<style>
.topBtn{
  height: 1rem !important;
  background-color:#006c79 !important;
  border-radius:15px !important;
  border: transparent !important;
  margin-left: 1rem !important;
  position: absolute;
  z-index: 999;
}
</style>