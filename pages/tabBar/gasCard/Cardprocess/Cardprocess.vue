<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="card">
			<view class="card-content">
				<image src="../../../../static/gasCard/cardimg.png" mode="" style="border: 0;width: 100%;height: 100%;"></image>
			</view>
			<view class="card" style="background-color: #FFFFFF;">
				<view class="card-contents">
					<view class="card-header">
						<view style="width: 100%;">
							<image src="../../../../static/gasCard/lc.png" mode="" style="width: 5%;height: 30upx;float: left;position: relative;top:15upx;margin-right: 10upx;"></image>
							<span style="float: left;font-size:0.9rem;">油卡丢失补办流程</span>
						</view>
					</view>
					<view class="card-contents">
						<view class="card-content-inner">
							<view>
								<span class="txt-color">1.</span>
								<span>联系油信宝客服(400-682-0086)，说明丢失卡主的个人信息。</span>
							</view>
							<view>
								<span class="txt-color">2.</span>
								<span>客服为用户补办新卡，并将新卡邮寄用户手中。</span>
							</view>
							<view>
								<span class="txt-color">3.</span>
								<span>用户收到新卡后，油信宝把之前回圈的钱重新分配到新卡中。</span>
							</view>
							<view>
								<span class="txt-color">4.</span>
								<span>已圈存过的油卡，补办新卡后需要重新圈存，在7个工作日后使用。</span>
							</view>
						</view>
					</view>
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

<style>
.content{
	position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
	height:100%;
	background: white;
	padding-top: 0.5rem;
}
.card {
    margin: 0.5rem;
    position: relative;
    border-radius: 0.1rem;
    font-size: 0.7rem;
}
.card-content {
    position: relative;
	height: 158px;
}
.card-contents{
	position: relative;
}
.card-header{
	border-radius: 0.1rem 0.1rem 0 0;
    font-size: 0.85rem;
    font-weight: bold;
	min-height: 2.2rem;
    position: relative;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.card-header:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
}
.card-content-inner {
    padding: 0.75rem;
    position: relative;
}
.txt-color {
    font-weight: bold;
    color: #ff8200;
}
</style>
