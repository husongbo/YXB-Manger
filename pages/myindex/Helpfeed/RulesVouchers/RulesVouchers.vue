<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="card">
			<view class="card-header">
				优惠券使用规则
			</view>
			<view class="card-content">
				<view class="card-content-inner">
					优惠券分三种：<br/>
					<view style="text-indent: 1rem;">
						一种是消费返利抵用电子券，有效期是一年（即客户消费返利的抵用券）<br/>
					</view>
					<view style="text-indent: 1rem;">
						一种是平台上营销活动赠送的抵用券（比如平台上的活动是：新用户首冲200，立返1-50元，有效期是根据用户参与活动后获取抵用券的时间后一年有效<br/>
					</view>
					<view style="text-indent: 1rem;">
						 一种是平台合作的第三方平台电子券/积分兑换油卷，有效期为一年（例如：联通“沃支付”平台上的电子券兑换“油信宝”平台的加油抵用券）<br/>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card-header">
				怎么样获得优惠券
			</view>
			<view class="card-content">
				<view class="card-content-inner">
					<view style="text-indent: 1rem;">
						 用户通过“油信宝”平台定期、不定期的营销活动获得优惠券，并且平台会根据不同类型的活动发放不同的优惠券，用户在加油的过程中，
						 通过平台，参与加油满减、首冲立返等活动，领取优惠券<br/>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="card-header">
				优惠券如何使用？
			</view>
			<view class="card-content">
				<view class="card-content-inner">
					<view style="text-indent: 0rem;">
						 1、优惠券是目前只能充油款<br/>
						 2、不可提现、不设找零不可兑换现金<br/>
						 3、多张优惠券不能同时使用，每次加油可使用一张优惠券<br/>
						 4、每张优惠券都有使用期限没有使用站点，只能在注明的使用期限内使用，逾期作废<br/>
						 5、每张加油券面值最高金额为50元<br/>
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
.card-header{
	border-radius: 0.1rem 0.1rem 0 0;
    font-size: 0.85rem;
    font-weight: bold;
	padding: 10upx;
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
.card-content{
	position: relative;
}
.card-content-inner{
	text-indent: 0em;
	padding: 0.75rem;
    position: relative;
}
</style>
