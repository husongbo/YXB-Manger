<template>
    <view class="uni-common-pb">
		<!-- @click="setUp" -->
        <view class="page-section" @click="setUp">
            <view class="user-logo">
				<image :src="UserInfo.userimg" ></image>
				<span>{{UserInfo.userphone}}</span>
                <!-- <text class="own-relative">{{phone}}</text> -->
                <!-- <image  class="user-logo" @click="Replacepictures" mode="scaleToFill"></image> -->
            </view>
        </view>

        <view class="own-card">
            <view class="uni-flex uni-row">
				<view class="flex-item own-item borders" @click="clickintegral('interval')">
                    <view class="own-num">{{Usercapital.integral}}</view>
                    <view>积分</view>
				</view>
                <view class="flex-item own-item" @click="clickintegral('money')">
                    <view class="own-num">{{Usercapital.money}}</view>
                    <view>余额</view>
                </view>
            </view>
        </view>


        <view class="uni-list">
            <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in listarr" :key='index'>
                <view class="uni-list-cell-navigate uni-navigate-right" @click="triggerCollapse(index)">
                    <image style="width: 50upx; height: 45upx" :src="item.src"></image>
					<view class="uni-media-list-text-top">{{item.name}}</view>
                </view>
            </view>
        </view>
		<alerts :show='alertarray.show' :msg='alertarray.msg' :icon='alertarray.icon'></alerts>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
		<simpleDialog ref="simpleDialog3" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton1" @cancelButton="cancelButton1"></simpleDialog>
    </view>
</template>
<script>
    import uniIcon from '../../../components/uni-icon.vue'
	import footers from '../footer/footer.vue';
	import alerts from '@/components/loading/alert.vue'
	import simpleDialog from '@/components/loading/dialog.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';//引用store
    export default {
        components: {
            uniIcon,
			footers,
			alerts,
			simpleDialog
        },
		computed:{
			 ...mapState({
			 		UserInfo:state => state.UserInfo,
			 		userindex:state => state.userindex
			 	}),
			 hasLogins:{
			 	get(){
			 		return this.$store.state.hasLogins
			 	},
			 	set(val){
			 		this.$store.state.hasLogins=val
			 	}
			 },
			 hasLogin:{
			 	get(){
			 		return this.$store.state.hasLogin
			 	},
			 	set(val){
			 		this.$store.state.hasLogin=val
			 	}
			 },
		},
        data() {
            return {
				ids:4,
                phone:'',
                info:"info",
                title: 'swiper',
                background: ['color1', 'color2', 'color3'],
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,
				pictrue:'',//头像
                grids: [
                    {pic: '../../../static/banner/icon_youkachongzhi.png', text: '油卡充值'},
                    {pic: '../../../static/banner/icon_youhuiquan.png', text: '优惠券'},
                    {pic: '../../../static/banner/icon_xinyongjiayou.png', text: '信用加油'},
                    {pic: '../../../static/banner/icon_liantongzhuanxiang.png', text: '联通专享'},
                    {pic: '../../../static/banner/icon_zaixianshangcheng.png', text: '在线商城'},
                    {pic: '../../../static/banner/icon_goumaiyouquan.png', text: '无卡加油'}
                ],
				listarr:[
					{
						src:'../../../static/personCenter/icon_ykxs.png',
						name:'油卡管理',
						url:'/pages/myindex/Oilmanage/Oilmanage',
						index:1
					},
					{
						src:'../../../static/personCenter/icon_qdgl.png',
						name:'渠道管理',
						url:'/pages/myindex/Oilmanage/Oilmanage',
						index:2
					},
					{
						src:'../../../static/personCenter/icon_wode.png',
						name:'个人信息',
						url:'/pages/myindex/Personalinfo/Personalinfo',
						index:3
					},
					{
						src:'../../../static/personCenter/icon_fapiao.png',
						name:'油卡发票',
						url:'/pages/myindex/Invoiceinfo/Invoiceinfo',
						index:4
					},
					{
						src:'../../../static/personCenter/icon_fankui.png',
						name:'帮助与反馈',
						url:'/pages/myindex/Helpfeed/Helpfeed',
						index:5
					},
					{
						src:'../../../static/personCenter/icon_xieyi.png',
						name:'用户协议',
						url:'/pages/myindex/Useragreement/Useragreement',
						index:6
					},
					{
						src:'../../../static/personCenter/icon_guanyuwomen.png',
						name:'关于我们',
						url:'/pages/myindex/aboutme/aboutme',
						index:7
					}
				],
				alertarray:{//提示
					show:false,
					msg:'',
					icon:'msg'
				},
				alertindex:'',
				Usercapital:{
					integral:'0.00',
					money:'0.00'
				},
				sDialog: {
					message: '您还没有登录，请先登录！'
				}
            }
        },
		mounted(){
			var _this=this
			
			this.getinfo()
			
		},
        onShareAppMessage() {
            return {
                title: '欢迎体验uni-app',
                path: '/pages/tabBar/API/API'
            }
        },
        onNavigationBarButtonTap(e) {
			if(this.UserInfo.userphone=='请登录'){
				if(this.alertindex==0){
					this.alertarray.show=true
					this.alertarray.msg='请先登录您的账号'
					this.alertindex=1
					setTimeout(()=>{
						this.alertarray.show=false
						this.alertindex=0
					},1000)
				}
				return;
			}
			this.AjaxUserInfo("info")
			
            
        },
		watch:{
			UserInfo(news,olds){
				this.UserInfo=news
				console.log(this.UserInfo)
			},
			hasLogins(news,olds){
				this.hasLogins=news
				// if(!this.hasLogin&&this.hasLogins){
				// 	this.sDialog.message='微信用户你好，您还没有绑定注册基本信息，请前往完善，谢谢你的合作'
				// 	this.$refs.simpleDialog3.confirm({
				// 		title: '提示！',
				// 		message:this.sDialog.message
				// 	});
				// }
				this.integralLogin()
				this.moneyLogin()
				console.log(this.hasLogins)
			}
		},
        methods: {
			...mapMutations(['GetUserInfo','Changepic']),
			getinfo(){
				var flag=this.GetUserInfo()
				if(this.UserInfo.userphone=='请登录'){
					this.sDialog.message='您还没有登录，是否前往登录'
					this.$refs.simpleDialog2.confirm({
						title: '提示！',
						message:this.sDialog.message
					});
					return;
				}
				this.integralLogin()
				this.moneyLogin()
				// if(this.UserInfo.userphone!='请登录'){
				// 	uni.getSavedFileList({
				// 	  success: function (res) {
				// 		console.log(JSON.stringify(res.fileList));
				// 	}
				// })
				// }
			},
			//基本信息
			AjaxUserInfo(val){
				console.log(this.UserInfo.userid)
					var userdatas=`{method:"GetUserInfo",user_id:"${this.UserInfo.userid}"}`
					this.$api.ReagisterPhone(userdatas).then((res)=>{
						// console.log(JSON.stringify(res))
						this.UserInfo.userinfos=JSON.parse(res.data.user_info)[0]
					})
					if(val=='info'){
						uni.navigateTo({
						    url: '../UserInfo/UserInfo',
							animationType: 'pop-in',
							animationDuration: 200
						})
						return;
					}
					uni.navigateTo({
					    url: '../../myindex/Personalinfo/Personalinfo',
						animationType: 'pop-in',
						animationDuration: 200
					})
					
				
			},
			//积分
			integralLogin(){
				if(this.UserInfo.userphone!='请登录'){
					console.log("已登录")
					var datas=`{method:"GetUserScoreInfo",user_id:"$(this.UserInfo.userid)"}`
					this.$api.ReagisterPhone(datas).then((res)=>{
						// console.log(JSON.stringify(res))
						if(JSON.parse(res.data.data_score)==''||JSON.parse(res.data.data_score)==[]){
							this.Usercapital.integral='0.00'
							console.log("没有积分")
							return;
						}
						// console.log(JSON.parse(res.data.data_score)[0].SCORE)
						this.Usercapital.integral=JSON.parse(res.data.data_score)[0].SCORE
					})
					return;
				}
				this.Usercapital.integral='0.00'
				console.log("积分未登录")
			},
			//单击积分
			clickintegral(text){
				// ../../function/integral/integral
				if(this.UserInfo.userphone=='请登录'){
					this.$refs.simpleDialog2.confirm({
						title: '提示！',
						message:this.sDialog.message
					});
					return;
				}
				if(text=='interval'){
					uni.navigateTo({
						url:`../../function/integral/integral`,
						animationType: 'pop-in',
						animationDuration: 200	
					})
					return;
				}
				if(text=='money'){
					uni.navigateTo({
						url:`../../function/Balance/Balance`,
						animationType: 'pop-in',
						animationDuration: 200
					})
					return;
				}
				
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				uni.navigateTo({
					url:`../Login/Login`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			confirmButton1: function() {
				console.log('Dialog 确定按钮点击');
				uni.switchTab({
					url: '/pages/tabBar/gasCard/gasCard'
				});
			},
			cancelButton1: function() {
				console.log('Dialog 取消按钮点击');
			},
			//余额
			moneyLogin(){
				if(this.UserInfo.userphone!='请登录'){
					console.log("已登录")
					var datas=`{method:"GetUserMoneyInfo",user_id:"$(this.UserInfo.userid)"}`
					this.$api.ReagisterPhone(datas).then((res)=>{
						// console.log(JSON.stringify(res))
						// console.log(JSON.parse(res.data.data_score))
						if(res.data.message=='暂无用户余额信息'){
							this.Usercapital.money='0.00'
							console.log("没有余额")
							return;
						}
						// console.log(JSON.parse(res.data.data_score)[0].MONEY)
						this.Usercapital.money=JSON.parse(res.data.data_score)[0].MONEY
					})
					return;
				}
				this.Usercapital.money='0.00'
				console.log("余额未登录")
			},
            triggerCollapse(e) {
                    this.goDetailPage(this.listarr[e].url,this.listarr[e].index);
                for (var i = 0; i < this.listarr.length; ++i) {
                    if (e === i) {
                        this.listarr[i].open = !this.listarr[e].open;
                    } else {
                        this.listarr[i].open = false;
                    }
                }
            },
            goDetailPage(e,inx) {
                let url = ~e.indexOf('pages') ? e : '/pages/API/' + e + '/' + e;
				if(inx==3&&this.hasLogins){
					this.AjaxUserInfo()
					return;
				}
				if(inx==4){
					if(!this.hasLogins){
						this.$refs.simpleDialog2.confirm({
							title: '提示！',
							message:this.sDialog.message
						});
						return;
					}
				}
				//
                uni.navigateTo({
                    url: url,
					animationType: 'pop-in',
					animationDuration: 200
                })
            },
			//信息设置
			setUp(){
				if(this.UserInfo.userphone=='请登录'){
					uni.navigateTo({
					    url: '../Login/Login',
						animationType: 'pop-in',
						animationDuration: 200
					})
					return;
				}
				this.Replacepictures()
				// uni.navigateTo({
				//     url: '../UserInfo/UserInfo',
				// 	animationType: 'pop-in',
				// 	animationDuration: 200
				// })
			},
			//更换头像
			Replacepictures(){
				var _this=this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						console.log(res.tempFilePaths);
						_this.Changepic(res.tempFilePaths.toString())
						 uni.saveFile({
						  tempFilePath: res.tempFilePaths[0],
						  success: function (data) {
							var savedFilePath = res.savedFilePath;
							console.log(savedFilePath)
						  }
						});
					},
					fail:function(err){
						console.log(JSON.stringify(err));
						
					}
				});
			}
        }
    }
</script>

<style scoped>
    page {
        height: auto;
        min-height: 100%;
    }

    .uni-card {
        box-shadow: none;
    }

    .uni-list:after {
        height: 0;
    }

    .uni-list:before {
        height: 0;
    }

    .own-card {
        height: 108 upx;
        padding-top: 8 upx;
        /* left: 54px; */
        background: #fff;
    }

    .own-item {
        width: 50%;
        text-align: center;
    }

    .own-num {
        font-size: 32 upx;
        font-weight: 800;
    }

    .own-grid-9-text {
        line-height: 48 upx;
        font-size: 28 upx;
    }

    .own-bg-white {
        background: #fff;
    }

    .own-card-padding {
        padding: 16 upx 20px;
    }
    .own-divider{
        padding: 12upx 16upx;
    }
    .own-label-padding{
        padding: 16upx 16upx;
    }
    .own-relative{
        position: absolute;
        top: 52upx;
        left: 192upx;
        z-index: 400;
        font-size: 36upx;
        color: #fff;
    }
	.uni-navigate-right{
		position: relative;
	}
	.uni-navigate-right span{
		position: absolute;
		top: 0;
		left: 50upx;
	}
	.user-logo{
		width:100%;height: 172upx;
		margin-bottom: 20upx;
		display: flex;
		flex-direction:row;
		align-items: center;
		/* background: rgb(255,117,8); */
		background: -webkit-linear-gradient(left,rgb(255,117,8),rgba(254,177,76));
		/* padding: 0 40upx; */
	}
	.user-logo image{
		width: 100upx;
		height: 100upx;
		margin-left: 40upx;
		border-radius: 50%;
	}
	.user-logo span{
		margin-left: 20upx;
		font-size: 0.9rem;
	}
	.uni-list-cell:last-child{
		border-bottom: 2px solid #ccc;
	}
	.uni-media-list-text-top{margin-left: 30upx;font-size: 0.9rem;}
	.uni-list-cell-navigate{padding: 21px 15px;}
	.own-card{padding-bottom: 20upx;border-bottom: 2px solid #ccc;padding-top: 20upx;position: relative;z-index: 500;}
	.borders{border-right: 1px solid #ccc;}
	.uni-common-pb{
		padding-bottom: 0px;
		height: 100%;
		overflow-y: scroll;
	}
	.mui-bar-tab .mui-tab-item .mui-icon{
		display: block;
		margin-left: 38%;
	}
	.mui-bar{
		box-shadow: 0 0 1px #C0C0C0;
	}
	.mui-icon-home:before{
		content: '';
	}
	.mui-bar-tab .mui-tab-item .mui-icon{
		width: 20px;
		height: 18px;
		margin-bottom: 5px;
	}
	@media only screen and (min-width: 320px) and (max-width: 360px){
		.user-logo{
			width:100%;height: 148upx;
			position: relative;
		}
		.own-relative{
			top:20px;
		}
	}
	@media only screen and (min-width: 370px) and (max-width: 660px){
		.user-logo{
			width:100%;height: 154upx;
		}
		.own-relative{
			top:25px;
		}
	}
	@media only screen and (min-width: 410px) and (max-width: 430px){
		.user-logo{
			width:100%;height: 155upx;
		}
		.own-relative{
			left: 90px;
			top:25px;
		}
	}
	.page-section{
		position: relative;
	}
	.footer-img{
		width: 20px;
		height: 20px;
		position: relative;
		top:10upx;
	}
</style>
