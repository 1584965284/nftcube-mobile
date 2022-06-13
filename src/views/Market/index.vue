<template>
<div>

    <div>
        <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="搜索市场"
            @search="onSearch"
            @cancel="onCancel"
        />
        </form>
    </div>
    
        
    <div class="content">
              <a href="javascript:;" class="price" @click="ascOrder">价格<van-icon name="arrow-up" /></a><a href="javascript:;" class="price" @click="descOrder">价格<van-icon name="arrow-down" /></a>
              <van-button type="primary" class="selectButton" @click="changeView">视图</van-button>  
              <van-button type="primary" class="selectButton" id="selectButton2" @click="selectButton2">筛选</van-button>
          <div class="selectArea" id="selectArea">
                <div class="van-hairline--surround" >
                  
                  <div class="van-hairline--top-bottom">
                    <div class="selectItem">
                        <span v-for="(label,index) in labels" :key="index" style="margin-right:0.1rem">
                    <van-tag v-if="show[index]==true" closeable size="large" type="primary" @close="close(index)" >{{label.name}}</van-tag>
                    </span>


                    </div>
                    
                  </div>
                    
                </div>

            </div>
              
      </div>
          
     
              
<div><router-view v-bind:fImages="images" :fAscNFTs="ascNFTs" :fDescNFTs="descNFTs" :fNFTs="nfts">
</router-view></div> 
       
</div>

</template>

<script>
import { Image } from 'vant';
import axios  from 'axios';
    export default {
      components: {
    Image,
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
            this.nfts=res.data.data.nfts;
            let x=0;
            //console.log(this.nfts)
            for(let i=0;x<nft.length;++i){
              let a=[];
                for(let j=0;j<2;++j)
                {
                  if(x<nft.length){
                    a.push(nft[x])
                  }else{
                    a.push({empty:true,
                s3:'gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F08%2F20170808104131_i4TJ3.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654200231&t=77915ddbc53cc89eb6c3371bd5cb79cd',
              });
                  }
                  ++x;
                }
                this.images.push(a);
                
            }
           //console.log(this.images)
           nft.sort(function(a,b){
             return a.price-b.price;
           });
           let [...aArr]=nft;
           this.ascNFTs=aArr;
           //console.log(this.ascNFTs);
           nft.sort(function(a,b){
             return b.price-a.price;
           });
           let [...bArr]=nft;
           this.descNFTs=bArr;
          // console.log(this.descNFTs)
           
        }
      );
      axios({
          method: 'post',
          url: 'http://114.55.119.223/prod-api/api/market/getLabel',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
           
      }).then(res=>{
          if(res.data.errCode==0){
              let labels=res.data.data.label;
              this.labels=res.data.data.label;
              for(let i=0;i<labels.length;++i){
                this.show.push(true);
              }
      }
      })
     this.$router.push('/layout/market/double'); 
    },
   
  data() {
    return {
      show:[], labels:[],
      showSheet:true,
      flag:true,
     images:[],
     nfts:[], 
     ascNFTs:[],
     descNFTs:[],
     double:true,
    };
  },
  methods: {
    close(index) {
      console.log(this.show)
      //this.show[index]= false;
      this.$set(this.show, index, false)
      console.log(this.show)
    },
    onSheet(){
      this.activeNames='2'
    },
    selectButton2(){
      if(this.flag){
        document.getElementById('selectArea').className='showSelectArea';
        this.flag=!this.flag;
      }
      else{
        document.getElementById('selectArea').className='selectArea';this.flag=!this.flag;
      }
      
      
    },
    onSearch(){},
    onCancel(){},
    changeView(){
      if(this.double==true){

        this.double=!this.double;
        this.$router.push({ path: '/layout/market/single', query: { nfts:this.nfts,ascNFTs:this.ascNFTs,descNFTs:this.descNFTs } })
      
      }else{
        this.double=!this.double;
        this.$router.push({ path: '/layout/market/double', query: { images:this.images,ascNFTs:this.ascNFTs,descNFTs:this.descNFTs } })
      
      }
    },
    ascOrder(){
      let ascImages=[];
       let x=0;
            for(let i=0;x<this.ascNFTs.length;++i){
              let a=[];
                for(let j=0;j<2;++j)
                {
                  if(x<this.ascNFTs.length){
                    a.push(this.ascNFTs[x])
                  }else{
                    a.push({empty:true,
                s3:'gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F08%2F20170808104131_i4TJ3.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654200231&t=77915ddbc53cc89eb6c3371bd5cb79cd',
              });
                  }
                  ++x;
                }
                ascImages.push(a);
            }


      this.images=ascImages;
      this.nfts=this.ascNFTs;
      
    },
    descOrder(){
      let descImages=[];
       let x=0;
            //console.log(this.nfts)
            for(let i=0;x<this.descNFTs.length;++i){
              let a=[];
                for(let j=0;j<2;++j)
                {
                  if(x<this.descNFTs.length){
                    a.push(this.descNFTs[x])
                  }else{
                    a.push({empty:true,
                s3:'gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F08%2F20170808104131_i4TJ3.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654200231&t=77915ddbc53cc89eb6c3371bd5cb79cd',
              });
                  }
                  ++x;
                }
                descImages.push(a);
                
            }

            this.images=descImages;
             this.nfts=this.descNFTs;
    },
  },
};

</script>



<style>
.selectArea{
  display: none;
}
.showSelectArea{
  visibility: visible;
}
.selectItem {
  padding-left: 0.5rem;
  margin: 0 auto;
  text-align: left;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.price{
  font-size: 0.4rem;
  color:#006a79;
  font-weight:1000;
  display: block;
  float: left;
  margin: 0.4rem 0rem 0.4rem 1.2rem;
}
.content .van-button--primary{
  background-color: #006a79;
  border:#006a79 solid 0.02667rem ;
  font-weight: bold;
  border-radius: 8px;
  height: 0.85rem;
  margin-left: 0.7rem;
  position: relative;
  bottom: 0.2rem;
}

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

