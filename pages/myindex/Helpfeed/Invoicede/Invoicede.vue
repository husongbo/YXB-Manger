<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="card">
			<view class="card-header">
				"油信宝"电商平台开票说明
			</view>
			<view class="card-content">
				<view class="card-content-inner">
					1、“油信宝”电商平台上的客户发票由中油九洲北斗科技能源有限公司开具 <br>
					2、“油信宝”电商平台给客户开具增值税普通发票，并将折扣优惠金额一并在发票上体现。开票数据以中油北斗平台的消费数据为准，开票时间为每月最后一日之前 <br>
					3、在“油信宝”平台上消费的油品，平台以电子发票的形式推送到客户注册时预留的电子邮箱里，客户在终端机打印出来即可 <br>
					4、平台可按照客户输入的时间周期开具电子发票 <br>
					5、“油信宝”试运营期间给客户以线下纸质邮寄发票的形式开具 <br><br>
					开票流程<br>
					“油信宝”平台客户消费后在平台系统上点击“个人中心”----“我的电子发票”提出开票申请（个人需要开具公司名称的发票，必须提供公司名称及纳税人识别号）
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
	height: 100%;
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
.card-content{
	position: relative;
}
.card-content-inner{
	text-indent: 0rem;
	padding: 0.75rem;
    position: relative;
}
</style>
