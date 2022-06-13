<template>
	<div id="my-list">
<van-popup v-model="showPop" get-container="body" closeable><app-artist :artist="artist" :nfts="arr"></app-artist></van-popup>
		<van-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
		<van-cell value="更多" is-link v-for="(item,index) in list" :key="index" @click="showArtist(item)">
		  <!-- 使用 title 插槽来自定义标题 -->
		  <template >
			 <van-image
				width="1.3rem"
				height="1.3rem" cover round  style="float:left"
				:src="'http://114.55.119.223/prod-api'+item.avatar"
				/>
		<div style="float:left; margin-left:0.5rem;">
			<div style="display:flex; overflow: hidden; width: 5rem;">
			 <span class="custom-title"  style="display:inline-block; text-overflow: ellipsis;
			  overflow: hidden;width:4rem;white-space: nowrap; font-weight:bold;">{{item.username}}</span>
			</div>
			<div style="display:flex;text-overflow: ellipsis; 
			overflow: hidden; width:4.5rem; height: 0.7rem;">
		    <span class="custom-title"  style="display:inline-block; text-overflow: ellipsis;
			 overflow: hidden;width:4.5rem;white-space: nowrap; font-size: 0.31rem;">{{item.description}}</span>
			</div>
		</div>
		<!--
		 <van-button type="info" class="settingBtn" @click="listBtn" style="position: absolute;right: 0.15rem;top: 0.15rem;">设置</van-button>

		-->
		  </template>
		  
		</van-cell>
		  
		</van-list>
	</div>
</template>	

<script>
import axios from 'axios';
import ArtistCard from '@/components/ArtistCard';
import Nftswiper from '@/components/Nftswiper';

export default {
    components: {
      "app-swiper": Nftswiper,
			"app-artist":ArtistCard,
    Image,

	},  
		props:['fatherList','listNum'],
    data() {
	    return {
	      loading: false,
	      finished: false,showPop:false,arr:[],artist:[],count:2,
		  list:this.fatherList, num:this.listNum,
	    };
	  },
	  methods: {
	   async onLoad() {
	      // 异步更新数据
			 //    1 follow    
		this.isShowList=true;
				console.log(1)
				let followRes= await  axios({
		         method: 'post',
		         url: 'http://114.55.119.223/prod-api/api/user/interact/getFollows',
		         headers: {
		           "Authorization": "Bearer " + localStorage.getItem('token')
		       		},
				 data:{
					 page:this.count,num:10,
				 },
				});
				if(followRes.data.errCode==0){
					let arr=followRes.data.data.follow;
					arr=arr.filter(function (s) {
							return s;
						});
					if(arr.length==0){
						this.count=2;
						this.finished = true;
					}else{
						this.list=this.list.concat(arr);
						this.count=this.count+1;

					}
				}
			
	
	        // 加载状态结束
	        this.loading = false;
	
	        // 数据全部加载完成
	       
	    },
		
		async showArtist(artist){
			this.artist=artist;
			
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
	  },
	  created(){
	  }
	};
</script>

<style>
	#my-list{
		width: 8.5rem;
		height: 70%;
	}
</style>
