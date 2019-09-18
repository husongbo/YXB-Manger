<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" style="background: white;" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<view class="Summary">
						<view class="Summary-left">
							<view class="Summary-lefttops">
								<span style="margin-right: 10upx;">总金额:</span><span style="color: red;">￥1,1400.00</span>
							</view>
							<view class="Summary-lefttops">
								<span style="margin-right: 10upx;">冻结金额:</span><span style="color: red;">￥1,0.00</span>
							</view>
							<view class="Summary-lefttops">
								<span style="margin-right: 10upx;">已发金额:</span><span style="color: red;">￥0.00</span>
							</view>
							<view class="Summary-lefttops">
								<span style="margin-right: 10upx;">还剩余额:</span><span style="color: red;">￥200.00</span>
							</view>
						</view>
						<view class="Summary-right">
							<view class="circle">
								<span class="span" style="text-align: center;">余额占比<span style="color: red;">58.36%</span></span>
							</view>
						</view>
					</view>
					<view class="" style="height: 30upx;background:rgb(233,233,233);">
						
					</view>
					<view class="Summary-bom">
						<view class="Summary-left">
							<view class="Summary-lefttops">
								<span style="margin-right: 10upx;">已发手机号:</span><span style="color: red;">2个</span>
							</view>
							<view class="Summary-lefttops">
								<span style="margin-right: 10upx;">已发券券数:</span><span style="color: red;">2张</span>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="list" style="background: white;" scroll-y @scrolltolower="loadMore(index1)">
					<view class="" style="margin: 0 80upx;">
						<view>
							<input class="phones" type="text" value="" placeholder="请输入手机号" />
						</view>
						<view>
							<input class="numvers" type="text" value="" placeholder="请输入手机号" />
						</view>
						<view class="">
							<view class="select-company">
								<view class="select-company-left">
									<picker @change="bindPickerChange" :value="index" :range="array">
										<span>{{companytext}}</span>
									</picker>
								</view>
								<view class="select-company-right">
									<picker @change="bindPickerChange" :value="index" :range="array">
									<image src="../../../static/myicon/san.png" mode="" style="width: 22upx;height: 22upx;"></image>
									</picker>
								</view>
							</view>
							<view class="select-company ">
								<view class="select-company-left">
									<picker @change="bindPickerChanges" :value="indexs" :range="arrays">
										<span>{{Money}}</span>
									</picker>
								</view>
								<view class="select-company-right select-price">
									<picker @change="bindPickerChanges" :value="indexs" :range="arrays">
									<image src="../../../static/myicon/san.png" mode="" style="width: 22upx;height: 22upx;"></image>
									</picker>
								</view>
							</view>
						</view>
						<view class="">
							<view class="button">
								确认发券
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="list" style="background: white;" scroll-y @scrolltolower="loadMore(index1)">
					<view class="" style="margin: 0 80upx;">
						<view class="" style="display: flex;justify-content: space-between;">
								<view class="select-company " style="width: 45%;">
									<view class="select-company-left slects-date" style="width: 80%;">
										<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
											<span>{{date}}</span>
										</picker>
									</view>
									<view class="select-company-right" style="width: 20%;">	
									<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
										<image src="../../../static/myicon/date.png" mode="" style="width: 32upx;height: 32upx;"></image>
									</picker>
									</view>
								</view>
								<view class="select-company " style="width: 45%;">
									<view class="select-company-left slects-date" style="width: 80%;">
										<picker mode="date" :value="dates" :start="startDates" :end="endDates" @change="bindDateChanges">
											<span>2019-08-25</span>
										</picker>
									</view>
									<view class="select-company-right" style="width: 20%;">
										<picker mode="date" :value="dates" :start="startDates" :end="endDates" @change="bindDateChanges">
											<image src="../../../static/myicon/date.png" mode="" style="width: 32upx;height: 32upx;"></image>
										</picker>
									</view>
								</view>
						</view>
						<view>
							<input class="numvers" type="text" value="" placeholder="请输入手机号" />
						</view>
						<view class="">
							<view class="button">
								查询
							</view>
						</view>
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
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
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
					name: '汇总',
					id:0
				}, {
					name: '新发券',
					id:1
				}, {
					name: '明细',
					id:2
				}],
				couponitem:'',
				array: ['绵阳我要加油电子商务有限公司', '上略互动有限公司'],
				index:1,
				indexs:1,
				arrays:['100','200'],
				Money:'0.00',
				companytext:'绵阳我要加油电子商务有限公司',
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				dates: getDate({
					format: true
				}),
				startDates:getDate('start'),
				endDates:getDate('end'),
				
			}
		},
		onLoad: function() {
			//this.newsitems = this.randomfn()
			// this.newsitems = this.randomfn()
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindDateChanges: function(e) {
				this.dates = e.target.value
			},
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?data=' + e.title
				})
			},
			bindPickerChange: function(e) {
				console.log(e)
				this.companytext = this.array[e.target.value]
			},
			bindPickerChanges:function(e) {
				console.log(e)
				this.Money = this.arrays[e.target.value]
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
				// console.log(index)
				if (!this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
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
.button{
	height: 80upx;
	margin-top: 80upx;
	background: rgb(241,158,51);
	border-radius: 6upx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: .8rem;
}
.slects-date{
	background: white!important;
}
.button:active{
	background: rgb(241,158,100);
}
.select-company-left{
	text-align: center;
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
	/* background: -webkit-linear-gradient(linear,top bottom, rgb(253,253,253) , rgb(206,206,206)); */
	background:linear-gradient( top,rgb(253,253,253) , rgb(206,206,206));	
}
.select-company-right{
	width: 10%;
	background:linear-gradient( top,rgb(253,253,253) , rgb(222,222,222));
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 60upx;
}
.select-company-right image{
	width: 40upx;
	height: 40upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.select-company{
	height: 60upx;
	line-height: 60upx;
	border: 1px solid #CCCCCC;
	margin-top: 40upx;
	border-radius: 6upx;
	display: flex;justify-content: space-between;
}
.coupons{
	height: 600upx;
	background: white;
	padding: 0 80upx;
}
.select-price{
	background:linear-gradient( top,rgb(182,212,243) , rgb(140,188,235));
}
.phones{
	height: 70upx;
	line-height: 70upx;
	border: 1px solid #CCCCCC;
	margin-top: 60upx;
	padding-left: 20upx;
	border-radius: 6upx;
}
.numvers{
	height: 70upx;
	line-height: 70upx;
	border: 1px solid #CCCCCC;
	margin-top: 30upx;
	padding-left: 20upx;
	border-radius: 6upx;
}
.circle{
	width:150upx;
	height:150upx;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: flex;
	align-items: center;
	justify-content: center;
}
.Summary-bom{
	height: 600upx;
	background: white;
	/* margin-top: 30upx; */
	padding: 50upx;
}
.Summary-right{display: flex;align-items: center;}
.Summary-lefttops{margin-bottom: 20upx;}
.Summary{background: white;padding: 50upx;display: flex;justify-content: space-between;}
.swiper-tab-list{width: 33%;line-height:inherit;height: 40px;}
.swiper-tab-list:last-child{border: 0;}
.uni-swiper-tab{height: 40px;line-height: 40px;background: white;border: 0;}
.coupon-count{
	width: 90%;
	margin: 0 5%;
	position: relative;
	/* background: url("../../static/app-plus/img_lijilingqu_quan.png") no-repeat center top;
	background-size: 100% 100%; */
	/* height: 200upx; */
	/* background: url(../../../static/app-plus/img_lijilingqu_quan.png); */
}
.active{
	border-bottom: 2px solid red!important;
	box-sizing: border-box;
	color: rgb(241,158,51)!important;
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
