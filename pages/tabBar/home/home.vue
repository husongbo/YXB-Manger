<template>
    <view class="uni-common-pb">
		<view v-if="showLoader">
        <!-- 加载动画页 -->
        <mht-loader loadingType="satellite"></mht-loader>
		</view>
		<view v-else>
        <view class="page-section swiper">
           <view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay=true :interval=2500
                        :duration=500 circular=true>
				  <swiper-item>
				    <div class="swiper-item">
				      <image style="width: 100%;height:160px;" src="../../../static/banner/banner.png"></image>
				    </div>
				  </swiper-item>
				  <swiper-item>
				    <div class="swiper-item">
				      <image style="width: 100%;height:160px;" src="../../../static/banner/banner3.png"></image>
				    </div>
				  </swiper-item>
				  <swiper-item>
				    <div class="swiper-item">
				      <image style="width: 100%;height:160px;" src="../../../static/banner/banner2.png"></image>
				    </div>
				  </swiper-item>
				</swiper>
            </view>
        </view>

        <!-- <view class="own-card">
            <view class="uni-flex uni-row">
                <navigator animation-type="pop-in" animation-duration="300" url="../../function/integral/integral" open-type="navigate" class="flex-item own-item">
                    <view class="own-num">0</view>
                    <view>积分</view>
                </navigator>
                <view class="flex-item own-item" @click="shopshowtwo">
                    <view class="own-num">0.00</view>
                    <view>信用额度</view>
                </view>
            </view>
        </view> -->
		<view class="uni-card funclass">
		     <view class="uni-grid-9 uni-common-mt own-bg-white ">
		         <view class="uni-grid-9-item"  v-for="(item,index) in funlist" :key="index" @click="getfunction(item.index)" :class="index % 3 === 2 ? 'no-border-right' : ''" >
							<image class="uni-grid-9-image" :src="item.pic"></image>
							<text class="uni-grid-9-text own-grid-9-text">{{item.text}}</text>
		         </view>
		     </view>
		 </view>
		 <view class="titles">
			 活动专区
		</view>
       <!-- <view class="uni-card tabbarfun">
            <view class="uni-grid-9 uni-common-mt own-bg-white uniimages">
                <view class="uni-grid-9-item " v-for="(item,index) in grids" :key="index" @click="triggerCollapses(index)" :class="index % 3 === 2 ? 'no-border-right' : ''" >
					<image class="uni-grid-9-image" :src="item.pic"></image>
					<text class="uni-grid-9-text own-grid-9-text">{{item.text}}</text>
                </view>
            </view>
        </view> -->
		<div class="uni-card tabbarfun" style="position: relative;">
			<div style="height: 110px;display: flex;flex-direction: row;">
				<img src="../../../static/banner/Jingpin.png" @click="ImgClick('Jingpin')" style="width: 50%;height: 100%;border-radius: 10px 0 0 10px;">
				<img src="../../../static/banner/association.png" @click="ImgClick('Acc')" style="width: 50%;height: 100%;border-radius: 0 10px 10px 0;">
			</div>
		</div>
		
		
		<view class="transverse-ad funclass" @click="shopshow">
			<ul style="margin: 0rem;padding-left:0rem">
				<li style="list-style:none">
					<view class="card">
						<view class="card-content">
							<view class="card-content-inner ad-padding">
								<view class="news">
									发【优惠券】啦！快找找，有没有你啊~
								</view>
								<view class="card-content">
									<span>点击领取</span>
								</view>
							</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
		
		<view class="funclass" style="float: left;clear: both;margin-bottom: 10upx;padding: 10upx 0;">
           <view class=" uni-column" style="width: 46%;float: left;height: 300upx;margin: 2%;" @click="gotos">
                <image src="../../../static/banner/content_banner_shouchong.png" style="width: 100%;height:100%"></image>
            </view>
           <view class="" style="width: 46%;float: right;height: 300upx;margin: 2%;">
                <view class="" style="height:46%;margin:2%;">
                    <image src="../../../static/banner/content_banner_shuaka.png" style="width:100%;height:100%;"></image>
                </view>
				<view class="" style="height:46%;margin:2%;">
				    <image src="../../../static/banner/content_banner_butie.png" style="width:100%;height:100%;"></image>
				</view>
                <!-- <view class="" style="height: 50%;width:90%;padding: 5px;">
                        <image src="../../../static/banner/content_banner_butie.png" style="width:100%;height: 100%;"></image>
                </view> -->
            </view>
		</view>
		<!-- 电子券弹框 -->
		<view style="position: fixed;z-index: 999;top: 0;left: 0;display: flex; align-items: center;justify-content: center;background: rgba(0, 0, 0, .46);width: 100%;height: 100%;" :style="{visibility: confirmColor}" >
			<view class="modal-content" ref="con" :class="{'modal-sizemins':ismodal,'modal-amin':ismodals}">
				<view name='title'>
					<view class="modal-text-center modal-title">提示信息</view>
				</view>
				<view name='text'>
					<view class="modal-main modal-text-center">
						尊敬的用户，为了提升您的加油体验，我们正在对油信宝无卡加油模块进行检修与升级，由此带来的不便敬请谅解，与此同时，您可通过渠道向本公司申领油卡继续享受叠加优惠，感谢您的支持。
					</view>
				</view>
				<view class="modal-row modal-border-top">
					<view class="modal-col modal-border-right" hover-class="modal-active" @click="cancel">取消</view>
					<view class="modal-col" hover-class="modal-active" style="color:rgb(0, 122, 255)" @click="confirm">
						确定
					</view>
				</view>
			</view>
		</view>
		<!-- 信用加油，在线商城 -->
		<!-- <graceuiAlert :show="show" :msg="msg" :msgtype="msgtype"></graceuiAlert> -->
		
		<view style="position: fixed;z-index: 999;top: 0;left: 0;display: flex; align-items: center;justify-content: center;background: rgba(0, 0, 0, .46);width: 100%;height: 100%;" :style="{visibility: confirmColors}">
			<view class="modal-content" ref="cons" :class="{'modal-sizemins':ismodal,'modal-amin':ismodals}">
				<slot name='text'>
					<view class="modal-main modal-text-center">
						尚未开通，敬请期待
					</view>
				</slot>
				<view class="modal-row modal-border-top">
					<view class="modal-col" hover-class="modal-active" style="color:rgb(0, 122, 255)" @click="confirms">
						好的
					</view>
				</view>
			</view>
		</view>
		<!-- 油卡充值 -->
		<view style="position: fixed;z-index: 999;top: 0;left: 0;display: flex; align-items: center;justify-content: center;background: rgba(0, 0, 0, .46);width: 100%;height: 100%;" :style="{visibility: confirmYKColors}">
			<view class="modal-content" ref="cons" :class="{'modal-sizemins':ismodal,'modal-amin':ismodals}">
				<slot name='text'>
					<view class="modal-main modal-text-center">
						绑定油卡后才可以进行此操作，现在要去绑定油卡吗？
					</view>
				</slot>
				<view class="modal-row modal-border-top">
					<view class="modal-col modal-border-right" hover-class="modal-active" @click="cancelclose">取消</view>
					<view class="modal-col" hover-class="modal-active" style="color:rgb(0, 122, 255)" @click="confirmredit">
						绑定油卡
					</view>
				</view>
			</view>
		</view>
		</view>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
</template>
<script>
	import graceuiAlert from '../../about/graceui-alert/graceui-alert.vue';
	import modals from '../../function/x-modal/x-modal.vue'
	import mhtLoader from '../../function/mht-loader/mht-loader.vue';
	import simpleDialog from '@/components/loading/dialog.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
// 	window.onresize = function () {
//         var  windowHeight= $(window).height();//获取窗口的可见高度,不是整个文档的高度
//         var screenHeight = window.screen.availHeight;//获取浏览器的屏幕的可用高度
//         //alert(windowHeight+','+window.screen.availHeight);
// 		console.log(windowHeight+"....."+screenHeight)
//             if (parseInt(windowHeight) <= parseInt(screenHeight) / 2) {
//                 $('.uni-tabbar').hide();
// 				// focusElem.scrollIntoView(false);
// 				alert("a")
//             } else {
// 				
//                 $('.uni-tabbar').show();
//             }
//     }
    export default {
		components:{
			graceuiAlert,
			modals,
			mhtLoader,
			simpleDialog
		},
		computed: mapState(['UserInfo','hasLogin']),
        data() {
            return {
				ceshide:'',//测试的
				showLoader:false,
				confirmColor:'hidden',
				confirmColors:'hidden',
				txt:true,
				ismodal:false,
				flag:false,
				confirmYKColors:'hidden',
				ismodals:false,
				show : null,
				amin:true,
				amins:false,
                msg : '',
                msgtype : 'error',
				alertTimer:null,
                title: 'swiper',
				abo:'true',
                background: ['color1', 'color2', 'color3'],
                indicatorDots: true,
                autoplay: true,
                interval: 2000,
                duration: 500,                                                                                                  
				lists:{
					pageNum:1,
					pageSize:10
				},
                grids:[
					{pic: '../../../static/banner/jin.png',text: '优惠加油',url: '/pages/function/Prerefueling/Prerefueling'},
					{pic: '../../../static/banner/icon_liantongzhuanxiang.png',text: '联通专享',url: '/pages/function/Unicom/Unicom'},
                    {pic: '../../../static/banner/huodong.png',text: '活动1',url: ''},
                    {pic: '../../../static/banner/huodong.png',text: '活动2',url: ''},
					{pic: '../../../static/banner/huodong.png',text: '活动3',url: ''},
					{pic: '../../../static/banner/gengduo.png',text: '更多',url: ''},
                ],
				funlist:[
					{pic:'../../../static/banner/sao.png',text: '扫一扫',url: '',index:1},
					{pic:'../../../static/banner/ka.png',text: '去加油',url: '/pages/function/Buygasrolls/Buygasrolls',index:2},
					{pic:'../../../static/banner/shui.png',text: '卡/券',url: '/pages/index/Coupon/Coupon',index:3},
					{pic:'../../../static/banner/money.png',text: '余额',url: '/pages/function/Balance/Balance',index:4},
				],
				sDialog: {
					message: '您可能还登录，请前往登录'
				},
            }
        },
        onNavigationBarButtonTap(e) {
            uni.navigateTo({
                url: '/pages/about/about'
            });
        },
		watch:{
			hasLogin(news,olds){
				this.GetUserInfo()
			}
		},
		onLoad(){
			
			// var 
// 			window.onscroll=function(){
// 				var t =document.documentElement.scrollTop||document.body.scrollTop;
// 				console.log(t)
// 				}
			// uni.showNavigationBarLoading();
			// this.$api.list(this.lists).then((res)=>{
			// 	console.log(res)
   //                  uni.showToast({
   //                      title: '请求成功',
   //                      icon: 'success',
   //                      mask: true
   //                  });
   //              }).catch((err)=>{
   //                  // this.loading = false;
   //                  console.log('request fail', err);
   //              })
		},
        methods: {
			...mapMutations(['GetUserInfo']),
			cancel(){
				this.confirmColor="hidden";	
				this.ismodals=false
				this.ismodal=true
			},
			cancelclose(){
				this.confirmYKColors="hidden";	
				this.ismodals=false
				this.ismodal=true
			},
			confirmButton: function() {
				console.log('Dialog 确定按钮点击');
				uni.navigateTo({
				    url: '../Login/Login',
					animationType: 'pop-in',
					animationDuration: 200
				})
				
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			confirm(){
				this.confirmColor="hidden";	
				this.ismodals=false
				this.ismodal=true
				uni.navigateTo({
					url:'../../../pages/function/Buygasrolls/Buygasrolls',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			ImgClick(text){
				var url
				if(text=='Jingpin'){
					url='../../function/Prerefueling/Prerefueling'
				}
				else{
					url='../../function/Unicom/Unicom'
				}
				uni.navigateTo({
					url:url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			confirmredit(){
				this.confirmYKColors="hidden";	
				this.ismodals=false
				this.ismodal=true
				uni.switchTab({
					url: '/pages/tabBar/gasCard/gasCard'
				});
			},
			confirms(){
				var cons=this.$refs.cons
				this.confirmColors="hidden"
				this.ismodals=false
				this.ismodal=true
			},
			
            triggerCollapses(e) {
				var urls=this.grids[e].url;
				var name=this.grids[e].text;
				console.log(urls)
				if(urls==''){
					console.log("电子券")
					if(name=="电子券"){
						this.confirmColor="visible"
						this.ismodals=true	
						this.ismodal=false
					}
					else if(name=="油卡充值"){
						this.confirmYKColors="visible"
						this.ismodals=true	
						this.ismodal=false
					}
					else{
						this.confirmColors="visible"
						this.ismodals=true
						this.ismodal=false
					}	
				}
				else{
					console.log("bbbbbbbb")
					uni.navigateTo({
					    url: urls,
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
            },
			//获取值判断执行那个命令
			getfunction(inx){
				var urls=this.funlist[inx-1].url;
				if(inx==1){//扫码功能
					uni.scanCode({
						success: function (res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);
						}
					});
					return;
				}
				if(inx==4||inx==2||inx==3){
					if(this.UserInfo.userphone=='请登录'){
						this.$refs.simpleDialog2.confirm({
							title: '提示！',
							message:this.sDialog.message
						});
						return;
					}
				}
				uni.navigateTo({
				    url: urls,
					animationType: 'pop-in',
					animationDuration: 200
				})
				
			},
			gotos(){
				uni.navigateTo({
				    url: '../../Businessmen/Testing/Testing',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
            goDetailPage(e) {
                let url = ~e.indexOf('pages') ? e : '/pages/API/' + e + '/' + e;
                uni.navigateTo({
                    url: url,
					animationType: 'pop-in',
					animationDuration: 200
                })
            },
			shopshow(){
                this.show    = true;
                this.msgtype = "right";
                this.msg     = "操作成功 ^_^";
				this.flag    = true
                //延迟关闭
                var _self = this;
                if (this.alertTimer != null) { clearTimeout(this.alertTimer);}
                this.alertTimer = setTimeout(function(){
					_self.show = false;
					 _self.msg = '';
					 this.flag=false;
					 console.log(this.flag);
					 setTimeout(function(){
						 _self.show = '';
						  _self.msg = '';
						  this.flag=false;
					 },2000)
					 }, 2000);
				
            },
			shopshowtwo(){
				// alert("我是阿波")
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
		/* margin-top: 4px; */
		overflow-x: hidden;
    }
	.swiper{
		height: 160px;
	}
    .uni-list:after {
        height: 0;
    }
	.uniimages .uni-grid-9-image:nth-child(1){
		/* width: 120upx;
		height: 120upx; */
	}
    .uni-list:before {
        height: 0;
    }
	.uni-common-mt{
		margin-top: 14upx;
	}
    .own-card{
        height: 108upx;
        padding-top: 8upx;
        /* left: 54px; */
        background: #fff;
    }
    .own-item{
        width: 50%;
        text-align: center;
    }
    .own-num{
        font-size: 32upx ;
        font-weight: 800;
    }
    .own-grid-9-text{
        line-height: 48upx;
        font-size: 28upx;
    }
    .own-bg-white{
        background: #fff;
    }
    .own-card-padding{
        padding: 16upx 20px;
    }
	.uni-grid-9{
		border-top: 0;
	}
	
	.uni-grid-9-item{
		border: 0;
		width:25%;
	}
	.funclass,.tabbarfun{
		/* margin-top: 0; */
		width: 96%;
		padding: 40upx 0;
		border-radius: 10px;
		border: 0.5px solid rgb(250,250,250);
		margin:0 2%;
		box-sizing: border-box;
		box-shadow: 0 0 0.6rem rgba(220, 220, 220, 0.6);
	}
	.tabbarfun{
		padding: 0;
	}
	.tabbarfun image{
		width: 80upx;
		height: 80upx;
	}
	.uni-grid-9{
		width: 100%;
	}
	.funclass{
		margin-top: 16upx;
	}
	.funclass image{
		/* padding: 0 30px; */
		width: 40upx;
		height: 40upx;
	}
	.funclass .uni-grid-9-item{
		height:auto;
	}
	.titles{
		height: 80upx;
		line-height: 80upx;
		padding: 10upx 0 0 40upx;
		font-size: 0.7rem;
		font-weight: bold;
	}
	.border-3{
		height: 3px;
		background: url(../../../static/banner/img_fengexian.png) no-repeat;
	}
	.transverse-ad{
	background: url(../../../static/banner/link_img_zuixinzixun.png) no-repeat;
    height: 2.7rem !important;
    background-size: 100% 2.7rem;
    overflow: hidden;
	}
	.card{
		border-radius: 0;
		margin: 0rem;
		position: relative;
		font-size: 0.7rem;
	}
	.card-content{
		position: relative;
	}
	.card-content-inner{
		position: relative;
	}
	.ad-padding{
		padding: 0 17%;
	}
	.news{
		font-size: 0.6rem;
		margin-top: -0.7rem;
		overflow: hidden;
		height: 1rem;
	}
	.card-content {
		position: relative;
	}
	.uni-common-pb{
		position: relative;
		z-index:0;
		padding: 0;
		background: white;
		/* height: calc(100vh - 51px); */
		overflow-y: scroll;
	}
	.flex-item:first-child{
		border-right: 1px solid #CCC;
	}
	.card-content span{
		font-size: 0.6rem;
		background: red;
		color: white;
		padding: 4upx 12upx;
		border-radius: 20upx;
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
	uni-modal{
		display: block;
	}
	
	.modal-view{position: fixed;z-index: 999;top: 0;left: 0;display: flex; align-items: center;justify-content: center;background: rgba(0, 0, 0, .46);width: 100%;height: 100%;}
		.modal-content{background: #fff;width: 80%;border-radius: 6px;overflow: hidden;position: relative;padding-bottom: 50px;will-change: auto;}
		.modal-amin{animation: sizes .1s linear;}
		.modal-sizemins{animation: sizemins .1s linear;}
		.modal-row {display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;position: absolute !important;left: 0;right: 0;bottom: 0;height: 50px;line-height: 50px;text-align: center;font-size: 18px;color: rgb(3, 3, 3);}
		.modal-col {-ms-flex-preferred-size: 0;flex-basis: 0;-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;position: relative;height: 50px;line-height: 50px;}
		
		.modal-active{background: #f2f2f2;}
		.modal-title{font-size: 18px;text-align: center;padding: 1em 1.6em .3em;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
		.modal-main{padding: 1.3em 1.6em 1.3em;font-size: 15px;line-height: 26px;max-height: 400px;overflow-y: auto;color: #999;}
		.modal-padding{padding: 10px 15px;}
		.modal-text-center{text-align: center;border-bottom: 1px dashed #ccc;color: #999;}
		.modal-border-top::after, .modal-border-right::after{content: '';position: absolute;top: 0;right: 0;}
		.modal-border-top::after{left: 0;}
		.modal-border-right::after{bottom: 0;width: 1px;border-right: 1px solid #d5d5d5;}
	.modal-view.modal-show{
		visibility: visible;opacity: 1;
		
	}
	.modal-content{-webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1);}
	@keyframes  sizes{
		from{
			transform: scale(0.5);
		}
		to{
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes  sizemins{
		from{
			transform: scale(1);
		}
		to{
			transform: scale(0);
			opacity: 0;
		}
	}
	uni-view{
		line-height: inherit;
	}
	.footer-img{
		width: 20px;
		height: 20px;
		position: relative;
		top:10upx;
	}
</style>
