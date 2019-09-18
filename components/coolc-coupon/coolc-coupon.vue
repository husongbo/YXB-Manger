<template>
	<view>
    <!-- <view class="coupon-item">
		<view class="coupon-money">
			<view class="nick" v-if="!types">{{item.seller_name}}使用</view>
			<view class="layof" :style="{color:theme}">￥{{item.money}}</view>
			<view class="end_time">{{item.end_time}}前使用</view>
			<view v-if="!types">
				<view class="tit">券号：{{item.ticket}}</view>
				<view class="demand">{{item.title}}</view>
			</view>
		</view>
		<view class="get-btn" v-if="types" :style="{color:color, borderColor:color, background:solid}" @click="Choice(item.state)">{{text}}</view>
    </view> -->
	<view style="display:flex;flex-direction: row;">
		<view class="coupon-count">
			<image src="./img_lijilingqu_quan.png" mode="" style="height: 200upx;position: relative;"></image>
			<view class="coupon-left">
				￥{{item.price}}
			</view>
			<view class="coupon-right">
				<view style="color:black;margin-left: 10upx;margin-top: 30upx;font-size: 0.8rem;font-weight: bold;">{{item.name}}({{item.Explain}})</view>
				<view style="color:#666;margin-left: 10upx;margin-top: 10upx;">有效期:{{item.Term}}</view>
				<view style="color:#999;margin-left: 10upx;margin-top: 10upx;">支付时抵扣</view>
			</view>
		</view>
		<view class="coupon-radio">
			<view class="radio-par " @click="Choice(item.state)" :class="{'radio-checked':radiocheck}" style="width: 50upx;height: 50upx;border: 1px solid #ff9000;border-radius: 50%;position: relative;">
				
			</view>
		</view>
	</view>
	</view>
	<!-- <view class="coupon-parent">
	</view> -->
</template>

<script>
export default {
	components:{
		
	},
	data() {
		return {
			text:'选择使用',
			BuyCountNum:'0.00',
			radiocheck:false,
		}
	},
	props:{
		item:{
			type: Object
		},
		types:{
			type: String,
			default: ''
		},
		theme:{
			type: String,
			default: '#ff9000'
		},
		solid:{
			type: String,
			default: '#ff6c00'
		},
		color:{
			type: String,
			default: '#ff9000'
		},
		Buymoeny:{
			type: String,
			default: ''
		},
		checked:{
			type:Boolean,
			default:false
		},
		BuyCountNums:{
			type:Number,
			default:0
		},
		BuyClear:{
			type:Boolean,
			default:false
		}
	},
	mounted(){
		
	},
	watch:{
		checked(){
			console.log("金额是"+this.BuyCountNums)
			console.log("你的全选是"+this.checked)
			if(this.checked){
				if(parseFloat(this.BuyCountNums)>=parseFloat(this.Buymoeny)){
					uni.showToast({
						title: '不可以选择此加油券，优惠券总金额已大于充值金额',
						duration: 1000,
						icon:"none",					
					});
					return;
				}
				if(this.item.state==2){
					return;
				}
				this.item.state=2
				// this.text='已选择'
				this.radiocheck=true
				this.solid="#6495ED"
				var json={
					state:this.item.state,
					id:this.item.ticket,
					money:this.item.price
				}
				this.$emit('completed',json);
			}
			else{
				if(this.item.state==1){
					return;
				}
				this.item.state=1
				// this.text='选择使用'
				this.radiocheck=false
				this.solid="#ff6c00"
				var json={
					state:this.item.state,
					id:this.item.ticket,
					money:this.item.price
				}
				this.$emit('completed',json);
			}
			
		},
		BuyClear(){
			console.log("金额是"+this.Buymoeny)
			// this.text='选择使用'
			this.radiocheck=false
			this.solid="#ff6c00"
		}
	},
	methods: {
		Choice(state){
			console.log("bbbbbb"+this.Buymoeny)
			if(this.Buymoeny==''){
				uni.showToast({
					title: '请输入充值金额',
					duration: 1000,
					icon:"none",					
				});
				return;
			}
			console.log(this.item.price+","+parseFloat(this.Buymoeny))
			if((parseFloat(this.item.price)>=parseFloat(this.Buymoeny))&&this.item.state==1){
				uni.showToast({
					title: '不可以选择此加油券',
					duration: 1000,
					icon:"none",					
				});
				return;
			}
			if(parseInt(state)==1){
				this.item.state=2
				// this.text='已选择'
				this.radiocheck=true
				this.solid="#6495ED"
			}
			else{
				this.item.state=1
				// this.text='选择使用'
				this.radiocheck=false
				this.solid="#ff6c00"
			}
			console.log("金额"+this.Buymoeny)
			console.log(this.solid)
			var json={
				state:this.item.state,
				id:this.item.ticket,
				money:this.item.price
			}
			this.$emit('completed',json);
			
		}
	}
}
</script>

<style lang='scss'>
.coupon-item {
	width:100%; height:auto; display:table; border-radius:10upx; margin-top:22upx; border:1px solid #eeeeee; position:relative;
	/* background: url(../../static/app-plus/img_lijilingqu_quan.png); */
	box-sizing: border-box;
	.coupon-money {
		width:465upx; height:auto; display:table; float:left; padding:26upx 20upx; 
		/* border-style:none dotted none none; border-color:#eeeeee; */
		
		.nick { width:100%; height:50upx; line-height:30upx; font-size:$font-sm; color:$font-color-999; }
		.tit { width:100%; height:50upx; line-height:50upx; font-size:$font-sm; color:$font-color-999; }
		.demand { width:100%; height:30upx; line-height:30upx; font-size:$font-sm; color:$font-color-999; }
		
		.layof { width:100%; height:48upx; line-height:30upx; font-size:44upx; color:#ff9000; font-weight:bold; }
		.end_time { width:100%; height:30upx; line-height:30upx; font-size:$font-sm; color:$font-color-999; }
	}
	.get-btn { width:146upx; height:52upx; line-height:50upx; position:absolute; top:50%; right:26upx; margin-top:-26upx; text-align:center; border-radius:60upx; color:#ff9000; border:1px solid #ff9000; font-size:$font-sm; float:right; }
}
.coupon-item:after { width:40upx; height:20upx; position:absolute; left:460upx; top:-1px; border-radius:0 0 40upx 40upx; content:""; display:block; background:$bgcolor_white; border:1px solid #eeeeee; border-top:0px; }
.coupon-item:before { width:40upx; height:20upx; position:absolute; left:460upx; bottom:-1px; border-radius:40upx 40upx 0 0; content:""; display:block; background:$bgcolor_white; border:1px solid #eeeeee; border-bottom:0px; }
.coupon-count{
	width: 90%;
	height: 200upx;
	position: relative;
	/* background: url("../../../static/app-plus/img_lijilingqu_quan.png"); */
	background: url("../../static/app-plus/img_lijilingqu_quan.png") no-repeat center top;
	background-size: 100% 100%;
}
.radio-checked{
	box-sizing: border-box;
	background: url("../../static/app-plus/coupons.png") no-repeat;
	background-size: 100% 100%;
}
.coupon-left{
	width: 30.7%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 0.8rem;
}
.coupon-right{
	width: 69.3%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	color: white;
	font-size: 0.8rem;
}
.coupon-radio{
	width: 10%;
	height:200upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>