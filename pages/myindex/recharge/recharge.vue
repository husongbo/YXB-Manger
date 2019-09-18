<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="page-section">
		    <view class="uni-center" style="background:#FFFFFF; font-size:0;padding: 4upx 20upx;">
		        <image class="image" style="width: 100%;" mode="widthFix" src="../../../static/gasCard/ykkp.png"/>
		    </view>
		</view>
		<view class="border"></view>
		<view class="margin-zero">
			<view class="card-content">
				<view class="card-content-inner">
					<view class="cz-czje">充值余额</view>
					<view style="border-bottom: 1px solid #DDDDDD;margin-top:1.7rem;height: 31px;line-height: 30px;clear: both;" class="je">
						<view style="width:5%;display: inline;float: left;height: 30px;line-height: 30px;">￥</view>
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input" :style="{color:col}">{{pricetext}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="border"></view>
		<!-- <view class="content-block-title">
			<span>优惠券</span>
		</view>
		<view class="yhq-list-box">
			<view class="card" style="display: none;">
				<view class="yh-yhjts">
					<view class="yhjts-img">
						<img src="../../../static/gasCard/no-dyq.png" alt="" style="height: 0.7rem;border: 0;width:100%;">
						<span>优惠券</span>
					</view>
					<view class="color-gray">无抵用券使用</view>
				</view>
			</view>
			
			<view class="card">
				<view class="yh-yhjts">
					<view class="yhjts-img">
						<img src="../../../static/gasCard/no-dyq.png" alt="" style="height: 0.7rem;border: 0;width:0.8rem;">
						<span>优惠券</span>
					</view>
					<view class="card-content"></view>
					<view class="card-footer">
						<view class="radios"><radio value="radio1" /><span style="position: relative;top:5upx;">全选</span></view>
						<view class="numbers">
							已选&nbsp;
							<span class="selNum">&nbsp;0张,可抵用&nbsp;</span>
							<span class="selPrice">0.00</span>
							&nbsp;元
						</view>
					</view>
				</view>
			</view>
		</view>
		

		<view class="bar-tab">
			<a class="tab-item" style="font-weight: bold;">
				<span style="font-size: 0.65rem;color: #333;">应支付:</span>
				<span id="total" style="color: #E4393C;font-size: 0.85rem;">￥0.00</span>
			</a>
			<a class="tab-item" id="cz">
				结算
			</a>
		</view> -->
		<view class="content-block-title">
			<span style="color:#C8C7CC;">优惠券</span>
		</view>
		<view class="yhq-list-box">
			<view class="card" v-if="!CrolssQUan">
				<view class="yh-yhjts" style="display: flex;flex-direction: row;">
					<view class="yhjts-img" style="float: left;clear: both;">
						<view class="yhjts-left" style="width: 40%;float: left;display: flex;flex-direction: row;align-items: center;">
						<img src="../../../static/gasCard/no-dyq.png" alt="" style="height: 0.7rem;border: 0;">
						<span style="margin-left: 20upx;font-weight: bold;">优惠券</span>
						</view>
						<view style="float: right;width: 60%;text-align: right;color: red;font-weight: bold;">
							无抵用券使用
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="card" v-if="CrolssQUan">
				<view class="yh-yhjts">
					<view class="yhjts-img" style="float: left;clear: both;">
						<view class="yhjts-left" style="width: 40%;float: left;display: flex;flex-direction: row;align-items: center;">
						<img src="../../../static/gasCard/no-dyq.png" alt="" style="height: 0.7rem;border: 0;">
						<span style="margin-left: 20upx;font-weight: bold;">优惠券</span>
						</view>
						<view style="float: right;width: 60%;text-align: right;color: red;font-weight: bold;">
							{{couponlist.length}}张券可用/共{{couponlist.length}}张券
						</view>
					</view>
					
					<view class="card-content"></view>
					
					<view class="coupon_box">
<!-- 							<view class="other_type">
							<view class="text"><span>全面型优惠券</span></view>
						</view>
						<coupon v-for="(item, index) in coupon[0].list" :key="index" v-bind:item="item" theme="#ff0000"></coupon> -->
						<!-- <view class="other_type">
							<view class="text"><span>简洁型优惠券</span></view>
						</view> -->
						<coupon v-for="(item, index) in couponlist" @completed="GetBuy" :BuyClear="BuyClear" :key="index" v-bind:item="item" :BuyCountNums="BuyCountNum" :Buymoeny="CountBuyMoney" :checked="checkchecke" types="carts" theme="#ff6c00" color="#ffffff"></coupon>
					</view>
										
					<view class="card-footer">
						<view class="radios" style="display: flex;align-items: center;">
							<!-- <radio-group @change="checkchecked">
								<radio :checked="checkchecke" :disabled="dischecked" />
								<span style="position: relative;top:5upx;">全选</span>
							</radio-group> -->
							<view class="radioss" @click="checkchecked" style="width: 40upx;height: 40upx;border:1px solid #ff9000;border-radius: 50%;position: relative;">
								<image v-if="checkchecke" src="../../../static/app-plus/radio.png" style="position: absolute;top: 0;left: 0;width: 40upx;height: 40upx;"></image>
							</view>
							<span style="position: relative;top:5upx;margin-left: 20upx;">全选</span>
						</view>
						<view class="numbers">
							已选&nbsp;
							<span class="selNum">&nbsp;{{Buyindex}}张,可抵用&nbsp;</span>
							<span class="selPrice">{{BuyNumber}}</span>
							&nbsp;元
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="Verification" :style="{display:vervisit}" :class="{'veramin':vershow}">
			{{Promptinfo}}
		</view>
		<!-- 底部 -->
		<view class="bar-tab">
			<a class="tab-item" style="font-weight: bold;">
				<span style="font-size: 0.65rem;color: #333;">应支付:</span>
				<span id="total" style="color: #E4393C;font-size: 0.85rem;">￥{{CountBuyMoney | filmoney}}</span>
			</a>
			<a class="tab-item" id="cz" @click="Settlement">
				结算
			</a>
		</view>
		<!-- 结算(层) -->
		<view class="disk" v-if="diskif" @click="closepay">
		</view>
		<view class="Payment" v-if="diskif" :class="{'Payaminate':Payamin}" >
			<view v-if="payone">
				<view class="pay-title">
					确认付款
					<image src="../../../static/navIcon/close.png" @click="closepay"></image>
				</view>
				<view class="pay-middle">
					￥<span>{{CountBuyMoney}}</span>
				</view>
				<view style="border-bottom: 1px solid #ECECEC;" class="pay-active" @click="Replacemode">
				<view class="pay-xz">
					<span style="color:#ACACB4">付款方式</span>
					<view class="pay-next">
						<span style="height: 35px;line-height: 35px;">{{payreplacetext}}</span>
						<image src="../../../static/navIcon/next.png" mode=""></image>
					</view>
				</view>
				</view>
				<button type="primary" class="paymentbtn" @tap="confirmPwd">立即付款</button>
			</view>
			<view v-if="paytwo">
				<view class="pay-title pay-titles">
					选择付款方式
					<image src="../../../static/navIcon/back.png" mode="" @click="backpayone"></image>
				</view>
				<view style="border-bottom: 1px solid #ECECEC;" class="pay-active" @click="weixinoption">
					<view class="pay-xz pay-xzs">
						<view class="pay-xzs">
						<image src="../../../static/personCenter/weixin.png" mode=""></image>
						<span style="color:#ACACB4">微信</span>
						<span style="color:white;background: #C0C0C0;margin-left: 20upx;font-size: 0.6rem;padding: 4upx;">推荐</span>
						</view>
						<image src="../../../static/personCenter/icon_ok.png" v-if="weixinimage"></image>
					</view>
				</view>
				<view style="border-bottom: 1px solid #ECECEC;" class="pay-active" @click="Optionbalance">
					<view class="pay-xz pay-xzs">
						<view class="pay-xzs">
						<image src="../../../static/personCenter/balance.png" mode=""></image>
						<span style="color:#ACACB4">账户余额</span>
						<span style="color:#ACACB4;margin-left: 20upx;">(剩余:￥{{money}})</span>
						<span style="color:#ACACB4;margin-left: 20upx;" v-if='moneyno'>余额不足</span>
						</view>
						<image src="../../../static/personCenter/icon_ok.png" v-if="balanceimage"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 账户余额支付 -->
		<!-- <view class="keyboard-container"> -->
			<uni-keyboard @completed="done" ref="keyboard" :CouponPrice='CountBuyMoney'></uni-keyboard>
			<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
			<simpleLoading ref="simpleLoading"></simpleLoading>
		<!-- </view> -->
		<!-- 二维码生成 -->
		<view class="QRcode" v-if="QRcode">
			<view class="qrimg">
				<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"  :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
			</view>
			<view style="text-align: center;margin-top: 20upx;">请扫描此二维码</view>
				<view class="btns" style="display: flex;justify-content: center;">
					<button @tap="saveQrcode" style="padding: 10upx 20upx;display: flex;align-items: center;margin-top: 20upx;background: rgb(50,219,198);color:white;border: 0;">保存二维码</button>
					<!-- <button type="warn" @tap="clearQrcode">清除二维码</button> -->
				</view>
			</view>
	</view>
</template>

<script>
	import uniKeyboard from '@/components/uni-keyboard.vue'
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import { mapState,mapMutations } from 'vuex';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import coupon from '@/components/coolc-coupon/coolc-coupon';
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				array: ['100', '200', '500', '800','1000'],
				index:1,
				col:"#ccc",
				pricetext:'请选择金额',
				couponlist: [],
				checkchecke:false,//radio是否选中
				vershow:true,//提示动画
				vervisit:'none',//提示动画是否显示
				Payamin:false,//支付动画
				diskif:false,//模板层,
				payone:true,//第一步
				paytwo:false,//第二步
				weixinimage:true,//默认选择微信
				balanceimage:false,//选择账户余额
				money:"0.00",//余额
				Promptinfo:'',//提示信息
				payreplacetext:'微信',//获取支付方式
				alertarray:{
					show:false,
					msg:''
				},
				BuyMoney:'',
				CountBuyMoney:'',
				moneyno:false,
				gasrolls:true,//加油成功
				QRcode:false,//二维码显示
				
				
				val:"", // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: 'white', // 背景色
				foreground: 'black', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '../../../static/login/tus.png', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' ,// 二维码生成后的图片地址或base64
				Buyindex:0,//使用了多少加油券
				BuyNumber:'0.00',//加油券总数
				BuyCountNum:0,//加油券总金额
				dischecked:true,
				radioImg:false,
				Settimeout:'',//定时器
				ceshiindex:0,
				CrolssQUan:true,
				BuyClear:false,
			};
		},
		computed: mapState([ 'UserInfo']),
		onLoad(){
			var _this=this
			_this.val="id=2,name=胡松波"
			this.GetBuyCountMoney()
			//测试定时器
			// this.Settimeout=setInterval(function(){
			// 	_this.ceshiindex++
			// },1000)
		},
		components: {
			uniKeyboard,
			alerts,
			simpleLoading,
			tkiQrcode,
			coupon
		},
		filters:{
			filmoney(val){
				if(val==''){
					val='0.00'
				}
				return val
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: '/pages/function/coderecord/coderecord',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		watch:{
			BuyMoney(news,olds){
				
				this.CountBuyMoney=news
				
				console.log(this.CountBuyMoney)
			},
			ceshiindex(news,olds){
				var _this=this
				console.log(news)
				if(news>=5){
					clearTimeout(this.Settimeout)
					setTimeout(()=>{
						uni.showToast({
							title: '二维码已被核销',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.gasrolls=!_this.gasrolls
								_this.QRcode=!_this.QRcode
							}
						});
					},1000)
				}
			}
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
		　　　　}
			},
			bindPickerChange: function(e) {
				console.log(e.target)
				this.pricetext = this.array[e.target.value]+".00"
				this.col="black"
			},
			//用户金额
				GetUserMoney(){
					this.UserInfo.userid='3052109275300000002'
					var datas=`{method:"GetUserMoneyInfo",user_id:"${this.UserInfo.userid}"}`
					this.$api.ReagisterPhone(datas).then((res)=>{
						console.log(res)
						if(res.data.result==0&&res.data.message=="暂无用户余额信息"){
							this.money='0.00'
							return;
						}
						if(res.data.result==1){
							var Money=JSON.parse(res.data.data_score)[0]
							this.money=Money.MONEY
						}
					})
				},
				//监听二维码
				Monitoringcode(){
					var _this=this
					this.Settimeout=setInterval(function(){
						_this.ceshiindex++
					},1000)
				},
				//加油券总金额
				GetBuyCountMoney(){
					var _this=this
					var datas=`{method:"GetUserGift",user_id:"${this.UserInfo.userid}"}`
					this.$api.ReagisterPhone(datas).then((res)=>{
						console.log(res)
						if(res.data.result==0){
							console.log(res.data.message)
							_this.CrolssQUan=false
							// uni.showToast({
							// 	title:'当前您还没有优惠券',
							// 	duration: 1000,
							// 	icon:"none",
							// });
							return;
						}
						_this.CrolssQUan=true
						var jsonlist=JSON.parse(res.data.data)
						// console.log(jsonlist)
						this.couponlist=[]
						jsonlist.forEach((item)=>{
							var data=item.使用日期
							var year=data.slice(0,4)
							var month=data.slice(4,6)
							var day=data.slice(6,8)
							item.使用日期=year+"/"+month+"/"+day
							item.price=item.礼品价格
							item.Explain=item.礼品说明
							item.name=item.礼品名称
							item.Term=item.有效期
							if(item.礼品状态=='未使用'){
								this.couponlist.push(item)
							}
						})
						this.couponlist.forEach((item)=>{
							_this.BuyCountNum=parseFloat(_this.BuyCountNum)+parseFloat(item.price)
							console.log(item.price)
						})
						console.log(_this.BuyCountNum)
						console.log(this.couponlist)
					})
					
					// this.couponlist.forEach((item)=>{
					// 	_this.BuyCountNum=parseFloat(_this.BuyCountNum)+parseFloat(item.money)
					// 	console.log(_this.BuyCountNum)
					// })
					// console.log("哈哈哈"+_this.BuyCountNum)
				},
				//单选按钮
				checkchecked(){
					console.log(this.BuyMoney)
					if(this.BuyMoney==''||this.BuyMoney==null){
						uni.showToast({
							title: '请输入充值金额',
							duration: 1000,
							icon:"none",					
						});
						return;
					}
					if(parseFloat(this.BuyCountNum)>=parseFloat(this.BuyMoney)){
						uni.showToast({
							title: '不可以选择此加油券，优惠券总金额已大于充值金额',
							duration: 1000,
							icon:"none",					
						});
						return;
					}
					this.checkchecke=!this.checkchecke
					if(!this.checkchecke){
						
					}
					else{
						
					}
				},
				//结算
				Settlement(){
					if(this.UserInfo.userphone=='请登录'){
						uni.showToast({
							title: '您好还没有登录，请先登录再充值',
							duration: 1000,
							icon:"none"
						});
						return;
					}
					//备付金停用线
					// var datas=`{method:"CheckBalanceInfo"}`
					// this.$api.ReagisterPhone(datas).then((res)=>{
					// 	console.log(JSON.stringify(res))
					// })
					if(this.BuyMoney==''||this.BuyMoney<=0){
						uni.showToast({
							title: '请输入正确的支付数值',
							duration: 1000,
							icon:"none"
						});
						return;
					}
					this.GetUserMoney()
					this.payone=true
					this.diskif=true
					this.Payamin=true
				},
				//更换付款方式
				Replacemode(){
					if(parseFloat(this.money)<=0||parseFloat(this.money)<parseFloat(this.BuyMoney)){
						this.moneyno=true
					}
					this.payone=false
					this.paytwo=true
				},
				//选择账户余额支付
				Optionbalance(){
					console.log(parseFloat(this.money))
					console.log(parseFloat(this.BuyMoney))
					if(parseFloat(this.money)<=0||parseFloat(this.money)<parseFloat(this.BuyMoney)){
						this.Promptinfo='余额不足，请选择微信支付方式进行支付'
						
						this.vervisit='block'
						this.veramin=true
						setTimeout(()=>{
							this.vervisit='none'
							this.veramin=false
						},1500)
						return;
					}
					this.payone=true
					this.paytwo=false
					this.payreplacetext='账户余额'
					this.weixinimage=false
					this.balanceimage=true
				},
				//选择微信支付
				weixinoption(){
					this.payone=true
					this.paytwo=false
					this.payreplacetext='微信'
					this.weixinimage=true
					this.balanceimage=false
					this.vervisit='none'
					this.veramin=false
				},
				//返回第一步
				backpayone(){
					this.payone=true
					this.paytwo=false
					this.vervisit='none'
					this.veramin=false
				},
				//关闭付款弹框
				closepay(){
					this.weixinoption()
					this.diskif=false
					this.Payamin=false
					
					// this.$refs.keyboard.hide();
				},
				//获取输入的密码
				done(password) {
					var _this=this
					// console.log(password);
					if(password=='error'){
						this.alertarray.show=true
						this.alertarray.msg='支付密码不正确'
						setTimeout(()=>{
							this.alertarray.show=false
						},1000)
						return false;
					}
					this.closepay()
					this.$refs.keyboard.hide();
					this.$refs.simpleLoading.show({
						image:"../../../static/app-plus/tus.png",
						text:'支付中...'
					});
					setTimeout(()=>{
						this.$refs.simpleLoading.hide()
						uni.showToast({
							title: '支付成功',
							duration: 1000,
							icon:"none",
							success:function(){
								_this.gasrolls=!_this.gasrolls
								_this.QRcode=true
								_this.BuyMoney=''
								_this.CountBuyMoney=''
								_this.checkchecke=false
								_this.couponlist.forEach((item)=>{
									item.state=1
								})
								_this.Buyindex=0
								_this.BuyNumber=0.00
								//监听是否扫了二维码
								_this.Monitoringcode()
							}
						});
					},2000)
					console.log("支付成功");
					return true;
				},
				//获取是否选择了优惠券
				GetBuy(obtext){
					console.log(obtext)
					if(obtext.state==2){
						this.Buyindex++
						this.BuyNumber=parseFloat(this.BuyNumber)+parseFloat(obtext.money)
						this.CountBuyMoney=parseFloat(this.CountBuyMoney)-parseFloat(obtext.money)
						console.log("aaaaaaaaa"+this.CountBuyMoney)
						return;
					}
					this.Buyindex--
					this.BuyNumber=parseFloat(this.BuyNumber)-parseFloat(obtext.money)
					this.CountBuyMoney=parseFloat(this.CountBuyMoney)+parseFloat(obtext.money)
				},
				//改变状态
				Changestate(){
					this.CountBuyMoney=this.BuyMoney
					this.BuyClear=!this.BuyClear
					this.checkchecke=false
					this.couponlist.forEach((item)=>{
						item.state=1
					})
					this.Buyindex=0
					this.BuyNumber=0.00
				},
				//显示密码框
				confirmPwd() {
					if(this.payreplacetext=='微信'){
						this.payone=false
						this.closepay();
						uni.getProvider({
							service: 'payment',
							success: function (res) {
								console.log(res.provider)
								if (~res.provider.indexOf('wxpay')) {
									uni.requestPayment({
										provider: 'wxpay',
										orderInfo: 'orderInfo', //微信、支付宝订单数据
										success: function (res) {
											console.log('success:' + JSON.stringify(res));
										},
										fail: function (err) {
											console.log('fail:' + JSON.stringify(err));
										}
									});
								}
							}
						});
						return;
					}
					this.$refs.keyboard.show();
					this.payone=false
					this.closepay();
					
				},
				sliderchange(e) {
					this.size = e.detail.value
				},
				creatQrcode() {
					this.$refs.qrcode._makeCode()
				},
				saveQrcode() {
					this.$refs.qrcode._saveCode()
				},
				qrR(res) {
					this.src = res
				},
				clearQrcode() {
					this.$refs.qrcode._clearCode()
					this.val = ''
				},
				ifQrcode() {
					this.ifShow = !this.ifShow
				},
		}
	}
</script>

<style scoped>
.content{
    /* overflow: scroll; */
	padding: 10upx;
	padding-bottom: 200upx;
	/* height:calc(100vh - 10px); */
	background: white;
}
.card{
	margin: 0.5rem;
    position: relative;
    border-radius: 0.1rem;
    font-size: 0.7rem;
}
.card-content{
	position: relative;
	padding: 0;
	background: white;
	
}
.gasvardimg{
	width: 100%;
	height: 100%;
}
.card_cd{
	top: 0;
    position: absolute;
    height: 9rem;
    line-height: 9rem;
    color: #fff;
    text-align: center;
    width: 100%;
    font-size: 1.5rem;
}
.border{
	width: 100%;
    height: 1px;
    line-height: 1px;
    background-color: #eee;
}
.margin-zero{
	margin:0 2%;
	width: 96%;
    box-shadow: darkgrey 0rem 0rem 0.3rem 0.1rem;
	position: relative;
    border-radius: 0.1rem;
    font-size: 0.7rem;
}
.card-content {
	position: relative;
}
.card-content-inner{
	padding: 0.75rem;
    position: relative;
	padding-left: 20upx;
}
.cz-czje{
	font-size: 0.75rem;
    font-weight: bold;
}
.card-content-inner > p:first-child {
    margin-top: 0;
}
p {
    margin: 1em 0;
}
input[type='number'] {
    border: none;
    width: 90%;
    box-sizing: border-box;
    padding-left: 5%;
    font-size: 0.6rem;
    padding-bottom: 0.3rem;
}
.content-block-title{
	position: relative;
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.7rem;
    text-transform: uppercase;
    line-height: 1;
    color: #6d6d72;
    margin: 1.75rem 0.75rem 0.5rem;
	margin-top: 0.5rem;
    font-weight: bold;
}
.yh-yhjts{
	font-size: 0.6rem;
	padding-left: 10upx;
}
.yhjts-img{
    width: 35%;
    font-weight: normal;
}
.color-gray{
	color: #e4393c;
}
.card-footer{
	margin-top: 1rem;
    padding: 0;
	border-radius: 0 0 0.1rem 0.1rem;
    color: #5f646e;
	float: left;
	clear: both;
	width: 100%;
}
.card-content{
	position: relative;
}
.radios{
	float: left;
}
.numbers{
	float: right;
}
.selNum,.selPrice{
    font-size: 0.75rem;
    font-weight: bold;
    color: #ff8200;
}
.bar-tab {
	background-color: rgba(0,0,0,0);
	bottom: 0;
    width: 100%;
    height: 2.5rem;
    padding: 0;
	position: absolute;
    right: 0;
    left: 0;
    z-index: 10;
}
.tab-item{
	position: relative;
    display: table-cell;
    width: 1%;
    height: 2.5rem;
    color: #929292;
    text-align: center;
    vertical-align: middle;
}
#cz{
	background-color: #ff8200;
    color: #FFFFFF;
    font-weight: bold;
}

.card-img{
	height: 176px;
}
.priceinput{
		height: 30px;
		line-height: 30px;
}
.uni-input{
	padding: 0;
	height: 30px;
	line-height: 30px;
}
uni-picker{
	height: 30px;
	line-height: 30px;
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

.pay-title{
	width: 100%;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	font-size: 0.8rem;
	border-bottom: 1px solid #ECECEC;
}
.keyboard-container {
		position: absolute;
		top:0;
		height: 100%;
		width: 100%;
	}
.pay-title image{
	position: absolute;
	top: 15upx;
	right: 15upx;
	width: 40upx;
	height: 40upx;
}
.pay-titles image{
	right: 0;
	left: 15upx;
}
.paymentbtn{
	width: 90%;
	margin: 0 5%;
	position: absolute;
	left: 0;
	bottom:20upx;
	border-radius: 0;
	border: 0;
	height: 80upx;
	line-height: 80upx;
	
}
.pay-active:active{
	background: #ECECEC;
}
uni-button:after{border: 0!important;border-radius: 0!important;}
.pay-next{
	display: flex;
	align-items: center;
}
.pay-next image{
	width: 40upx;
	height: 40upx;
	/* top: 10upx; */
}
.pay-middle{
	width: 100%;
	text-align: center;
	padding: 20upx 0;
	font-size: 1rem;
	margin-top: 40upx;
	border-bottom: 1px solid #ECECEC;
}
.pay-xz{
	width: 90%;
	height: 100upx;
	
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 5%;
}
.pay-xzs{
	display: flex;
	align-items: center;
}
.pay-xz image{
	width: 40upx;
	height: 40upx;
	margin-right: 20upx;
}
.pay-middle span{
	font-size: 1.5rem;
	font-weight: bold;
}
.Payment{
	position: absolute;
	left: 0;
	bottom: -300px;
	background: white;
	width: 100%;
	height: 300px;
	z-index: 1000;
}
.Payaminate{
	animation: .2s Paymentamin linear;
	animation-fill-mode:forwards;
}
@keyframes Paymentamin{
	from{
		bottom: -300px;
	}
	to{
		bottom:0;
	}
}
.disk{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	z-index: 999;
	/* display: none; */
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
		bottom:100upx;
	}
}
.card{
	width: 90%;
	margin: 0.5rem 5%;
    position: relative;
    border-radius: 0.1rem;
    font-size: 0.7rem;
}
.card-content{
	position: relative;
}
uni-button:after{
	border: 0;
}
p {
    margin: 1em 0;
	color: #000000;
}
.yh-yhjts{
	font-size: 0.6rem;
	/* padding-left: 10upx; */
}
.yhjts-img{
    width: 100%;
    font-weight: normal;
}
.color-gray{
	color: #e4393c;
}
.card-footer{
	margin-top: 1rem;
    padding: 0;
	border-radius: 0 0 0.1rem 0.1rem;
    color: #5f646e;
	float: left;
	clear: both;
	width: 100%;
}
.card-content{
	position: relative;
}
.radios{
	float: left;
}
.numbers{
	float: right;
}
.selNum,.selPrice{
    font-size: 0.75rem;
    font-weight: bold;
    color: #ff8200;
}
.bar-tab {
	background:white;
	bottom: 0;
    width: 100%;
    height: 2.5rem;
    padding: 0;
    table-layout: fixed;
	position: fixed;
    right: 0;
    left: 0;
    z-index: 999;
	backface-visibility: hidden;
}
uni-button{
	border: 0!important;
}
.tab-item{
	position: relative;
    display: table-cell;
    width: 1%;
    height: 2.5rem;
    color: #929292;
    text-align: center;
    vertical-align: middle;
}
#cz{
	background-color: #ff8200;
    color: #FFFFFF;
    font-weight: bold;
}
.content-block-title{
	width:90%;
	position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.7rem;
	height: 50upx;
	line-height: 50upx;
    text-transform: uppercase;
    color: #6d6d72;
    margin: 1.75rem 5% 0.5rem 5%;
	margin-top: 0.5rem;
    font-weight: bold;
}
.yhjts-img img{
	width: 0.9rem;
}
.uni-input{
	padding: 0;
}
.QRcode{
	height: 100vh;
}

.qrimg {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30%;
}
.coupon_box {
	width:100%; max-height:450upx; padding:6upx 0 26upx 0;overflow:scroll;
}
.other_type {
	width:100%; height:90upx; padding-top:50upx;
}
.other_type .text { width:100%; border-top:1px solid #eeeeee; display:block; text-align:center; position:relative; }
</style>
