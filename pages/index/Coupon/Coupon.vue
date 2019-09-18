<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<!-- <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					aaaaaaaaaaaaaaa
				</scroll-view>
			</swiper-item>
		</swiper> -->
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<view class="coupon-count" v-for="(item,indexs) in tab.arrlist" :key="indexs" style="" v-if="tab.arrlist!=0">
						<image :src="item.img" mode="" style="height: 200upx;position: relative;"></image>
						<view class="coupon-left">
							<view class="">礼品价格</view>
							<view style="font-size: 1.2rem;">￥{{item.price}}</view>
						</view>
						<view class="coupon-right">
							<view style="color:black;margin-left: 10upx;margin-top: 20upx;font-size: 0.8rem;font-weight: bold;">{{item.name}}({{item.Explain}})</view>
							<view style="width: 100%;float: left;clear: both;">
								<view style="width: 60%;float:left;">
									<view style="color:#666;margin-left: 10upx;margin-top: 20upx;">有效期:{{item.Term}}</view>
								</view>
								<view style="width: 40%;float: right;" v-if="tab.id==0" @click="Receive(item)">
									<image src="../../../static/app-plus/img_lingqu.png" mode="" style="width: 120upx;height: 50upx;margin-left: 20upx;"></image>
								</view>
								<view style="width: 40%;float: right;" v-if="tab.id==1">
									<image src="../../../static/app-plus/img_shiyong.png" mode="" style="width: 120upx;height: 50upx;margin-left: 20upx;"></image>
								</view>
							</view>
							<view style="color:#999;margin-left: 10upx;margin-top: 16upx;width: 100%;float: left;clear: both;">支付时抵扣</view>
						</view>
					</view>
					<view class="" v-if="tab.arrlist==0" style="display: flex;justify-content: center;height: 100%;padding-top: 30%;font-size:1.2rem;color: #CCCCCC;">
						暂时还没有优惠券
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<simpleLoading ref="simpleLoading"></simpleLoading>
		<simpleDialog ref="simpleDialog2" :title="sDialog.title" :message="sDialog.message" :confirmButtonText="sDialog.openbtn" @confirmButton="confirmButton" @cancelButton="cancelButton"></simpleDialog>
	</view>
</template>

<script>
	import {
		mapState,
	    mapMutations
	} from 'vuex';
	import simpleDialog from '@/components/loading/dialog.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	export default {
		computed: mapState([ 'UserInfo']),
		components:{
			simpleDialog,
			simpleLoading
		},
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [
					{
						id:0,
						arrlist:[]
					},
					{
						id:1,
						arrlist:[]
					},
					{
						id:2,
						arrlist:[]
					}
				],
				sDialog: {
					message: '是否领取加油券',
					openbtn:'确定'
				},
				tabBars: [{
					name: '未领取',
					id:0
				}, {
					name: '未使用',
					id:1
				}, {
					name: '已使用',
					id:2
				}],
				couponitem:'',
			}
		},
		onLoad: function() {
			//this.newsitems = this.randomfn()
			// this.newsitems = this.randomfn()
			console.log(this.UserInfo.userid)
			this.GetCoupon()
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?data=' + e.title
				})
			},
			//领取优惠券
			Receive(item){
				console.log(item)
				this.couponitem=item
				this.$refs.simpleDialog2.confirm({
					title: '提示',
					message:this.sDialog.message
				});
			},
			confirmButton: function() {
				var _this=this
				var datas=`{method:"ReceiveGift",gift_id:"${this.couponitem.礼品标识}"}`
				console.log(datas)
				this.$api.ReagisterPhone(datas).then((res)=>{
					_this.$refs.simpleLoading.show({
						image:"../../../static/app-plus/tus.png",
						text:'领取中，请稍后...'
					});
					setTimeout(()=>{
						_this.newsitems.forEach((item)=>{
							item.arrlist=[]
						})
						_this.$refs.simpleLoading.hide()
						_this.GetCoupon()
						uni.showToast({
							title: '领取成功',
							duration: 1000,
							icon:"none",
						});
					},1000)
				})
				
			},
			cancelButton: function() {
				console.log('Dialog 取消按钮点击');
			},
			//获取优惠券
			GetCoupon(){
				var datas=`{method:"GetUserGift",user_id:"${this.UserInfo.userid}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					console.log(res)
					if(res.data.result==0){
						console.log(res.data.message)
						uni.showToast({
							title:'当前您还没有优惠券',
							duration: 1000,
							icon:"none",
						});
						return;
					}
					var jsonlist=JSON.parse(res.data.data)
					// console.log(jsonlist)
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
						if(item.礼品状态=='未领取'){
							item.img='../../../static/app-plus/img_lijilingqu_quan.png'
							this.newsitems[0].arrlist.push(item)
						}
						if(item.礼品状态=='未使用'){
							item.img='../../../static/app-plus/img_lijilingqu_quan.png'
							this.newsitems[1].arrlist.push(item)
						}
						if(item.礼品状态=='已使用'){
							item.img='../../../static/app-plus/img_yishiyong_bg.png'
							this.newsitems[2].arrlist.push(item)
						}
					})
					// console.log(JSON.stringify(this.newsitems))
				})
			},
			close(index1, index2) {
				uni.showModal({
					content: '是否删除本条信息？',
					success: (res) => {
						if (res.confirm) {
							this.newsitems[index1].data.splice(index2, 1);
						}
					}
				})
			},
			loadMore(e) {
				this.newsitems[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			addData(e) {
				if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.newsitems[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
				}
				this.newsitems[e].loadingType = 1;
			},
			async changeTab(e) {
				let index = e.detail.current;
				console.log(index)
				if (!this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
	// 			let tabBar = await this.getElSize("tab-bar"),
	// 				tabBarScrollLeft = tabBar.scrollLeft;
	// 			let width = 0;
	// 
	// 			for (let i = 0; i < index; i++) {
	// 				let result = await this.getElSize(this.tabBars[i].id);
	// 				width += result.width;
	// 			}
	// 			let winWidth = uni.getSystemInfoSync().windowWidth,
	// 				nowElement = await this.getElSize(this.tabBars[index].id),
	// 				nowWidth = nowElement.width;
	// 			if (width + nowWidth - tabBarScrollLeft > winWidth) {
	// 				this.scrollLeft = width + nowWidth - winWidth;
	// 			}
	// 			if (width < tabBarScrollLeft) {
	// 				this.scrollLeft = width;
	// 			}
	// 			this.isClickChange = false;
	// 			this.tabIndex = index; //一旦访问data就会出问题
			},
			
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = false;
					this.tabIndex = index;
				}
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingType:i,
						data: []
					};
					for (let j = 1; j <= 10; j++) {
						aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
					}
					ary.push(aryItem);
				}
				return ary;
			}
		}
	}
</script>

<style scoped>
.title {
	padding: 20upx;
}
.swiper-tab-list{width: 33%;border-right: 1px solid #ccc;line-height: 1;}
.swiper-tab-list:last-child{border: 0;}
.uni-swiper-tab{height: 40px;line-height: 40px;background: white;border: 0;margin-top: 5upx;}
.coupon-count{
	width: 90%;
	margin: 0 5%;
	position: relative;
	/* background: url("../../static/app-plus/img_lijilingqu_quan.png") no-repeat center top;
	background-size: 100% 100%; */
	/* height: 200upx; */
	/* background: url(../../../static/app-plus/img_lijilingqu_quan.png); */
}
.coupon-left{
	width: 30.7%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	/* display: flex;
	justify-content: center;
	align-items: center; */
	color: white;
	text-align: center;
	padding-top: 10upx;
	font-size: 0.8rem;
	display: flex;
	flex-direction: column;
}
.coupon-right{
	width: 69.3%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	color: white;
	font-size: 0.8rem;
}
</style>
