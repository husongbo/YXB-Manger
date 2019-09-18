<template>
	<view class="view-form">
		<form class="mui-input-group">
    <div class="mui-input-row">
		<image src="../../../static/navIcon/ic_phone.png"></image>
        <view>手机号</view>
    <input type="text" v-model="userinfos.userPhone" class="mui-input-clear mui-inputs" ref="phone" placeholder="请输入手机号" @blur="blurfooter('userPhone')">
    </div>
    <div class="mui-input-row">
		<image src="../../../static/navIcon/ic_yan.png"></image>
        <view>手机验证码</view>
        <input type="text" ref="yzms" v-model="userinfos.userYzm" style="width: 100px!important;" class="mui-input-password mui-inputs" placeholder="请输入验证码">
		<button type="primary" class="yzm"  @click="getCode">{{YZMtext}}</button>
		<button type="primary" class="yzms" v-if="Codeput">{{CodeNum}}</button>
    </div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_name.png"></image>
	    <view>姓名</view>
	    <input type="text" v-model="userinfos.userName" ref="name" class="mui-input-password mui-inputs" placeholder="请输入姓名" @blur="blurfooter('userName')">
	</div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_sheng.png"></image>
	    <view>身份证号</view>
	    <input type="text" v-model="userinfos.userId" class="mui-input-password mui-inputs" placeholder="请输入身份证号" @blur="blurfooter('userId')">
	</div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_po.png"></image>
	    <view>地区</view>
	    <view @click="showMulLinkageThreePicker"  ref="adress" style="margin-left: 0;color: #999!important;width:170px!important" class="mui-input-clear mui-inputs">{{userinfos.userRegion}}</view>
	</div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_pos.png"></image>
	    <view>详细地址</view>
	    <input type="text" v-model="userinfos.userAddress" ref="adresss"  class="mui-input-password mui-inputs" placeholder="请输入详细地址">
	</div>
	<div class="mui-input-row">
	<image src="../../../static/navIcon/ic_email.png"></image>
	    <view>电子邮件</view>
	    <input type="text" v-model="userinfos.userEamil" ref="email" class="mui-input-password mui-inputs" placeholder="请输入电子邮箱地址" :adjust-position=true @blur="blurfooter('userEamil')">
	</div>
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
	<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import simpleDialog from '@/components/loading/dialog.vue'
	import cityData from '../../../common/city.data.js';
	import {
		mapState,
	    mapMutations
	} from 'vuex';
	export default {
		components:{
			mpvueCityPicker,
			alerts,
			simpleLoading,
			simpleDialog
		},
		computed: mapState([ 'UserInfo']),
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
					userEamil:'',
					Country:'中国',
					Province:'',//省份
					City:'',//城市
					Area:'',//区
				},
				sDialog: {
					message: '是否前往登录'
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
						trpstexts:"请输入只包含中文用户名",
						index:false
					},
					{
						name:"userId",
						userId:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						trpstexts:"请输入有效的身份证号码",
						index:false
					},
					{
						name:"userEamil",
						userEamil:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
						trpstexts:"请输入正确的邮箱地址",
						index:false
					}],
					phoneflag:false,
					Userid:false,
					Email:false,
					Name:false,
					regindex:0,
					regNum:0,
					Codeget:true,
					Codeput:false,
					YZMtext:'获取验证码',
					CodeNum:60,
					YZMIndex:1,
					UserCode:'',
			};
		},
		methods:{
			...mapMutations(['login']),
			onCancel(e) {
				// console.log(e.label)
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				this.pickerText=JSON.parse(this.pickerText)
				this.formtxt.city=this.pickerText.label
				this.userinfos.userRegion=this.pickerText.label
				this.userinfos.Province=this.formtxt.city.split('-')[0]
				this.userinfos.City=this.formtxt.city.split('-')[1]
				this.userinfos.Area=this.formtxt.city.split('-')[2]
				console.log(this.pickerText.label)
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				uni.navigateTo({
				    url: '../../tabBar/Login/Login',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			//获取验证码
			getCode(){
				console.log(this.PhoneYz)
				var datas=`{method:"SendVerfyCode",phone:"${this.userinfos.userPhone}"}`
				setTimeout(function() {
					if(this.YZMIndex==1&&this.Codeget==true&&this.Codeput==false){
						if(this.PhoneYz&&this.YZMIndex==0){
							this.$api.SendVerfyCode(datas).then((res)=>{
								if(res.data.result==1){
									uni.showToast({
										title:res.data.message,
										duration: 1000,
										icon:"none",
									});
									this.UserCode=JSON.parse(res.data.SmsInfo).code
									this.YZMIndex=0
									this.Codeget=false
									this.Codeput=true
									var timers=setInterval(()=>{
										this.CodeNum--
										if(this.CodeNum<=0){
											clearInterval(timers)
											this.YZMIndex=1
											this.Codeget=true
											this.Codeput=false
											this.UserCode=''	
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
				}, 200);
			},
			//提交
			registerlo(){
				this.regNum=0
				var _this=this
				setTimeout(()=>{
					this.Verification.forEach((item)=>{
						if(item.index){
							this.regNum++
						}
					})
					console.log(this.regNum+","+this.userinfos.userRegion+","+this.userinfos.userAddress)
					if(this.regNum!=4||this.userinfos.userRegion=="请选择地址"||this.userinfos.userAddress==''){
						this.Tips("请正确完善基本信息")
						return;
					}
					// if(this.userinfos.userYzm!=this.UserCode){
					// 	this.Tips("验证码不正确")
					// 	return;
					// }
					if(this.regindex==0){
						this.regindex==1
						var datas=`{method:"UpdateUserInfo",real_name:"${this.userinfos.userName}",card_id:"${this.userinfos.userId}",contry:"${this.userinfos.Country}",province:"${this.userinfos.Province}",city:"${this.userinfos.City}",conuty:"${this.userinfos.Area}",address:"${this.userinfos.userAddress}",email:"${this.userinfos.userEamil}",phone:"${this.userinfos.userPhone}"}`
						console.log(datas)
						this.$refs.simpleLoading.show({
							image:"../../../static/app-plus/tus.png",
							text:'注册中...'
						});
						this.$api.ReagisterPhone(datas).then((res)=>{
							console.log(JSON.stringify(res))
							if(res.data.result==0){
								setTimeout(()=>{
									_this.$refs.simpleLoading.hide();
									uni.showToast({
										title: '用户注册失败',
										duration: 1000,
										icon:"none",
									});
									return;
								},1000)
							}
							setTimeout(()=>{
								_this.$refs.simpleLoading.hide();
								_this.userinfos.userPhone=''
								_this.userinfos.userYzm=''
								_this.userinfos.userName=''
								_this.userinfos.userId=''
								_this.userinfos.userRegion='请选择地址'
								_this.userinfos.userAddress=''
								_this.userinfos.userEamil=''
								_this.userinfos.Province=''
								_this.userinfos.City=''
								_this.userinfos.Area=''
								console.log("验证成功")
								this.YZMtext="获取验证码"
								this.YZMIndex=1
								this.Codeget=true
								this.Codeput=false
								this.UserCode=''
								this.CodeNum=60
								uni.showToast({
									title: '用户注册成功',
									duration: 1000,
									icon:"none",
									success:function(){
										setTimeout(()=>{
											_this.regindex=0
											_this.$refs.simpleDialog2.confirm({
												title: '提示！',
												message:_this.sDialog.message
											});
										},1000)
									}
								});
							},1000)
						})	
					}
				},200)
				
				
				// setTimeout(function() {
				// 	_this.$refs.simpleLoading.hide()
				// }, 1000);
			},
			Tips(item){
				this.trpstext=item
				this.alertarray.show=true
				this.alertarray.msg=item
				setTimeout(()=>{
					this.alertarray.show=false
				},1000)
			},
			blurfooter(val){
				this.Verification.forEach((item)=>{
					if(item.name==val){
						if(item.name=="userPhone"){
							if(!item.userPhone.test(this.userinfos.userPhone)){
								if(this.userinfos.userPhone!=''){
									this.Tips(item.trpstexts)
									return;
								}
								return;
							}
							if(this.userinfos.userPhone==''){
								// this.Tips(item.t	rpstexts)
								return;
							}
								var datas=`{method:"CheckUserExists",phone:"${this.userinfos.userPhone}"}`
								this.$api.ReagisterPhone(datas).then((res)=>{
									console.log(res)
									if(res.data.result==1&&res.data.message=='用户已存在'){
										this.Tips(res.data.message)
										return;
									}
									item.index=true
									console.log(item.index)
								})
							}	
							
						
						if(item.name=="userName"){
							if(!item.userName.test(this.userinfos.userName)){
								if(this.userinfos.userName!='')
									this.Tips(item.trpstexts)
								return;
							
							}
							if(this.userinfos.userName==''){
								this.Tips(item.trpstexts)
								return;
							}
							item.index=true
							console.log(item.index)
						}
						if(item.name=="userId"){
							if(!item.userId.test(this.userinfos.userId)){
								if(this.userinfos.userId!='')
									this.Tips(item.trpstexts)
								return;
							}
							if(this.userinfos.userId==''){
								this.Tips(item.trpstexts)
								return;
							}
							item.index=true
							console.log(item.index)
						}
						if(item.name=="userEamil"){
							if(!item.userEamil.test(this.userinfos.userEamil)){
								if(this.userinfos.userEamil!='')
									this.Tips(item.trpstexts)
								return;
							}
							if(this.userinfos.userEamil==''){
								// this.Tips(item.trpstexts)
								return;
							}
							item.index=true
							console.log(item.index)
						}
					}
				})
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
		}
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
		width: 160upx;
	}
button::after{ border: none;}
.mui-inputs{
	height: 40px;
	width:170px;
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
	padding: 20upx 10upx;
	overflow-x: hidden;
	width: 100%;
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
