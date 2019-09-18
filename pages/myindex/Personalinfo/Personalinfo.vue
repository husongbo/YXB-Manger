<template>
	<view class="parents" @touchstart="touchstart" @touchmove="touchmove">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index" @click="Judge(item.index,item.url)" v-if="item.flag">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<image style="width: 50upx; height: 45upx" :src="item.img"></image>
					<view class="uni-media-list-text-top">{{item.text}}</view>
				</view>
			</view>
		</view>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>	
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import simpleDialog from '@/components/loading/dialog.vue'
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				list:[
					{
						index:1,
						img:'../../../static/personCenter/icon_wode.png',
						text:'注册信息',
						url:'../registerinfo/registerinfo',
						flag:true,
					},
					{
						index:2,
						img:'../../../static/personCenter/ww.png',
						text:'完善信息',
						url:'../Perfectinfor/Perfectinfor?flag=true',
						flag:true,
					},
					{
						index:3,
						img:'../../../static/personCenter/icon_zf.png',
						text:'支付密码',
						url:'../Paymentpassword/Paymentpassword',
						flag:true,
					},
					{
						index:4,
						img:'../../../static/personCenter/login.png',
						text:'登录密码',
						url:'../ChangeLogin/ChangeLogin',
						flag:false,
					}
				],
				sDialog: {
					message: '您可还没有登录,请先登录再完善个人信息'
				},
				ChangeLogin:false,
			};
		},
		computed: mapState([ 'hasLogins','hasLogin','UserInfo']),
		onLoad(){
			//console.log(this.hasLogins)
			console.log(this.UserInfo.userid)
			var datas=`{method:"CheckUserLoginPwd",user_id:"${this.UserInfo.userid}"}`
			this.$api.ReagisterPhone(datas).then((res)=>{
				console.log(res)
				if(res.data.result==1&&res.data.message=='登录密码已设置'){
					this.ChangeLogin=true
					this.list[3].flag=this.ChangeLogin
				}
				else{
					this.ChangeLogin=false
					this.list[3].flag=this.ChangeLogin
				}
			})
		},
		components:{
			simpleDialog
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
			},
			//判断
			Judge(inx,url){
				console.log(url)
				if(inx==1){
					this.Jump(url)
					return;
				}
				if(inx==2){
					if(this.hasLogins&&this.hasLogin){
						this.Jump(url)
						return;
					}
					if(this.hasLogins&&!this.hasLogin){
						this.sDialog.message='您可还绑定手机号,请先绑定后再完善个人信息'
						this.$refs.simpleDialog2.confirm({
							title: '提示！',
							message:this.sDialog.message
						});
						return;
					}
					this.$refs.simpleDialog2.confirm({
						title: '提示！',
						message:this.sDialog.message
					});
				}
				if(inx==3){
					if(this.hasLogins&&this.hasLogin){
						this.Jump(url)
						return;
					}
					if(this.hasLogins&&!this.hasLogin){
						this.sDialog.message='您可还绑定手机号,请先绑定后再设置支付密码'
						this.$refs.simpleDialog2.confirm({
							title: '提示！',
							message:this.sDialog.message
						});
						return;
					}
					this.sDialog.message='您可还没有登录,请先登录再设置支付密码'
					this.$refs.simpleDialog2.confirm({
						title: '提示！',
						message:this.sDialog.message
					});
				}
				if(inx==4){
					this.Jump(url)
				}
				
			},
			//跳转
			Jump(url){
				uni.navigateTo({
				    url:url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				if(this.hasLogins&&!this.hasLogin){
					this.Jump('../registerinfo/registerinfo')
					return;
				}
				uni.navigateTo({
				    url:'../../tabBar/Login/Login',
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

<style scoped>
.uni-media-list-text-top{
	margin-left: 20upx;
	font-weight: bold;
	margin-top: 4upx;
}
.uni-list{
	margin-top: 30upx;
}
uni-navigator{
	width:100%;
}
.parents{
	height: calc(100vh - 59px);
	overflow-y: hidden;
}
.uni-list-cell::after{
	height: 0;
}

</style>
