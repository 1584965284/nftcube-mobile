<template>
	<div id="my-order">
	<van-checkbox-group v-model="result" :key="item"
		      :title="`复选框 ${item}`"
		      @click="toggle(index)" v-for="(item, index) in list">
 <van-cell-group>
		 <van-cell clickable> 

			<van-card
			  num="2"
			  tag="标签"
			  price="2.00"
			  desc="描述信息"
			  title="商品标题"
			  thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
			  origin-price="10.00"
			  v-for="(item, index) in list"
			  clickable
			  :key="item"
			  @click="toggle(index)"
			>
			
			</van-card>
		     
		</van-cell>
	   

	  </van-cell-group>
	  <template #right-icon>
		        <van-checkbox :name="item" ref="checkboxes" />
		 </template>
	</van-checkbox-group>
		

	<van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" style="position:fixed">
	  <van-checkbox v-model="checked">全选</van-checkbox>
	  <template #tip>
	    虚拟产品不支持无理由退换, <span @click="onClickEditAddress">《CUBE用户合约》</span>
	  </template>
	</van-submit-bar>
	</div>
	
</template>

<script>
	import axios from 'axios';

	export default {
	  data() {
	    return {
	      list: [1,2,3,4,5,6],
	      result: [],
		  radio: '1',
	    };
	  },
	  methods: {
		  
		  onLoad() {
		    // 异步更新数据
		    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
		    setTimeout(() => {
		      for (let i = 0; i < 10; i++) {
		        this.list.push(this.list.length + 1);
		      }
		  	
		      // 加载状态结束
		      this.loading = false;
		  	
		      // 数据全部加载完成
		      if (this.list.length >= 40) {
		        this.finished = true;
		      }
		    }, 1000);
		  },
	    toggle(index) {
	      this.$refs.checkboxes[index].toggle();
	    },
	  },
	};
</script>

<style>
	#my-order{
		width: 8.5rem;
		  
		height: 70%;
	}
</style>
