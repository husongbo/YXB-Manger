<template>
	<view class="parent-view" @touchstart="touchstart" @touchmove="touchmove">
	<view class="uni-list">
		<navigator animation-type="pop-in" animation-duration="300" url="../Helpfeed/Trap/Trap" open-type="navigate">
	    <view class="uni-list-cell" hover-class="uni-list-cell-hover" >
	        <view class="uni-list-cell-navigate uni-navigate-right" >
	            <image style="width: 50upx; height: 45upx" src="../../../static/myicon/nav_icon_quancun.png"></image>
				<view class="uni-media-list-text-top">什么是圈存</view>
	        </view>
	    </view>
		</navigator>
		<navigator animation-type="pop-in" animation-duration="300" url="../Helpfeed/RulesVouchers/RulesVouchers" open-type="navigate">
		<view  class="uni-list-cell" hover-class="uni-list-cell-hover" >
		    <view class="uni-list-cell-navigate uni-navigate-right" >
		        <image style="width: 50upx; height: 45upx" src="../../../static/myicon/nav_icon_guize.png"></image>
				<view class="uni-media-list-text-top">优惠券使用规则</view>
		    </view>
		</view>
		</navigator>
		<navigator animation-type="pop-in" animation-duration="300" url="../Helpfeed/Invoicede/Invoicede" open-type="navigate">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
		    <view class="uni-list-cell-navigate uni-navigate-right" >
		        <image style="width: 50upx; height: 45upx" src="../../../static/myicon/nav_icon_shuoming.png"></image>
				<view class="uni-media-list-text-top">发票说明</view>
		    </view>
		</view>
		</navigator>
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
			};
		},
		onLoad(){
// 			var ws=plus.webview.currentWebview();
// 			alert('窗口标识: '+ws.id);
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
.uni-list-cell-navigate{
	padding: 14px 15px;
}
.uni-media-list-text-top{
	padding-left: 20upx;
}
.uni-list-cell-navigate.uni-navigate-right:after{
	content: '';
}
.parent-view{
	height: calc(100vh - 44px);
	overflow-y: hidden;
}
</style>
