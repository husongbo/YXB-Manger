<template>
	<view class="view-form">
		<form class="mui-input-group">
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_name.png"></image>
	    <view style="">姓名</view>
	    <input type="text" :disabled="RegDis" style="font-size: .9rem;" v-model="userinfos.userName" ref="name" class="mui-input-password mui-inputs" placeholder="请输入姓名" @blur="blurfooter('userName')">
	</div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_sheng.png"></image>
	    <view>身份证号</view>
	    <input type="text" :disabled="RegDis" style="font-size: .9rem;" v-model="userinfos.userId" class="mui-input-password mui-inputs" placeholder="请输入身份证号" @blur="blurfooter('userId')">
	</div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_po.png"></image>
	    <view>地区</view>
	    <view @click="showMulLinkageThreePicker"  ref="adress" style="margin-left: 0;color:grey!important;width:60%!important;font-size: .9rem;" class="mui-input-clear mui-inputs">{{formtxt.city}}</view>
	</div>
	<div class="mui-input-row">
		<image src="../../../static/navIcon/ic_pos.png"></image>
	    <view>详细地址</view>
	    <input type="text" :disabled="RegDis" style="font-size: .9rem;" v-model="userinfos.userAddress" ref="adresss"  class="mui-input-password mui-inputs" placeholder="请输入详细地址">
	</div>
	<div class="mui-input-row">
	<image src="../../../static/navIcon/ic_email.png"></image>
	    <view>电子邮件</view>
	    <input type="text" :disabled="RegDis" style="font-size: .9rem;" v-model="userinfos.userEamil" ref="email" class="mui-input-password mui-inputs" placeholder="请输入电子邮箱地址" :adjust-position=true @blur="blurfooter('userEamil')">
	</div>
	<view data-v-5c82e918="" v-if="RedReg" class="register-ok" @click="registerlo">提交</view>
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
		props: {
			flag:{
				type:Boolean
			}
		},
		components:{
			mpvueCityPicker,
			simpleLoading,
			alerts
		},
		computed: mapState(['UserInfo']),
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
				Verification:[//正则
					{
						name:"userName",
						userName:/^[\u4e00-\u9fa5]+$/,
						trpstexts:"请输入只包含中文用户名",
						index:true
					},
					{
						name:"userId",
						userId:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						trpstexts:"请输入有效的身份证号码",
						index:true
					},
					{
						name:"userEamil",
						userEamil:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
						trpstexts:"请输入正确的邮箱地址",
						index:true
					}],
					onclickindex:0,
					RegDis:false,
					RedReg:true,
			};
		},
		mounted(){
			console.log("aaaaaaaaaa")
			console.log(this.flag)
			this.userinfos.userPhone=this.UserInfo.userpH
			console.log(this.UserInfo.userid)
			if(this.UserInfo.userphone=='请登录'){
				console.log("aaaa")
				return;
			}
			// if(options.flag){
			// 	this.RegDis=true
			// 	this.RedReg=false
			// }
			// if(options.flag=='false'){
			// 	console.log("bbbbbbbbbbbbbbbbb")
			// 	this.RegDis=false
			// 	this.RedReg=true
			// }
			this.GetUserInfos()
			
		},
		onLoad(){
			
		},
		methods:{
			...mapMutations(['login','bindinginfo']),
			onCancel(e) {
				// console.log(e.label)
			},
			GetUserInfos(){
				var datas=`{method:"GetUserInfo",user_id:"${this.UserInfo.userid}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					this.userinfos.userPhone=JSON.parse(res.data.user_info)[0].M0001_PHONE
					this.userinfos.userName=JSON.parse(res.data.user_info)[0].M0001_NAME
					this.userinfos.userId=JSON.parse(res.data.user_info)[0].M0001_IDENTITY_CARD
					if(JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_PROVINCE!=''){
						this.formtxt.city=JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_PROVINCE+" "+JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_CITY+" "+JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_CONUNTY
					}
					else{
						this.formtxt.city='请选择地址'
					}
					this.userinfos.Province=JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_PROVINCE
					this.userinfos.City=JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_CITY
					this.userinfos.Area=JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_CONUNTY
					this.userinfos.userAddress=JSON.parse(res.data.user_info)[0].M0001_SUPPLIER_ADDRESS
					this.userinfos.userEamil=JSON.parse(res.data.user_info)[0].M0001_EMAIL
				})
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				if(!this.RedReg){
					return;
				}
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				this.pickerText=JSON.parse(this.pickerText)
				this.formtxt.city=this.pickerText.label
				this.userinfos.Province=this.formtxt.city.split('-')[0]
				this.userinfos.City=this.formtxt.city.split('-')[1]
				this.userinfos.Area=this.formtxt.city.split('-')[2]
			},
			//提交
			registerlo(){
				setTimeout(()=>{
					let index=0
					var _this=this
					this.Verification.forEach((item)=>{
						if(item.index){
							index++
						}
					})
					console.log(JSON.stringify(this.Verification))
					console.log(_this.userinfos.userAddress+","+_this.formtxt.city+","+index)
					if(index==3&&_this.userinfos.userAddress!=''&&_this.formtxt.city!=''){
						if(this.onclickindex==0){
							var datas=`{method:"UpdateUserInfo",real_name:"${this.userinfos.userName}",card_id:"${this.userinfos.userId}",contry:"${this.userinfos.Country}",
							province:"${this.userinfos.Province}",city:"${this.userinfos.City}",conuty:"${this.userinfos.Area}",address:"${this.userinfos.userAddress}",
							email:"${this.userinfos.userEamil}",phone:"${this.userinfos.userPhone}"}`
							// 弹出加载中... 
							this.$refs.simpleLoading.show({
								image:"../../../static/app-plus/tus.png",
								text:'加载中...'
							});
							var _this=this
							this.$api.ReagisterPhone(datas).then((res)=>{
								console.log(JSON.stringify(res))
								if(res.data.result==0){
									uni.showToast({
										title: '用户信息更新失败',
										duration: 1000,
										icon:"none",
									});
									return;
								}
								_this.onclickindex==1
								setTimeout(()=>{
									_this.$refs.simpleLoading.hide();
									_this.onclickindex==0
									uni.showToast({
										title: '用户信息更新成功',
										duration: 2000,
										icon:"none",
										success:function(){
											var userdatas=`{method:"GetUserInfo",user_id:"${_this.UserInfo.userid}"}`
											_this.$api.ReagisterPhone(userdatas).then((res)=>{
												console.log(JSON.stringify(res))
												_this.UserInfo.userinfos=JSON.parse(res.data.user_info)[0]
												_this.bindinginfo(JSON.parse(res.data.user_info)[0])
												_this.GetUserInfos()
											})
										}
									});
									setTimeout(()=>{
										uni.navigateBack({
											delta:1,
											animationType: 'pop-out',
											animationDuration: 200
										})
									},1000)
								},1000)
							})	
						}
						return;
					}
					if(this.indexnum==1){
						this.indexnum=0
						this.alertarray.show=true
						this.alertarray.msg='请正确完善基本信息'
						setTimeout(()=>{
							this.indexnum=1
							this.alertarray.show=false
						},1500)
					}
				},200)	
			},
			Tips(item){
				this.trpstext=item
				if(this.indexnum==1){
					this.indexnum=0
					this.alertarray.show=true
					this.alertarray.msg=this.trpstext
					setTimeout(()=>{
						this.indexnum=1
						this.alertarray.show=false
					},2000)
				}
			},
			blurfooter(val){
				this.Verification.forEach((item)=>{
					if(item.name==val){
						if(item.name=="userName"){
							if(this.userinfos.userName==''){
								item.index=false
								return
							}
							if(!item.userName.test(this.userinfos.userName)){	
								item.index=false
								this.Tips(item.trpstexts)
								return
							}
							else{
								item.index=true
							}
						}
						if(item.name=="userId"){
							if(this.userinfos.userId==''){
								item.index=false
								return
							}
							if(!item.userId.test(this.userinfos.userId)){
								item.index=false
								this.Tips(item.trpstexts)
								return false
							}
							else{
								item.index=true
							}
						}
						if(item.name=="userEamil"){
							if(this.userinfos.userEamil==''){
								item.index=false
								return
							}
							if(!item.userEamil.test(this.userinfos.userEamil)){
								item.index=false
								this.Tips(item.trpstexts)
								return false
							}
							else{
								item.index=true
							}
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
