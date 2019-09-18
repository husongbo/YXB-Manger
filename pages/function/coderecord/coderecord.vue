<template>
	<view class="parent-view" @touchstart="touchstart" @touchmove="touchmove">
		<view class="tab" :class="[{'active':index==tabIndex}]" @tap="toggleTab(index)" v-for="(item,index) in tabList" :key="index">
		{{item.name}}
		<image src="../../../static/navIcon/downs.png" mode=""></image>
		</view>
		<w-picker :mode="mode" startYear="2016" endYear="2030" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
		<view class="uni-list">
			<navigator animation-type="pop-in" animation-duration="300" url="../Fuelrecord/Fuelrecord" open-type="navigate">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
					<view class="uni-media-list-logo">
						<image src="../../../static/myicon/mx1.png"/>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">二维码加油</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">2619/03/26</view>
					</view>
					<view class="money">￥<span>299.00</span></view>
				</view>
			</view>
			</navigator>
			<navigator animation-type="pop-in" animation-duration="300" url="../Fuelrecord/Fuelrecord" open-type="navigate">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
					<view class="uni-media-list-logo">
						<image src="../../../static/myicon/mx1.png"/>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">二维码加油</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">2619/03/26</view>
					</view>
					<view class="money">￥<span>299.00</span></view>
				</view>
			</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				tabList:[{
						mode:"yearMonth",
						name:"11",
						value:[0,1]
					}],
				tabIndex:0
				}
		},
		created(){
			var myDate = new Date();
			var year=myDate.getFullYear();
			var month=myDate.getMonth()+1;
			if(month<10){
				month="0"+month
			}
			this.tabList[0].name=year+"-"+month
		},
		components:{
			wPicker
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: '/pages/myindex/Invoiceinfo/Invoiceinfo',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		computed:{
			mode(){
				return this.tabList[this.tabIndex].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndex].value
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
			toggleTab(index){
				this.tabIndex=index;
				this.$refs.picker.show();
			},
			//获取日期
			onConfirm(val){
				console.log(val);
				this.tabList[0].name=val.result
			}
		}
	}
</script>

<style scoped>
.uni-media-list-logo{
	width: 26px;
	height: 26px;
}
.uni-media-list-body {
	height: 36px;
}
.uni-list-cell-navigate.uni-navigate-right:after{
	content: '';
}
.money{
	color: #ff8200;
	font-size: 0.9rem;
}
.parent-view{
	height: calc(100vh - 44px);
	overflow-y: hidden;
}
.tab{
	text-align: center;
	background: white;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10upx 0;
}
.tab image{
	width: 36upx;
	height: 36upx;
	position: relative;
}
</style>
