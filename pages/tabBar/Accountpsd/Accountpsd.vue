
<template>
    <view class="content" @touchstart="touchstart" @touchmove="touchmove">
        <view class="input-box">
            <view class="input-item">
                <view class="input-label">手机号</view>
				<view class="input-body">
					<input v-model="phones" disabled="disabled" type="text" style="margin-right: 50upx;font-size: .9rem;" placeholder="请再次输入密码" maxlength="20"  class="input"/>
				</view>
            </view>
            <view class="input-item">
				
				<view class="input-label">输入密码</view>
				<view class="input-body">
					<input v-model="password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;width:100%;font-size: .9rem;" placeholder="请输入密码" maxlength="20"  class="input"/>
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
            </view>
			<view class="Forgetpsd">
				<!-- 忘记密码? -->
			</view>
        </view>
		<button class="submit" type="primary" @click="Login">登录</button>
		<simpleLoading ref="simpleLoading"></simpleLoading>
		<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
    </view>
</template>
<script>
	import { mapState,mapMutations } from 'vuex';
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import md5 from '@/common/md5.js'
	import utils from '@/util/util.js'
	export default {
		data() {
			return {
				isHidePassword:true,
				phone:"",
				password:"",
				passwords:'',
				Prompt:false,//提示信息
				onclickindex:0,
				phones:'',
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				alertarray:{
					show:false,
					msg:''
				},
				verindex:0,
				//要传的值
				userinfo:{
					phone:'',
					img:'',
					userid:'',
					userph:'',
					time:'',
					userinfos:'',
					cardinfo:'',
				}
			};
		},
		computed: mapState([ 'UserInfo']),
		components:{
			simpleLoading,
			alerts
		},
		onLoad(options) {
			this.phones=JSON.parse(options.phone)
		},
		methods: {
			...mapMutations(['AccountPsd']),
			isHidePasswordClick(){
				// console.log("aaaaaaaaaaaaaaaaaa")
				this.isHidePassword=!this.isHidePassword
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
			LoginTS(val){
				if(this.verindex==0){
				this.alertarray.show=true
				this.alertarray.msg=val
				this.password=''
				this.verindex=1
				setTimeout(()=>{
					this.alertarray.show=false
					this.verindex=0
					},1000)
					return;
				}
			},
			//获取当前日期时间
			GetDatas(){
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth()+1;
				var day = d.getDate();
				month=month< 10 ? ("0" + month) : month;
				day=day< 10 ? ("0" + day) : day
				this.userinfo.time= year + '-' + month + '-' + day;
			},
			//基本信息
			AjaxUserInfo(){
				var _this=this
				var userdatas=`{method:"GetUserInfo",user_id:"${this.userinfo.userid}"}`
				this.$api.ReagisterPhone(userdatas).then((res)=>{
					console.log(JSON.stringify(res))
					this.userinfo.userinfos=JSON.parse(res.data.user_info)[0]
					var datas=`{method:"GetUserCard",user_id:"${this.userinfo.userid}"}`
					this.$api.ReagisterPhone(datas).then((res)=>{
						console.log(res)
						if(res.data.result==0){
							this.userinfo.cardinfo='no'
						}
						else{
							this.userinfo.cardinfo=JSON.parse(res.data.data)[0]
						}
						this.AccountPsd(this.userinfo)
						setTimeout(()=>{
							uni.showToast({
								title: '登录成功',
								duration: 1000,
								icon:"none",
								success:function(){
									console.log(_this.UserInfo.logintime)
									setTimeout(()=>{
										uni.switchTab({
											url: '/pages/tabBar/personCenter/personCenter'
										});
									},1000)
								}
							});
						},500)
					})		
				})
			},
			//登录
			Login(){
				var _this=this
				if(this.password==''){
					this.LoginTS('密码不能为空')
					return;
				}
				var psd=md5(this.password)
				
				var json={
					phone:this.phones,
					password:this.password,
					loin_type:1
				}
				console.log(json)
				var AesJson=utils.encrypt(JSON.stringify(json),'afd60b4ad2ec1l2c586e2150770f8f9e')
				console.log(psd)
				var datas=`{method:"Login",post_params:"${AesJson}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					this.$refs.simpleLoading.show({
						image:"../../../static/app-plus/tus.png",
						text:'登录中...'
					})
					console.log(res)
					setTimeout(()=>{
						this.$refs.simpleLoading.hide()
						if(res.data.result==0){
							this.LoginTS('密码不正确，请重新输入')
							return;
						}
						if(res.data.result==1){
							var datainfo=JSON.parse(res.data.user_info)[0]
							console.log(datainfo)
							this.userinfo.phone=datainfo.M0001_USER_ID
							this.userinfo.userid=datainfo.M0001_USER_ID
							this.userinfo.img='../../../static/personCenter/pic.png'
							this.userinfo.userph=this.phones
							this.GetDatas()
							this.AjaxUserInfo()
						}
					},1000)	
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	button::after{
		border: none;
	}
	.content{
		background: white;
		height: 100%;
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
	.Forgetpsd{
		text-align: right;
		margin: 20upx 0;
	}
	.input-box {
		padding: 50upx;
		font-size: 30upx;
		.Promptpsd{
			color: red;
			font-size: 0.7rem;
			margin-top: 20upx;
		}
		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;
			.input-label {
				width: 150upx;
				display: flex;
				justify-content: left;
				align-items: center;
			}
			.input-body{
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);
				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
					width: 70%;
				}
				.eye{
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				.btn-code{
				    position: absolute;
				    right: 0upx;
				    top:50%;
				    transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}
			
		}
		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}
	.button{
		margin:0 5%;
		background: #ff8200;
		border-radius:50upx;
		line-height: 80upx;
		width: 90%;
		height: 80upx;
		color: white;
		font-size: 32upx;
		border: 0
	}
</style>
