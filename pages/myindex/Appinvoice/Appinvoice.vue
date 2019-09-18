<template>
	<view class="parent-view">
		<view class="title">发票提取码</view>
		<input class="uni-input" name="input"  />
		<view class="title">验证码</view>
		<view>
			<input class="uni-yzm" name="input"  />
			<view class="uni-yzmrefresh">
				<view class="yzm-img"></view>
				<span>看不清，换一张</span>
			</view>
		</view>
		<uni-button data-v-5c82e918="" class="register-ok">提交</uni-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
.title{
	width: 100%;
	height: 100upx;
	
	font-size: 0.9rem;
	line-height: 100upx;
	
}
.parent-view{
	padding-left: 20upx;
	background: white;
	float: left;
	clear: both;
	width: 100%;
}
.uni-input{
	height: 40px;
	padding-left: 16upx;
	padding-top: 0px;
	padding-bottom: 0;
	margin-right: 20upx;
	border: 1px solid #b4b4b4;
	border-radius: 10upx;
}
.uni-yzm{
	height: 40px;
	padding-left: 16upx;
	padding-top: 0px;
	padding-bottom: 0;
	margin-right: 20upx;
	border: 1px solid #b4b4b4;
	border-radius: 10upx;
	width: 50%;
	float: left;
}
.uni-yzmrefresh{
	float: left;
}
.yzm-img{
	width: 200upx;
	height: 30px;
	background: #CCCCCC;
}
.uni-yzmrefresh span{
	color: #ff8200;
    font-size: 0.5rem;
    text-decoration: underline;
	padding-left:16upx;
}
.register-ok{
		width: 90%;
		margin: 70upx 5%;
		padding: 30upx 0;
		background: #ff8200;
		color: white;
		border-radius: 10upx;
	}
uni-button, html uni-input[type=button], uni-input[type=reset], uni-input[type=submit]{
	-webkit-appearance:none;
}
uni-button:after{
	border: 0;
}
</style>
