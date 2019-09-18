<template>
    <view class="uni-common-pb" ref="xiwang" :style="{height: heights}">
		<!-- <view class="progress-box">
           <progress active percent="100" stroke-width="3" />
        </view> -->
		<view class="oil-card hide" style="position: relative;" v-if="Recharge">
			<view>
				<!-- <view style="width: 100%;height: 170px;">
					<img src=".../../../static/gasCard/ykkp.png" class="gasvardimg">
				</view> -->
				<view class="page-section" tyle="position: relative;">
				    <view class="uni-center" style="background:#FFFFFF; font-size:0;padding: 0 16upx;position: relative;">
				        <image class="image" style="width: 100%;" mode="widthFix" @longtap="opencode" src="../../../static/gasCard/ykkp.png"/>
						<view class="" style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;font-size: 1.3rem;color: white;padding-top:100upx;text-align: left;padding-left: 60upx;">
							{{UserInfo.cardinfo.CARD_CD}}
						</view>
				    </view>
				</view>
				<view class="ykkp-desc" tyle="position: relative;">
					每月10日是出账单日
				</view>
			</view>
			<navigator animation-type="pop-in" animation-duration="300" url="./Cardprocess/Cardprocess" open-type="navigate">
			<view class="card-lc"><span style="margin-left: 40upx;">补卡流程</span></view>
			</navigator>
			<view class="content-block">
				<view class="row">
					<navigator animation-type="pop-in" animation-duration="300" url="../../myindex/recharge/recharge" open-type="navigate">
					<view class="col-50">
						<view class="chongzhi-button">充值</view>
					</view>
					</navigator>
					<navigator animation-type="pop-in" animation-duration="300" url="./Reservefund/Reservefund" open-type="navigate">
					<view class="col-50">
						<view class="chongzhi-button select-btn">查询</view>
					</view>
					</navigator>
				</view>
				<view class="kfdh">
					挂失补卡请拨打客服电话： 
					<a href="#">400-680-0086</a>
				</view>
			</view>
			
		</view>
		<view v-if="Oilcard">
        <view class="page-section">
            <view class="uni-center" style="background:#FFFFFF; font-size:0;">
                <image class="image" style="width: 100%;" mode="widthFix" src="../../../static/gasCard/banner_img.png"/>
            </view>
        </view>
        <view class="page-section">
            <view class="uni-cell-divider own-divider">
                领取油卡
            </view>
            <view class="uni-form-item uni-column">
                <view class="uni-center" style="background:#FFFFFF; font-size:0;">
                    <image class="image" style="width: 100%; height: 320upx;" mode="aspectFit" src="../../../static/gasCard/img_erweima.png"/>

                </view>
                <text style="font-size:24upx;text-align: center ;background:#ffffff; color: red;">您可以识别二维码或者扫描渠道二维码领取油卡</text>
            </view>
        </view>

        <view  class="page-section">
            <view class="uni-cell-divider own-divider">
                绑定油卡
            </view>
            <view class="uni-form-item uni-column">
                <label class="uni-list-cell uni-list-cell-pd own-bg-white own-label-padding" style="-webkit-justify-content:end;">
                    <view class="title">油卡卡号:</view>
                    <view class="InputCrard">
                        <label class="label-2-text">
                            <input class="uni-input" style="font-size: .9rem;" v-model="userinfo.cardnum"  ref="card" adjust-position type="number" placeholder="请输入卡号"/>
                        </label>
                    </view>
                </label>
                <label class="uni-list-cell uni-list-cell-pd own-bg-white own-label-padding" style="-webkit-justify-content:end;">
                    <view class="title">确认卡号:</view>
                    <view class="InputCrard">
                        <label class="label-2-text">
                            <input class="uni-input" style="font-size: .9rem;" v-model="userinfo.cardnumber" adjust-position ref="card" type="number" placeholder="请再次输入卡号" />
                        </label>
                    </view>
                </label>
            </view>
			<view class="uni-cell-divider own-divider">
				<image class="imgs" src="../../../static/myicon/sm.png" mode=""></image>
			    <span>说明：每月10号为出账单日</span>
			</view>
            <view style="width: 100%;float: left;clear: both;">
            	<view class="col-50" style="width: 90%;margin: 20upx 5%;">
					
            		<view class="chongzhi-button select-btn" @click="binding">绑定</view>
            	</view>
            </view>
			</view>
			</view>
			<!-- <regs v-if="Register" class="regs-bom" @stauts="Stautshidden" @stautsvi="Stautsvisiable"></regs> -->
			<view  v-if="Register" >
				<view class="" style="display: flex;justify-content: center;margin-top: 30%;">
					<image src="../../../static/app-plus/no.png" mode="" style="width: 250upx;height: 200upx;"></image>	
				</view>
				<view class="" style="text-align: center;margin-top: 5%;color: #CCCCCC;font-size: .7rem;">
					用户您好，您还不可以使用此功能，请先注册后登录
				</view>
			</view>
			<loading :lotusLoadingData="lotusLoadingData"></loading>
			<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
			<simpleLoading ref="simpleLoading"></simpleLoading>
			<!-- <view class="Verification" :style="{display:vervisit}" :class="{'veramin':vershow}">
				{{Promptinfo}}
			</view> -->
    </view>
</template>
<script>
    import uniIcon from '../../../components/uni-icon.vue'
	import regs from '../../function/register/reg.vue';
	import footers from '../footer/footer.vue';
	import loading from '@/components/loading/Winglau14-LotusLoading.vue'
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';//引用store
    export default {
        components: {
            uniIcon,
			regs,
			footers,
			loading,
			alerts,
			simpleLoading
			
        },
		computed: mapState([ 'UserInfo','hasLogins','hascard']),
        data() {
            // 暂时这么写，后面看怎么优化。
            return {
				webviewStyles: {
                     progress: {
                        color: '#FF3333'
                    }
                },
				userinfo:{//卡号
					cardnum:'',
					cardnumber:''
				},
				ids:3,
                // info:"info",
                title: 'swiper',
                background: ['color1', 'color2', 'color3'],
                indicatorDots: true,
				visit:true,
				id:1,
                autoplay: true,
                interval: 2000,
                duration: 500,
				windowHeight:'',
				hasbeen:false,//登录前
				loginbeen:true,//登录后
				bom:'',
// 				docmHeight: document.documentElement.clientHeight, //默认屏幕高度
// 				showHeight: document.documentElement.clientHeight, //实时屏幕高度
				hidshow: 'visible', //显示或者隐藏footer
                grids: [
                    {pic: '../../../static/banner/icon_youkachongzhi.png', text: '油卡充值'},
                    {pic: '../../../static/banner/icon_youhuiquan.png', text: '优惠券'},
                    {pic: '../../../static/banner/icon_xinyongjiayou.png', text: '信用加油'},
                    {pic: '../../../static/banner/icon_liantongzhuanxiang.png', text: '联通专享'},
                    {pic: '../../../static/banner/icon_zaixianshangcheng.png', text: '在线商城'},
                    {pic: '../../../static/banner/icon_goumaiyouquan.png', text: '无卡加油'}
                ],
				lotusLoadingData:{
					isShow:false
				},
				vershow:true,//提示动画
				vervisit:'none',//提示动画是否显示
				Promptinfo:'',//提示信息
				verindex:0,//判断用户点击次数
				alertarray:{
					show:false,
					msg:''
				},
				Register:true,
				Oilcard:true,
				Recharge:true,
				cardinfos:'',
				heights:'',
            }
        },
		
        onShareAppMessage() {
            return {
                title: '欢迎体验uni-app',
                path: '/pages/tabBar/API/API'
            }
        },
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '/pages/about/about'
            });
        },
		mounted() {
			
		},
		onLoad(){
			var _this=this
			uni.getSystemInfo({
				success: function (res) {
					_this.heights=res.windowHeight+'px'	
				}
			});
			// console.log(this.UserInfo)
			console.log("油卡"+this.hascard)
			this.flaginfo()
		},
		watch:{
			UserInfo(news,olds){
				this.UserInfo=news
				console.log(this.UserInfo)
			},
			hascard(news,olds){
				this.hascard=news
				console.log(this.hascard)
				this.flaginfo()
			},
			hasLogins(news,olds){
				this.hasLogins=news
				this.flaginfo()
			},
			
		},
        methods: {
			...mapMutations(['bindingCard']),
            triggerCollapse(e) {
                if (!this.lists[e].pages) {
                    this.goDetailPage(this.lists[e].url);
                    return;
                }
                for (var i = 0; i < this.lists.length; ++i) {
                    if (e === i) {
                        this.lists[i].open = !this.lists[e].open;
                    } else {
                        this.lists[i].open = false;
                    }
                }
            },
			flaginfo(){
				if(!this.hasLogins&&!this.hascard){
					this.Recharge=false
					this.Register=true
					this.Oilcard=false
					return;
				}
				if(this.hasLogins&&!this.hascard&&this.UserInfo.userpH=="000000"){
					this.Recharge=false
					this.Register=true
					this.Oilcard=false
					return;
				}
				if(this.hasLogins&&!this.hascard&&this.UserInfo.userpH!="000000"){
					this.Recharge=false
					this.Register=false
					this.Oilcard=true
					return;
				}
				if(this.hasLogins&&this.hascard&&this.hascard&&this.UserInfo.userpH!="000000"){
					this.Recharge=true
					this.Register=false
					this.Oilcard=false
					return;
				}
			},
			//长按打开扫码功能
			opencode(){
				
			},
            goDetailPage(e) {
                let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
                uni.navigateTo({
                    url: url
                })
            },
			binding(){
				var _this=this
				if(this.userinfo.cardnum==''||this.userinfo.cardnumber==''){
						uni.showToast({
							title: '卡号不能为空',
							duration: 1000,
							icon:"none",
						});
					return;
				}
				if(this.userinfo.cardnum!=this.userinfo.cardnumber){
					// if(_this.verindex==0){
					// _this.Promptinfo='卡号不一致，请重新输入'
					// _this.vervisit='block'//提示动画是否显示
					this.alertarray.show=true
					this.alertarray.msg='卡号不一致，请重新输入'
					_this.verindex=1
					_this.userinfo.cardnumber=''
					setTimeout(()=>{
						// _this.vervisit='none'
						this.alertarray.show=false
						_this.verindex=0
					},1000)
				// }
					return false
			}
				console.log(this.UserInfo.userid)
				var datas=`{method:"ApplyCard",user_id:"${this.UserInfo.userid}",oil_card_id:"${this.userinfo.cardnumber}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					console.log(res)
					if(res.data.result==-1){
						this.userinfo.cardnum=''
						this.userinfo.cardnumber=''
						uni.showToast({
							title:res.data.message,
							duration: 1000,
							icon:"none",
						});
						return;
					}
					if(res.data.result==1){
						this.userinfo.cardnum=''
						this.userinfo.cardnumber=''
						uni.showToast({
							title:res.data.message,
							duration: 1000,
							icon:"none",
						});
						return;
					}
					if(res.data.result==0){
						this.$refs.simpleLoading.show({
							image:"../../../static/app-plus/tus.png",
							text:'绑定中...'
						});
						var datas=`{method:"GetUserCard",user_id:"${this.UserInfo.userid}"}`
						this.$api.ReagisterPhone(datas).then((res)=>{
							_this.cardinfos=JSON.parse(res.data.data)[0]
							_this.bindingCard(_this.cardinfos)
						})
						setTimeout(()=>{
							this.userinfo.cardnum=''
							this.userinfo.cardnumber=''
							this.$refs.simpleLoading.hide();
							uni.showToast({
								title:'绑定成功',
								duration: 1000,
								icon:"none",
							});
						},1000)
					}
				})
				
				// _this.verindex=1
				
			}
        }
   }
</script>

<style scoped>
	.uni-common-pb{
		background: white;
		/* padding-top: 0.5rem; */
/* 		overflow-x: hidden;	 */
		position: relative;
		/* width: 100%; */
		padding-bottom: 0;
		overflow-y: scroll;
	}
    page {
        height: auto;
        min-height: 100%;
    }
	.Verification{
		width: 80%;
		margin: 0 10%;
		position: fixed;
		bottom: 50%;
		left: 0;
		background: rgba(0,0,0,0.5);
		z-index: 1001;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		color: white;
		border-radius: 10upx;
		font-size: 0.8rem;
	}
	.veramin{
		animation: verifications .1s linear;
		animation-fill-mode:forwards;
	}
	@keyframes verifications{
		from{
			bottom:-40upx;
		}
		to{
			bottom:50%;
		}
	}
	.page-section{
		position: relative;
		float: left;
		clear: both;
		width: 100%;
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
	.footer-img{
		width: 20px;
		height: 20px;
		position: relative;
		top:10upx;
	}
    .own-card-padding {
        padding: 16 upx 20px;
    }
    .own-divider{
        padding: 12upx 16upx;
		overflow-x: hidden;
    }
    .own-label-padding{
        padding: 16upx 16upx;
    }
	.bd-buttons{
		text-align: center;
		padding: 1rem;
		padding-bottom: 0;
		width: 100%;
		height: 50px;
	}
	.bd-buttons img{
		width: 100%;
	}
	.regs-bom{
		/* margin-bottom: 50px; */
	}
	.gasvardimg{
		width: 100%;
		padding-left: 1rem;
		padding-right: 1rem;
		height: 100%;
	}
	.card_cd{
		top: 0;
		position: absolute;
		height: 10rem;
		line-height: 10rem;
		color: #fff;
		text-align: center;
		width: 100%;
		font-size: 1.5rem;
	}
	.ykkp-desc{
		font-size: 0.6rem;
		padding-left: 1rem;
		color: #333;
	}
	.card-lc{
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: white;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		margin-top: 20upx;
		font-size: 0.9rem;
	}
	.card-lc:active{
		background: #00B26A;
	}
	.content-block{
		margin: 1.75rem 0;
		padding: 0 0.75rem;
		color: #6d6d72;
	    margin-top: 1.8rem;
	}
	.row{
		overflow: hidden;
		margin-left: -4%;
	}
	.col-50{
		width: 46%;
		margin-left: 4%;
		box-sizing: border-box;
		float: left;
	}
	.chongzhi-button{
		line-height: 2.4rem;
		font-size: 0.85rem;
		height: 2.4rem;
	    background-color: rgba(0, 0, 0, 0);
		border: 1px solid #ff8200 !important;
		color: #ff8200 !important;
	    text-decoration: none;
		text-align: center;
		display: block;
		border-radius: 0.25rem;
	}
	.chongzhi-button:active{
		background:#EEE9BF;
	}
	.select-btn{
		background-color: #ff8200 !important;
		color: #fff !important;
	}
	.kfdh{
		margin-top: 0.8rem;
		color: #e4393c;
		font-size: 0.6rem;
		text-align: center;
	}
	.uni-input{
		padding: 0;
	}
	.uni-cell-divider{
		background: rgb(238,238,238);
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
	.title{
		padding: 10upx 12upx;
		width:25%;
	}
	.imgs{
		width: 32upx;
		height: 32upx;
		float: left;
		position: relative;
		top:10upx;
		margin-right: 10upx;
	}
	.uniinput{
		position: relative;
		bottom: 100px;
	}
	.InputCrard{
		width: 75%;
	}
</style>
