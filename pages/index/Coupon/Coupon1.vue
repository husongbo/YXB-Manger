<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<view class="coupon-count" v-for="(item,indexs) in tab.arrlist" :key="indexs" style="">
						<!-- <image :src="item.img" mode="" style="height: 200upx;position: relative;"></image> -->
						<view class="coupon-left">
							礼品价格
							<view style="font-size: 1.2rem;">￥{{item.礼品价格}}</view>
						</view>
						<view class="coupon-right">
							<view style="color:black;margin-left: 10upx;margin-top: 20upx;font-size: 0.8rem;font-weight: bold;">{{item.礼品名称}}({{item.礼品说明}})</view>
							<view style="width: 100%;float: left;clear: both;">
								<view style="width: 60%;float:left;">
									<view style="color:#666;margin-left: 10upx;margin-top: 20upx;">有效期:{{item.有效期}}</view>
								</view>
								<view style="width: 40%;float: right;" v-if="tab.id==0">
									<image src="../../../static/app-plus/img_lingqu.png" mode="" style="width: 120upx;height: 50upx;margin-left: 20upx;"></image>
								</view>
								<view style="width: 40%;float: right;" v-if="tab.id==1">
									<image src="../../../static/app-plus/img_shiyong.png" mode="" style="width: 120upx;height: 50upx;margin-left: 20upx;"></image>
								</view>
							</view>
							<view style="color:#999;margin-left: 10upx;margin-top: 16upx;width: 100%;float: left;clear: both;">支付时抵扣</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState,
	    mapMutations
	} from 'vuex';
	export default {
		computed: mapState([ 'UserInfo']),
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
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
				data0: {
					"datetime": "40分钟前",
					"article_type": 0,
					"title": "uni-app行业峰会频频亮相，开发者反响热烈!",
					"source": "DCloud",
					"comment_count": 639
				},
				data1: {
					"datetime": "一天前",
					"article_type": 1,
					"title": "DCloud完成B2轮融资，uni-app震撼发布!",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				},
				data2: {
					"datetime": "一天前",
					"article_type": 2,
					"title": "中国技术界小奇迹：HBuilder开发者突破200万",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				},
				data4: {
					"datetime": "2小时前",
					"article_type": 4,
					"title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 69
				},
				data3: {
					"article_type": 3,
					"image_list": [{
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 563,
						"height": 316
					}, {
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 641,
						"height": 360
					}, {
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 640,
						"height": 360
					}],
					"datetime": "5分钟前",
					"title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
					"source": "DCloud",
					"comment_count": 11
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
				}]
			}
		},
		onLoad: function() {
			// this.newsitems = this.randomfn()
			console.log(this.UserInfo.userid)
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
				console.log(jsonlist)
				jsonlist.forEach((item)=>{
					var data=item.使用日期
					var year=data.slice(0,4)
					var month=data.slice(4,6)
					var day=data.slice(6,8)
					item.使用日期=year+"/"+month+"/"+day
					if(item.礼品状态=='未领取'){
						//item.img='../../../static/app-plus/img_lijilingqu_quan.png'
						this.newsitems[0].arrlist.push(item)
					}
					if(item.礼品状态=='未使用'){
						//item.img='../../../static/app-plus/img_lijilingqu_quan.png'
						this.newsitems[1].arrlist.push(item)
					}
					if(item.礼品状态=='已使用'){
						//item.img='../../../static/app-plus/img_yishiyong_bg.png'
						this.newsitems[2].arrlist.push(item)
					}
				})
				console.log(this.newsitems)
			})
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?data=' + e.title
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

<style>
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
	padding-top: 60upx;
	font-size: 0.8rem;
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
