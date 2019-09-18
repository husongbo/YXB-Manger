
<template>
    <view class="content" @touchstart="touchstart" @touchmove="touchmove">
        <view class="input-box">
			 <view class="input-item" style="">
			    <view class="input-label">旧密码</view>
				<view class="input-body">
					<input v-model="oldpassword" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20"  class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/img/attention.png':'/static/img/attention_forbid.png'"></image>
				</view>
			</view>
            <view class="input-item" style="">
                <view class="input-label">新密码</view>
				<view class="input-body">
					<input v-model="password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;" placeholder="请输入密码" maxlength="20"  class="input" @blur="BlurPsd" />
				</view>
            </view>
            <view class="input-item">
				<view class="input-label">输入密码</view>
				<view class="input-body">
					<input v-model="passwords" :password="isHidePassword?true:false" type="n" style="margin-right: 50upx;" placeholder="请再次输入密码" maxlength="20"  class="input" @blur="repeatpsd" />
				</view>
            </view>
			<view class="Promptpsd" v-if="Prompt">
				{{Psdtext}}
			</view>
        </view>
        <button class="button" @click="submit">确定</button>
		<simpleLoading ref="simpleLoading"></simpleLoading>
    </view>
</template>
<script>
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import utils from '@/util/util.js'
	import md5 from '@/common/md5.js'
	import { mapState } from 'vuex';
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
				Psdtext:'请输入最小6位最大12位包含(字母或数字)的密码',
				psdIndex:0,
				oldpassword:'',
				heights:'',
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			};
		},
		computed: mapState(['UserInfo']),
		components:{
			simpleLoading
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: function (res) {
					this.heights=res.windowHeight+'px'	
				}
			});
		},
		methods: {
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
			isHidePasswordClick(){
				this.isHidePassword=!this.isHidePassword
			},
			submit(){
				var _this=this
				if(this.psdIndex==2){
					if(this.onclickindex==0){
					// 弹出加载中... 
					this.$refs.simpleLoading.show({
						image:"../../../static/app-plus/tus.png",
						text:'修改中...'
					});
					this.onclickindex==1
					var json={
						old_login_pwd:this.oldpassword,
						new_login_pwd:this.passwords
					}
					console.log(json)
					var psd=md5(this.oldpassword)
					console.log(psd)
					var AesJson=utils.encrypt(JSON.stringify(json),psd)
					var datas=`{method:"ModifyUserLoginPwd",user_id:"${this.UserInfo.userid}",post_params:"${AesJson}"}`
					console.log(datas)
					this.$api.ReagisterPhone(datas).then((res)=>{
						console.log(res)
						setTimeout(()=>{
							if(res.data.result==1){
								_this.$refs.simpleLoading.hide();
								uni.showToast({
									title:res.data.message,
									duration: 1000,
									icon:"none"
								});
								setTimeout(()=>{
									_this.onclickindex=0
									uni.navigateBack({
										delta:1,
										animationType: 'pop-in',
										animationDuration: 200
									})
								},1000)
							}
							else{
								_this.$refs.simpleLoading.hide();
								uni.showToast({
									title:'旧密码错误',
									duration: 1000,
									icon:"none"
								});
								setTimeout(()=>{
									_this.psdIndex=0
									_this.onclickindex=0
									_this.oldpassword=''
									_this.password=''
									_this.passwords=''
								},1000)
							}
						},1000)
						
					})
				}
				return;
				}
				else{
					console.log("no")
				}
			},
			BlurPsd(){
				var reg2 = /^[A-Za-z0-9]{6,12}$/;
				if(!reg2.test(this.password)){
					this.Psdtext='请输入最小6位最大12位包含(字母或数字)的密码'
					this.Prompt=true
					return;
				}
				this.psdIndex++
				this.Prompt=false
			},
			repeatpsd(){
				if(this.psdIndex==1){
					if(this.password!=this.passwords){
						this.passwords=''
						this.Psdtext='俩次密码不一致'
						this.Prompt=true
						return;
					}
					this.psdIndex++
					this.Prompt=false
				}
				return;
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
					width: 80%;
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
