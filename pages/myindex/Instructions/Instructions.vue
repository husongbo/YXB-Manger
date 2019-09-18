<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<h3>公告</h3>
		<view>中油九洲北斗汽油平台“油信宝”关于平台用户油品消费开票通知</view>
		<view>一、平台油品消费后由四川中油九洲北斗科技能源有限公司开具发票。</view>
		<view>二、鉴于国家对金税三期系统更新升级，预计2017年12月底前完成的平台开具电子发票功能，未能如期开放，平台会加紧与税务系统就“金税三期电子发票系统”对接。</view>
		<view>三、平台在2018年2月20日前上线“我的发票”信息格式，采集开票信息。用于目前开具纸质增值税普通发票的数据及之后与“金税三期电子发票系统”对接时开具电子发
                票的数据，开发完成后及时向用户开放申请电子发票的功能。</view>
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
	padding: 0 5%;
    padding-bottom: 1rem;
    font-size: 0.7rem;
    background-color: #fff;
	position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
	padding-top: 1rem;
}
h3 {
    text-align: center;
    margin-bottom: 0.5rem;
}
.invoiceInfo div {
    text-indent: 8%;
}
</style>
