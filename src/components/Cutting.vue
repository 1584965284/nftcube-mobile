<template>

     <div class="cropper-container">
         <van-loading v-show="loadingShow" size='50' color="#fff" vertical text-color='#fff'>上传中...</van-loading>
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.outputSize"
        :outputType="option.outputType"
        :info="option.info"
        :full="option.full"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :fixed="option.fixed"
        :fixedNumber="option.fixedNumber"
        :centerBox="option.centerBox"
        :infoTrue="option.infoTrue"
        :fixedBox="option.fixedBox"
        :high="option.high"
        :mode="option.mode"
      />
      <van-nav-bar
        left-text="取消"
        right-text="选择"
        @click-left="onClickLeft"
        @click-right="getCropBlob"
          />
    </div>


</template>

 <script> 
import { VueCropper } from 'vue-cropper' 
import axios from 'axios';
import { Toast } from 'vant';

export default {
 name: 'uploadAva',   
 components: {
    VueCropper   
 },   
 props:['fatherImg'],
 data () {
    return {
        show: true, // 上传类型的弹窗
        imageFileName: '',
        showCropper: false, // 裁剪的弹窗
        option: {
        img:this.fatherImg,
            outputSize: 0.8,
            info: false, // 裁剪框的大小信息
            outputType: 'jpeg', // 裁剪生成图片的格式
            canScale: true, // 图片是否允许滚轮缩放
            autoCrop: true, // 是否默认生成截图框
            autoCropWidth: window.innerWidth - 100 + 'px', // 默认生成截图框宽度
            autoCropHeight: window.innerWidth - 100 + 'px', // 默认生成截图框高度
            high: true, // 是否按照设备的dpr 输出等比例图片
            fixedBox: false, // 固定截图框大小 不允许改变
            fixed: true, // 是否开启截图框宽高固定比例
            fixedNumber: [1, 1], // 截图框的宽高比例
            full:false, // 是否输出原图比例的截图
            canMoveBox: true, // 截图框能否拖动
            original: false, // 上传图片按照原始比例渲染
            centerBox: true, // 截图框是否被限制在图片里面
            infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            mode: '100% auto' // 图片默认渲染方式
        },
        loadingShow: false, // 是否展示loading
    }   
 },   
 methods: {
   async getCropBlob () {
        // let formData = new FormData()
        this.loadingShow = true
        this.$refs.cropper.getCropBlob(async data => {
            let formdata=new FormData();
         formdata.append('file',data)
          console.log(formdata);
          let res= await  axios({
		         method: 'post',
		         url: 'http://114.55.119.223/prod-api/api/user/avatar',
		         headers: {
		           "Authorization": "Bearer " + localStorage.getItem('token')
		       },
		   		 data: formdata,
		});
		if(res.data.errCode===0){
			Toast({message: '修改头像成功',position: 'top',});
			this.avatar='http://114.55.119.223:8000'+res.data.data.url;
			location.reload();
		}else{
			Toast({message: '修改头像失败',position: 'top',});
            location.reload();
		} 
        })
    },
    onClickLeft () {
				this.$emit('callBack',1,false);
                location.reload();
			},
    
  },
}
 </script> 
 
 <style lang="less" scoped>
//  .uploder{
//    overflow: hidden;
//  }
 /deep/.cropper-view-box{
   outline:2px dashed #fff !important;
 }
 .crop-point{
   background-color: auto !important;
 }
 /deep/.van-loading{
   position: absolute;
  //  color: red;
   z-index: 9999;
   left: 50%;
   top: 50%;
   margin-left: -55px;
   margin-top: -30px;
   background: rgba(0, 0, 0, 0.3);
   padding: 10px 30px;
   border-radius: 25px;
 }
 .change-photo-setter {
    width: 400px;
    background: #fff;
    position: absolute;
    top: 11%;
    left: 40px;
    z-index: 300;
    .sett-item{
      width: 100%;
    }
    /deep/.van-uploader__input-wrapper{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      img{
        width: 40px;
        height: 40px;
        display: block;
      }
    }
    .sett-item:first-child{
      border-bottom: 2px solid #ccc;
    }
  }
  
  

 
 .vue-cropper {
    background: #000;
     width: 8rem !important;
     height: 8rem !important;
    padding-top: 46px;
    box-sizing: border-box;
    position: relative;   
    } 

 
 </style> 