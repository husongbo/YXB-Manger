<template>
	<view class="page_login" @touchstart="touchstart" @touchmove="touchmove" :style="{height: heights}">
		<!-- 头部logo -->
		<view class="head">
			<view class="head_bg">
				<view class="head_inner_bg">
					<image style="width: 100%;height: 100%;" :src="imgInfo.head" class="head_logo" />
				</view>
			</view>
		</view>
		<view class="UserPhone" style="position: relative;">
			<input type="number" v-model="UserPhones" placeholder="请输入手机号"  style="width: 80%;font-size: .9rem;"/>
			<image src="../../../static/myicon/del.png" mode="" style="width: 40upx;height: 40upx;position: absolute;top:22upx;right:10%;" @click="del"></image>
		</view>
		<!-- 登录提交 -->
		<button class="submit" type="primary" @click="login">下一步</button>
		<view class="opts">
			<text @tap="goReg" class="text">立即注册</text>
		</view>
		<view class="quick_login_line">
			<view class="line" />
			<text class="text">快速登录</text>
			<view class="line" />
		</view>
		<view class="quick_login_list">
			
			<navigator animation-type="pop-in" animation-duration="300" url="../WeChat/WeChat?phone=000000" hover-class="none">
			<image  class="item" :src="imgInfo.wechat" />
			</navigator>
			<!-- <image @tap="thirdLogin('weibo')" class="item" :src="imgInfo.weibo" /> -->
		</view>
		<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
		<simpleLoading ref="simpleLoading"></simpleLoading>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
</template>
<script>
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import simpleDialog from '@/components/loading/dialog.vue'
	export default {
		data() {
			const isUni = typeof(uni) !== 'undefined'
			return {
				username: '',
				userpwd: '',
				pwdType: 'password',
				imgInfo: {
					head: isUni ? '/static/app-plus/logo.png' : require('./images/tus.png'),
					icon_user: isUni ? '/static/login/icon_user.png' : require('./images/icon_user.png'),
					icon_del: isUni ? '/static/login/icon_del.png' : require('./images/icon_del.png'),
					icon_pwd: isUni ? '/static/login/icon_pwd.png' : require('./images/icon_pwd.png'),
					icon_pwd_switch: isUni ? '/static/login/icon_pwd_switch.png' : require('./images/icon_pwd_switch.png'),
					qq: isUni ? '/static/login/qq.png' : require('./images/qq.png'),
					wechat: isUni ? '/static/login/wechats.png' : require('./images/wechats.png'),
					weibo: isUni ? '/static/login/weibo.png' : require('./images/weibo.png')
				},
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				alertarray:{
					show:false,
					msg:''
				},
				// UserPhones:'13138660353',
				UserPhones:"",
				// ,17608163520
				verindex:0,
				sDialog: {
					message: '用户不存在，请先注册'
				},
				heights:'',
			}
		},
		components:{
			alerts,
			simpleLoading,
			simpleDialog
		},
		onLoad(){
			var _this=this
			uni.getSystemInfo({
				success: function (res) {
					_this.heights=res.windowHeight+'px'	
				}
			});
		},
		methods: {
			inputUsername(e) {
				this.username = e.target.value
			},
			inputPwd(e) {
				this.userpwd = e.target.value
			},
			delUser() {
				this.username = ''
			},
			del(){
				// var arrnumber=[]
				// var num=''
				// if(this.UserPhones==''){
				// 	return;
				// }
				// this.UserPhones.split("").forEach((item)=>{
				// 	arrnumber.push(item)
				// })
				// arrnumber.pop()
				// arrnumber.forEach((item)=>{
				// 	num=num+""+item
				// })
				this.UserPhones=''
				
				// this.UserPhones=this.UserPhones.substring(0,)
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
			login() {
				var Phone=/^1\d{10}$/
				console.log(this.UserPhones)
				if(!Phone.test(this.UserPhones)){
					if(this.verindex==0){
					this.alertarray.show=true
					this.alertarray.msg='请输入正确的手机号码'
					this.verindex=1
					setTimeout(()=>{
						this.alertarray.show=false
						this.verindex=0
						},1000)
						return;
					}
				}
				this.$refs.simpleLoading.show({
					image:"../../../static/app-plus/tus.png",
					text:'请稍后...'
				})
				var datas=`{method:"CheckLogin",phone:"${this.UserPhones}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					var result=res.data.result
					setTimeout(()=>{
						this.$refs.simpleLoading.hide()
						if(result==2){
							uni.navigateTo({
								url:`../WeChat/WeChat?phone="${this.UserPhones}"`,
								animationType: 'pop-in',
								animationDuration: 200
							})
						}
						if(result==1){
							var userinfo=JSON.parse(res.data.user_info)
							if(userinfo[0].M0001_USER_TOKEN==''){
								uni.navigateTo({
									url:`../Accountpsd/Accountpsd?phone="${this.UserPhones}"`,
									animationType: 'pop-in',
									animationDuration: 200
								})
								return;
							}
							uni.navigateTo({
								url:`../Authentication/Authentication?phone="${this.UserPhones}"`,
								animationType: 'pop-in',
								animationDuration: 200
							})
							return;
							// console.log(userinfo)
						}
						if(result==0){
							console.log("不存在")
							this.$refs.simpleDialog2.confirm({
								title: '提示！',
								message:this.sDialog.message
							});
						}
					},1000)			
					console.log(res)	
				})
			},
			findPwd(){
				uni.navigateTo({
					url:'/pages/find-pwd/find-pwd'
				})
			},
			goReg() {
				uni.navigateTo({
					url:'/pages/myindex/registerinfo/registerinfo'
				})
			},
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
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				uni.navigateTo({
					url:`../../myindex/registerinfo/registerinfo`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
		}
	}
</script>
<style>
	page {
		height: auto;
		min-height: 100%;
		background-color: #f5f6f8;
	}
</style>
<style lang="scss" scoped>
	$logo-padding: 60px;
	$form-border-color: rgba(214, 214, 214, 1);
	$text-color: #B6B6B6;

	.page_login {
		padding: 20upx;
		background: white;
		height:100vh;
	}
	.UserPhone input{
		width: 80%;
		margin: 20upx 10%;
		border-bottom: 1px solid #ccc;
		height: 80upx;
		line-height: 80upx;
		// padding-left: 20upx;
		// border-radius: 10upx;
	}
	uni-input input{
		height: 80upx;
		line-height: 80upx;
	}
	uni-button{
		border: 0;
	}
	.head {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 80upx;
		// padding-top: $logo-padding;
		padding-bottom: $logo-padding;

		.head_bg {
			// border: 1px solid rgb(199, 0, 11);
			// border-radius: 50px;
			width: 80px;
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;

			.head_inner_bg {
				border-radius: 40px;
				width: 80px;
				height: 80px;
				display: flex;
				align-items: flex-end;
				justify-content: center;
				overflow: hidden;
			}
		}
	}

	.login_form {
		display: flex;
		margin: 20px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid $form-border-color;
		border-radius: 10px;

		.line {
			width: 100%;
			height: 1px;
			background-color: $form-border-color;
		}

		.input {
			width: 100%;
			max-height: 45px;
			display: flex;
			padding: 3px;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.img {
				min-width: 60upx;
				min-height: 50upx;
				margin: 5px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.img_del {
				width: 21px;
				height: 21px;
			}

			.img_pwd_switch {
				width: 28px;
				height: 12px;
			}

			input {
				outline: none;
				height: 30px;
				width: 100%;

				&:focus {
					outline: none;
				}
			}
		}
	}

	.submit {
		margin-top: 30px;
		height: 80upx;
		line-height: 80upx;
		// margin-right: 20px;
		color: white;
		border: 0;
		background-color:#08B6F2;
		width: 80%;
		margin: 40upx 10%;
	}
	uni-button:after{
		border: 0;
	}
	.opts {
		margin-top: 5px;
		margin-left: 25px;
		margin-right: 25px;
		width: 80%;
		margin: 0upx 10%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.text {
			font-size: 13px;
			color: $text-color;
		}
	}

	.quick_login_line {
		margin-top: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.line {
			height: 1px;
			width: 38%;
			background-color: rgba(211, 211, 213, 1);
		}

		.text {
			font-size: 13px;
			color: rgba(200, 200, 200, 1);
			margin: 2px;
		}
	}

	.quick_login_list {
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.item {
			width: 50px;
			height: 50px;
			margin: 20px;
		}
	}
</style>
