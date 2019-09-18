<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
// 		onLaunch: function() {
// 			console.log('App Launch');
// 			// #ifdef APP-PLUS
// 			// 锁定屏幕方向
// 			plus.screen.lockOrientation('portrait-primary'); //锁定
// 			// 检测升级
// 			uni.request({
// 				url: 'https://uniapp.dcloud.io/update', //检查更新的服务器地址
// 				data: {
// 					appid: plus.runtime.appid,
// 					version: plus.runtime.version,
// 					imei: plus.device.imei
// 				},
// 				success: (res) => {
// 					console.log('success', res);
// 					if (res.statusCode == 200 && res.data.isUpdate) {
// 						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
// 						// 提醒用户更新
// 						uni.showModal({
// 							title: '更新提示',
// 							content: res.data.note ? res.data.note : '是否选择更新',
// 							success: (showResult) => {
// 								if (showResult.confirm) {
// 									plus.runtime.openURL(openUrl);
// 								}
// 							}
// 						})
// 					}
// 				}
// 			})
// 			// #endif
// 		},
		computed: mapState([ 'UserInfo']),
		onShow: function() {
			this.$store.commit('GetData')
			console.log(this.UserInfo.Halfwaylogintime)
			this.$store.commit('GetUserInfo')
			if(this.UserInfo.userphone=='请登录'){
				return
			}
			console.log(this.UserInfo.logintime)
			var jsontime={
				logintimes:this.UserInfo.logintime,
				outlogintimes:this.UserInfo.Halfwaylogintime,
				diifer:1
			}
			this.$store.commit('getDifferDate',jsontime)
			console.log(this.UserInfo.DatNum)
			if(this.UserInfo.DatNum>30){
				this.$store.commit('logout')
				uni.showToast({
					title: '账户已过期，请重新登录!',
					duration: 1000,
					icon:"none"
				});
			}
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['GetUserInfo']),
		},
		onLoad(){
			console.log(this.UserInfo.userphone)
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import "./static/css/simplepro.css";
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}

	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #FFF;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}
	.uni-tabbar__icon{
		/* width: 16px!important;
		height: 16px!important; */
	}
	.uni-page-head__title{
		font-weight: normal!important;
		font-size: 0.8rem!important;
	}
	.uni-page-head{
		border-bottom: 1px solid #ECECEC;
	}
	.uni-tabbar{
		/* z-index: 1!important; */
		background-color: white!important;
	}
</style>
