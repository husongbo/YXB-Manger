<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="card">
			<view class="card-content">
				<view class="card-content" style="text-align: center; margin: 0 auto; width: 8rem;">
					<image style="margin: 1.5rem 0 0.5rem;width: 100%;height: 2.5rem;" src="../../../static/myicon/logo.png"></image>
				</view>
				<view class="card-content-inner">
					绵阳我要加油电子商务有限公司（以下简称“油信宝”）正式成立于2017年07月13日，注册资金：2000万元，致力于成为最安全、最高效及最优惠的的油商服务集成平台。
				</view>
				<view class="card-content-inner">
					油信宝是借助物联网技术以及创新型商业模式运营的物联网企业，主要面对汽油品消费市场C端用户。联合五大板块合作商：银行（储蓄）、
					电信运营商、第三方支付、保险、信用卡中心。以中石油加油返利的叠加权益使得油信宝的客户实现1+1&gt;6，更好的满足用户刚性消费领域的产品和服务需求，
					让每位中产阶级都能体验更高性价比的消费金融创新产品和卓越服务。
				</view>
				<view class="card-content-inner">
					中油九洲北斗科技能源有限公司指定绵阳我要加油电子商务有限公司下属“油信宝”电商平台为中油九洲北斗汽油卡四川省内官方销售电商平台。
					平台依托中石油线下优势资源，以四川为出发点面向全国，服务于面对汽油品消费市场的C端用户。
					致力于成油品终端市场综合服务供应商和车生活后服务的领导者。
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
	height: 100%;
	background: white;
	padding-top: 0rem;
}
.card{
	background: #fff;
    box-shadow: 0 0 0.6rem rgba(136, 130, 129, 0.3);
    margin: 0.5rem;
    position: relative;
    border-radius: 0.4rem;
    font-size: 0.7rem;
}
.card-content{
	position: relative;
}
.card-content-inner{
	text-indent: 2em;
	padding: 0.75rem;
    position: relative;
}
</style>
