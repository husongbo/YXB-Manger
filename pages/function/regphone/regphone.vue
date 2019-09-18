<template>
	<view class="view-form">
		<form class="mui-input-group">
    <view class="mui-input-row">
		<image src="../../../static/navIcon/ic_phone.png"></image>
        <view>手机号</view>
		<view style="display: flex;flex-direction: row;margin: 0;">
		<input type="text" v-model="userinfos.userPhone" style="font-size: .9rem;" :disabled="DisUserPhones" class="mui-input-clear mui-inputs" ref="phone" placeholder="请输入手机号" @blur="blurfooter('userPhone')">
		<view style="position: absolute;right: 0;color: #CCCCCC;height: 40px;line-height: 40px;text-align: center;" v-if="ifPhone">已绑定</view>
		<view style="position: absolute;right: 0;color: #CCCCCC;height: 40px;line-height: 40px;text-align: center;" v-if="!ifPhone">未绑定</view>
		</view>
	</view>
    <view class="mui-input-row"  v-if="MobilePhone">
		<image src="../../../static/navIcon/ic_yan.png"></image>
        <view>手机验证码</view>
        <input type="text" ref="yzms" v-model="userinfos.userYzm" style="width: 100px!important;font-size: .9rem;" class="mui-input-password mui-inputs" placeholder="请输入验证码">
		<button type="primary" class="yzm" @click="getCode" v-if="Codeget">{{YZMtext}}</button>
		<button type="primary" class="yzms" v-if="Codeput">{{CodeNum}}</button>
    </view>
	<view data-v-5c82e918="" class="register-ok" @click="registerlo">提交</view>
	</form>
	<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm">
	</mpvue-city-picker>
	<view class="Verification" :style="{display:vervisit}" :class="{'veramin':vershow}">
		{{trpstext}}
	</view>
	<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
	<simpleLoading ref="simpleLoading"></simpleLoading>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../common/city.data.js';
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import {
		mapState,
	    mapMutations
	} from 'vuex';
	export default {
		components:{
			mpvueCityPicker,
			simpleLoading,
			alerts
		},
		computed: mapState([ 'hasLogins','hasLogin','UserInfo']),
		data() {
			return {
				alertarray:{
					show:false,
					msg:''
				},
				pickerText:'',
				themeColor: '#007AFF',
				cityPickerValueDefault: [0, 0, 1],
				formtxt:{
					city:'请选择地址'
				},
				vervisit:'none',
				vershow:false,
				indexnum:1,
				trpstext:'',//提示信息
				userinfos:{//用户信息
					userPhone:'',
					userYzm:'',
					userName:'',
					userId:'',
					userRegion:'请选择地址',
					userAddress:'',
					userEamil:''
				},
				Verification:[//正则
					{
						name:"userPhone",
						userPhone:/^1\d{10}$/,
						trpstexts:"请输入11位的电话号码",
						index:false
					},
					{
						name:"userName",
						userName:/^[\u4e00-\u9fa5]+$/,
						trpstexts:"请输入只包含中文用户名"
					},
					{
						name:"userId",
						userId:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						trpstexts:"请输入有效的身份证号码"
					},
					{
						name:"userEamil",
						userEamil:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
						trpstexts:"请输入正确的邮箱地址"
					}],
					onclickindex:0,
					paramsdata:{
							method:'',
							phone:''
					},
					PhoneYz:false,
					PhoneMsg:false,
					YZMtext:'获取验证码',
					YZMIndex:1,
					Codeget:true,
					Codeput:false,
					CodeNum:60,
					MobilePhone:true,//判断是否登录
					DisUserPhones:false,
					ifPhone:false,
					UserCode:'',
					
			}
		},
		mounted(){
			console.log(this.hasLogins)
			this.GetInfo()
			
			
		},
		watch:{
			hasLogins(news,olds){
				this.hasLogins=news
				if(this.hasLogins){
					this.userinfos.userPhone=this.UserInfo.userinfos.M0001_PHONE
				}
				this.GetInfo()
			}
		},
		methods:{
			...mapMutations(['login','PhonesSuccess']),
			GetInfo(){
				if(this.UserInfo.userphone=='请登录'){
					return;
				}
				// this.GetUserInfo()
				if(this.UserInfo.userpH!="000000"){
					console.log(this.UserInfo.userinfos)
					this.userinfos.userPhone=this.UserInfo.userinfos.M0001_PHONE
					this.MobilePhone=false
					this.DisUserPhones=true
					this.ifPhone=true
					// this.GetUserInfo()
					return;
				}
			},
			onCancel(e) {
				// console.log(e.label)
			},
			GetUserInfo(){
				var datas=`{method:"GetUserInfo",user_id:"${this.UserInfo.userid}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					this.userinfos.userPhone=JSON.parse(res.data.user_info)[0].M0001_PHONE
				})
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				this.pickerText=JSON.parse(this.pickerText)
				this.formtxt.city=this.pickerText.label
				console.log(this.pickerText.label)
			},
			//提交
			registerlo(){
				console.log(this.userinfos.userPhone)
				setTimeout(()=>{
					if(this.UserInfo.userphone!='请登录'&&this.DisUserPhones){
						uni.showToast({
							title: '该账户已绑定',
							duration: 1000,
							icon:"none"
						});
						return;
					}
					var datas=`{method:"CheckSmsValidateCode",phone:"${this.userinfos.userPhone}",sms_validate_code:"${this.userinfos.userYzm}"}`
					this.$api.SendVerfyCode(datas).then((res)=>{
						console.log(res)
						if(res.data.result==0){
							console.log("验证成功")
							this.YZMtext="获取验证码"
							this.YZMIndex=1
							this.Codeget=true
							this.Codeput=false
							this.UserCode=''
							this.CodeNum=60
							if(this.PhoneYz&&!this.PhoneMsg){
								if(this.onclickindex==0){
									if(this.hasLogins&&!this.hasLogin){
										this.$refs.simpleLoading.show({
											image:"../../../static/app-plus/tus.png",
											text:'绑定中...'
										});
										console.log(this.UserInfo.userid)
										var datas=`{method:"BindPhone",user_id:"${this.UserInfo.userid}",phone:"${this.userinfos.userPhone}"}`
										this.$api.ReagisterPhone(datas).then((res)=>{
											console.log(JSON.stringify(res))
											if(res.data.result==0){
												uni.showToast({
													title: '绑定失败',
													duration: 1000,
													icon:"none",
												});
												return;
											}
											this.onclickindex==1
											setTimeout(()=>{
												this.$refs.simpleLoading.hide();
												this.onclickindex==0
												this.PhonesSuccess(this.userinfos.userPhone)
												this.userinfos.userPhone=''
												this.userinfos.userYzm=''
												uni.showToast({
													title: '绑定成功',
													duration: 1000,
													icon:"none",
													success:function(){
														uni.navigateTo({
															url:`../../function/BindingPhone/BindingPhone`,
															animationType: 'pop-in',
															animationDuration: 200
														})
													}
												});
											},1000)
										})
									}
									else{
										this.$refs.simpleLoading.show({
											image:"../../../static/app-plus/tus.png",
											text:'加载中...'
										});
										this.onclickindex==1
										setTimeout(()=>{
											this.$refs.simpleLoading.hide();
											this.onclickindex==0
											uni.navigateTo({
												url:`../../function/Setpassword/Setpassword?phone="${this.userinfos.userPhone}"`,
												animationType: 'pop-in',
												animationDuration: 200
											})
										},1000)
									}	
								}
								return;
							}
							else if(!this.PhoneYz&&this.PhoneMsg){
								if(this.indexnum==1){
									this.indexnum=0
									this.alertarray.show=true
									this.alertarray.msg='用户已存在'
									setTimeout(()=>{
										this.indexnum=1
										this.alertarray.show=false
									},1000)
								}
							}
							else{
								if(this.indexnum==1){
									this.indexnum=0
									this.alertarray.show=true
									this.alertarray.msg='请输入正确的手机号码'
									setTimeout(()=>{
										this.indexnum=1
										this.alertarray.show=false
									},1000)
								}
							}
						}
						else{
							uni.showToast({
								title: '验证码不正确',
								duration: 1000,
								icon:"none",
							});
						}	
					})
					// if(this.UserCode!=this.userinfos.userYzm){
					// 	uni.showToast({
					// 		title: '验证码不正确',
					// 		duration: 1000,
					// 		icon:"none",
					// 	});
					// 	return;
					// }
					
				},300)	
			},
			Tips(item){
				this.trpstext=item
				if(this.indexnum==1){
					this.indexnum=0
					this.alertarray.show=true
					this.alertarray.msg='请输入正确的手机号'
					setTimeout(()=>{
						this.indexnum=1
						this.alertarray.show=false
					},1000)
				}
			},
			//判断手机号是否注册
			blurfooter(val){
				this.Verification.forEach((item)=>{
					if(item.name==val){
						if(item.name=="userPhone"){
							if(!item.userPhone.test(this.userinfos.userPhone)){
								if(this.userinfos.userPhone!='')
								{
									this.PhoneMsg=true
									item.index=true
									this.Tips(item.trpstexts)
								}	
								return false
							}
							var datas=`{method:"CheckUserExists",phone:"${this.userinfos.userPhone}"}`
							this.paramsdata.phone=this.userinfos.userPhone
							this.$api.ReagisterPhone(datas).then((res)=>{
								console.log(res)
								if(res.data.result==1&&res.data.message=='用户已存在'){
									this.OpenInfo(res.data.message)
									this.PhoneYz=false
									this.PhoneMsg=true
								}
								else{
									this.PhoneYz=true
									this.PhoneMsg=false
								}
							})
						}
					}
				})
			},
			//弹出信息
			OpenInfo(msg){
				this.alertarray.show=true
				this.alertarray.msg=msg
				setTimeout(()=>{
					this.indexnum=1
					this.alertarray.show=false
				},1000)
			},
			//获取验证码
			getCode(){
				var _this=this
				console.log(this.PhoneYz)
				var datas=`{method:"SendVerfyCode",phone:"${this.userinfos.userPhone}"}`
				setTimeout(function() {
					console.log(_this.YZMIndex+","+_this.Codeget+","+_this.Codeput+","+_this.PhoneYz)
					if(_this.YZMIndex==1&&_this.Codeget==true&&_this.Codeput==false&&_this.PhoneYz){
						if(_this.PhoneYz&&_this.YZMIndex==1){
							_this.$api.SendVerfyCode(datas).then((res)=>{
								if(res.data.result==0){
									uni.showToast({
										title:res.data.message,
										duration: 1000,
										icon:"none",
									});
									//_this.UserCode=JSON.parse(res.data.SmsInfo).code
									_this.YZMIndex=0
									_this.Codeget=false
									_this.Codeput=true
									var timers=setInterval(()=>{
										_this.CodeNum--
										if(_this.CodeNum<=0){
											clearInterval(timers)
											_this.YZMIndex=1
											_this.Codeget=true
											_this.Codeput=false
											_this.UserCode=''	
										}
									},1000)
									return;
								}
								uni.showToast({
									title:"验证码发送失败",
									duration: 1000,
									icon:"none",
								});
							})
						}
					}
				},500);
			}
		},
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		
	}
</script>

<style scoped>
	.register-ok{
		width: 90%;
		margin: 30upx 5%;
		padding: 20upx 0;
		background: #ff8200;
		color: white;
		border-radius: 10upx;
		text-align: center;
	}
	.yzm{
		position: absolute;
		top:20upx;
		right:30upx;
		height: 40upx;
		line-height:40upx;
		/* width:150upx; */
		background: #ff8200;
		border: 0!important;
		border-radius: 10upx;	
		width: 160upx;
	}
	.yzms{
		position: absolute;
		top:20upx;
		right:30upx;
		height: 40upx;
		line-height:40upx;
		/* width:150upx; */
		background: #ff8200;
		border: 0!important;
		border-radius: 10upx;	
		padding: 0 60upx;
	}
button::after{ border: none;}
.mui-inputs{
	height: 40px;
	width:180px;
	line-height: 40px;
	font-size: 0.7rem;
    color: #999;
	float: left;
	/* z-index: 999; */
}
.mui-input-row view{
	float: left;
	height: 40px;
	line-height: 40px;
	margin-left: 10upx;
	width:30%;
}
.mui-input-row uni-label{
	padding: 14px 10px;
	width:25%!important;
}
.view-form{
	background:white;
	padding: 20upx 0upx;
	margin: 0 1%;
	overflow-x: hidden;
	width: 98%;
	/* float: left;
	clear: both;
	width: 100%; */
}
.mui-input-group{
	background: url(../../../static/myicon/bg_img.png) no-repeat;
	background-size: 100% 100%;
	float: left;
	clear: both;
	width: 100%;
}
.mui-input-group .mui-input-row:after{
	height: 0;
}
.mui-input-group:after{
	height: 0;
}
.mui-input-group:before{
	height: 0;
}
uni-button, html uni-input[type=button], uni-input[type=reset], uni-input[type=submit]{
	-webkit-appearance:none;
}
.mui-input-row image{
	width:20px;height:20px;float: left;
	margin-top: 20upx;
	margin-left: 16upx;
}
.mui-input-row{
	width: 100%;
	overflow: unset;
}
.Verification{
	width: 80%;
	margin: 0 10%;
	position: fixed;
	bottom: 50%;
	left: 0;
	background: rgba(0,0,0,0.5);
	z-index: 999;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	color: white;
	border-radius: 10upx;
	font-size: 0.8rem;
}
.veramin{
	animation: verifications 0.2s linear;
}
@keyframes verifications{
	from{
		bottom: -10px;
	}
	to{
		bottom:50%;
	}
}
</style>
