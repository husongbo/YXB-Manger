<template>
	<view id="conent" @touchstart="touchstart" @touchmove="touchmove">
		<view class="conent-top">
			<image src="../../../static/app-plus/logo.png" mode=""></image>
			<image src="../../../static/login/wejian.png" mode=""></image>
			<image src="../../../static/login/wechat.png" mode=""></image>
		</view>
		<view class="conent-middle">
			同意将微信账户的信息授权给当前用户
		</view>
		<button class="weibtn" @click="thirdLogin">确认授权</button>
		<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
		<simpleLoading ref="simpleLoading"></simpleLoading>
	</view>
</template>

<script>
	import alerts from '@/components/loading/alert.vue'
	import simpleDialog from '@/components/loading/dialog.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';//引用store
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				alertarray:{
					show:false,
					msg:''
				},
				wxexist:false,
				sDialog: {
					message: '您可能还没有安装微信客户端，请前往安装，或者使用账户和密码登录'
				},
				Auth:{
					OpenId:'',
					UninId:''
				},
				Userform:{
					nickName:'',
					avatarUrl:'',
					UserId:'',
					UserPh:'000000',
					UserTime:'',
					Userinfos:'',
					Cardinfo:'',
				}
			}
		},
		components:{
			alerts,
			simpleDialog,
			simpleLoading
		},
		onLoad(options){
			// this.Userform.UserPh=options.phone
			// console.log(this.Userform.UserPh)
		},
		methods: {
			...mapMutations(['wxlogin']),
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
			getwxexist(){
				return this.wxexist
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				plus.runtime.openURL("https://mobile.baidu.com/item?docid=25861398&source=aladdin%40wise_app_23%40title&ala=strong%4025861398%402786482313%40jp1.baidu.com%40title%40%E5%BE%AE%E4%BF%A1&ala=app_mobile_rich%402052%40s%40%E5%BE%AE%E4%BF%A1%E4%B8%8B%E8%BD%BD%4010823306764847032937%40title&from=1022306m");//调用浏览器打开网址
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			openloading(){
				this.$refs.simpleLoading.show({
					image:"../../../static/app-plus/tus.png",
					text:'登陆中...'
				});
			},
			closeloading(){
				this.$refs.simpleLoading.hide()
			},
			//获取当前日期时间
			GetDatas(){
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth()+1;
				var day = d.getDate();
				month=month< 10 ? ("0" + month) : month;
				day=day< 10 ? ("0" + day) : day
				this.Userform.UserTime= year + '-' + month + '-' + day;
			},
			//基本信息
			AjaxUserInfo(){
				var _this=this
				var userdatas=`{method:"GetUserInfo",user_id:"${this.Userform.UserId}"}`
				this.$api.ReagisterPhone(userdatas).then((res)=>{
					console.log(JSON.stringify(res))
					this.Userform.Userinfos=JSON.parse(res.data.user_info)[0]
					var userdatas=`{method:"GetUserInfo",user_id:"${_this.Userform.UserId}"}`
					_this.$api.ReagisterPhone(userdatas).then((res)=>{
						console.log(JSON.parse(res.data.user_info)[0].M0001_PHONE)
						var myreg=/^[1][3,4,5,7,8][0-9]{9}$/
						if(myreg.test(JSON.parse(res.data.user_info)[0].M0001_PHONE)){
							_this.Userform.UserPh=JSON.parse(res.data.user_info)[0].M0001_PHONE//手机号
							console.log(_this.Userform.UserPh);
						}
						else{
							_this.Userform.UserPh='000000'
							console.log(_this.Userform);
						}
						var datas=`{method:"GetUserCard",user_id:"${this.Userform.UserId}"}`
						this.$api.ReagisterPhone(datas).then((res)=>{
							console.log(JSON.stringify(res))
							if(res.data.result==0){
								_this.Userform.Cardinfo='no'
							}
							else{
								_this.Userform.Cardinfo=JSON.parse(res.data.data)[0]
							}
							_this.GetDatas()
							console.log(JSON.stringify(_this.Userform));
							_this.wxlogin(_this.Userform)
							_this.openloading()
							setTimeout(()=>{
								_this.closeloading()
								uni.showToast({
									title: '登录成功',
									duration: 1000,
									icon:"none",
									success:function(){
										uni.switchTab({
											url: '/pages/tabBar/personCenter/personCenter'
										});
									}
								});
							},1000)
						})
					})
				})
			},
			thirdLogin() {
				var _this=this
				uni.showToast({
					title: '正在授权中,请稍后...',
					duration: 2000,
					icon:"none"
				});
				uni.getProvider({
					service: 'oauth',
					success: function (res) {
						console.log(JSON.stringify(res))
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function (loginRes) {
									console.log(JSON.stringify(loginRes));
									_this.wxexist=true
									console.log(_this.wxexist)
									uni.hideToast();
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log(JSON.stringify(infoRes))
											console.log('-------获取微信用户所有-----');
											_this.Auth.OpenId=infoRes.userInfo.openId
											_this.Auth.UninId=infoRes.userInfo.unionId
											var datas=`{method:"AuthLogin",openId:"${_this.Auth.OpenId}",uninid:"${_this.Auth.UninId}"}`
											_this.$api.AuthLogin(datas).then((res)=>{
												console.log(res.data.user_id)
												_this.Userform.UserId=res.data.user_id
												_this.Userform.avatarUrl=infoRes.userInfo.avatarUrl
												_this.Userform.nickName=infoRes.userInfo.nickName
												_this.AjaxUserInfo()
												
												// _this.Userform.UserPh=infoRes.userInfo.UserPh
											})
										} 	
									});
									
								},
								fail:function(err){
									console.log(JSON.stringify(err));
									if(err.code==-8){
										var existe=_this.getwxexist()
										console.log(existe)
										if(!existe){
											_this.$refs.simpleDialog2.confirm({
												title: '提示！',
												message:_this.sDialog.message
											});
										}
									}
								},
								complete:function(){
									
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
#conent{
	height: 100%;
	background: white;
}
.conent-top{
	width:100%;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	padding: 100upx 0;
}
.conent-top image{
	width: 100upx;
	height: 100upx;
}
.conent-top image:nth-child(2){
	width: 60upx;
	height: 40upx;
	margin: 0 20upx;
}
.conent-middle{
	font-size: 0.7rem;
	text-align: center;
}
.weibtn{
	width: 80%;
	height: 90upx;
	line-height: 90upx;
	margin: 120upx 10%;
	background: rgb(80,182,116);
	border: 0;
	color: white;
	border-radius:40upx;
	border-color: white!important;
}
.weibtn:active{
	background: #878787;
}
uni-button:after,button:after {
	border:0!important;
}
</style>
