<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="card">
			<view class="card-content">
				<view class="card-content-inner">
					加油卡是脱机消费的方式，并没有联接网络的属性，圈存是将用户账户中已存入的资金划转到所持有的加油卡上的一种必要步骤。
					用户充值成功后，需前往加油卡品牌所属的任意加油站，
					对加油员工说：“我在网上充值后，请帮我圈存一下”或使用加油站内的圈存机按说明进行操作，只需1分钟就可以完成操作。
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card-header">温馨提示</view>
			<view class="card-content">
				<view class="card-content-inner">
					部分城市无法实现异地圈存，如用户计划出行请提前做好圈存工作，以免遇到异地无法圈存的情况，影响使用。
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
						return;　	
			　　　　}
			　　　　else if ( this.valueX < 0 ) {
			　　　　　　return
			　　　　}
			　　　　else{
			　　　　　　return
			　　　　}
				}
			}
	}
</script>

<style scoped>
.content{
    overflow: auto;
	height:100%;
	background: white;
	padding-top: 1rem;
}
.card{
	background: #fff;
    box-shadow: 0 0 0.6rem rgba(136, 130, 129, 0.3);
    margin: 0.5rem;
    position: relative;
    border-radius: 0.4rem;
    font-size: 0.7rem;
	margin-top: 0.5rem;
}
.card-content{
	position: relative;
}
.card-content-inner{
	text-indent: 2em;
	padding: 0.75rem;
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
	    display: flex;
    -webkit-box-pack: justify;
	    justify-content: space-between;
    -webkit-box-align: center;
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
</style>
