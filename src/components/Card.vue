<template>


 <div class="ANFTCard">
      <van-image :src="'http://'+ANFT.s3" alt="" class="LargeNFTImg" fit="cover" height="7rem" width="8.5rem" @click.stop="preview"></van-image>
                    <p class="nftPrice2"> &nbsp;￥{{ANFT.price}}</p>
                     <div class="largeNftName"> &nbsp;{{ANFT.name}}
              <div class="rightTokenId">编号：{{ANFT.tokenId}}&nbsp;&nbsp;</div>
             </div>
                    <div class="nftAuthor2"><span class="leftAuthor2"> &nbsp;&nbsp;艺术家</span><div class="rightAuthor2"><van-icon name="manager" />{{ANFT.author}}&nbsp;&nbsp;</div></div>
                    <div class="nftPrice"> <span class="leftPrice">&nbsp;&nbsp;</span><div class="rightPrice">
					<van-button plain  class="buyButton" @click="buyButton(ANFT.tokenId)">购买</van-button>&nbsp;&nbsp;</div></div>
</div>



</template>


<script>
import { ImagePreview } from 'vant';
import axios from 'axios';
import { Toast } from 'vant';

 export default {
      name: "Card",
      props:['ANFT'],
      components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
	data(){
		return{
			balance:0,
		};
	},
	methods:{
		preview(){
			const img=[];
			img.push('http://'+this.ANFT.s3);
			ImagePreview({images:img,"swipe-duration":20})
		},
		async buyButton(tokenId){
			if(!localStorage.getItem("token")){
				Toast({
					message: '请先登录',
					position: 'top',
					});
					this.$router.push('/login');
					return;
			}else {
				let res=await axios({
					method: 'get',
					url: 'http://114.55.119.223/prod-api/api/user/wallet/getBalance',
					headers: {
					"Authorization": "Bearer " + localStorage.getItem('token')
					},
				});
				let balance=0;
				if(res.data.data.balance){
					this.balance=res.data.data.balance;
					balance=res.data.data.balance;
				}
				if(balance<this.ANFT.price){
				Toast({
					message: '余额不足',
					position: 'top',
					});
					this.$router.push('/layout/my');
					return;
				}else{
					//buy  api/user/nft/buy
					let res=await axios({
						method: 'post',
						url: 'http://114.55.119.223/prod-api/api/user/nft/buy',
						headers: {
						"Authorization": "Bearer " + localStorage.getItem('token')
						},
						data:{
							tokenId:tokenId,
						},
					});
						Toast({
						message: res.data.message,
						position: 'top',
						});
				}

			}
			
		},
	},
	created(){

	}
}


</script>

<style scoped>

 .van-popup--center{
  
     border-radius: 5px !important;
    
    box-shadow:0px 0px 10px rgb(0 0 0 / 30%);
}

.ANFTCard{
    width: 8.5rem;
  height: 12rem;
}



 .LargeNFTImg{
    
}
.nftPrice2{
  font-size:0.8rem;

  color: #F8A15B;
}
.largeNftName{
    font-size:0.5rem;
    font-weight: bold;
}
.nftAuthor2{
    height: 1.3rem;
}
.nftAuthor2 .leftAuthor2{
    font-size: 0.45rem;
}
.nftAuthor2 .rightAuthor2{
    font-size: 0.5rem;
    color: #585959;
    text-align: right;
    position: relative;
    bottom:0.5rem;
}
.ANFTCard .van-button{
    background-color: #006A79;
    height: 0.8rem;
    width: 1.8rem;
    color: white;
    font-weight: bold;
    border-radius: 5px;
}
.rightTokenId{
    font-size: 0.4rem;
    margin-top: 0.2rem;
    text-align: right;
    color: #ff9900;
    position: relative;
    bottom:0.63rem;
}
</style>
