<template>
	<view class="list-parent" @touchstart="touchstart" @touchmove="touchmove">
	<view class="uni-list">
	    <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
	        <view class="uni-list-cell-navigate uni-navigate-right">
	            <image style="width: 50upx; height: 45upx" :src="item.src"></image>
				<view class="uni-media-list-text-top">{{item.name}}</view>
	        </view>
	    </view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				list:[
					{
						name:'面对面售卡',
						src:'../../../static/myicon/icon_zcxx.png',
						url:''
					},
					{
						name:'客户经理二维码',
						src:'../../../static/myicon/icon_zcxx.png',
						url:''
					},
					{
					name:'卡包售卡',
					src:'../../../static/myicon/icon_zcxx.png',
					url:'',
					}
				]
			};
		},
		methods:{
			touchstart(event){
				event.preventDefault();
　　　　			this.startX = event.touches[0].pageX
			},
			touchmove(event){
				event.preventDefault();
		　　　　this.moveEndX = event.touches[0].pageX
				this.valueX= this.moveEndX - this.startX
				if ( this.valueX >= 80 ) {
						uni.navigateBack({
							delta:1,
							animationType: 'pop-in',
							animationDuration: 200
						})	
		　　　　}
			}
		}
	}
</script>

<style scoped>
.uni-media-list-text-top{margin-left: 30upx;}
.list-parent{
	height: 100%;
}
</style>
