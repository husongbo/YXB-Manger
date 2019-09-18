<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<navigator animation-type="pop-in" animation-duration="200" url="../Details/Details" open-type="navigate">
		<!-- <view class="zd-query">
			<view class="list-block">
				<ul>
					<li class="item-content item-link">
						<view class="item-left">
							胡松波
						</view>
						<view class="item-right">
							<image class="item-next" src="../../../../static/navIcon/ic_next.png"></image>
						</view>
						<view class="item-right">
							￥300.00
						</view>
					</li>
				</ul>
			</view>
		</view> -->
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
				<view class="uni-media-list-logo">
					<image src="../../../../static/myicon/mx1.png"/>
				</view>
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">油卡充值</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">2619/03/26</view>
				</view>
				<view class="money">￥<span>299.00</span></view>
			</view>
		</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			};
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
						}
		}
	}
</script>

<style lang="scss">
.content{
	height: 100%;
	background: white;
	.uni-list-cell{
		background:white;
		border-bottom: 1px solid #e1e1e1;
	}
	.uni-list-cell::after{
		height: 0;
	}
	.cell-btn{
		    padding: 11px 15px;
			border: 0;
	}
	.zd-query{
		padding: 0.6rem 0.4rem 0.4rem 0.4rem;
		.list-block{
			margin: 0;
			font-size: 0.85rem;
			ul{
				background: #fff;
				list-style: none;
				padding: 0;
				margin: 0;
				position: relative;
				overflow: hidden;
				border-radius: 0.3rem;
				box-shadow: 0 0 0.6rem rgba(136, 130, 129, 0.3);
				.item-content{
					border-bottom: 1px solid #eee;
					box-sizing: border-box;
				}
				.item-left{
					float: left;
					height: 50px;
					line-height: 50px;
					padding: 0 30upx;
					font-size: 0.8rem;
				}
				.item-right{
					float: right;
					height: 50px;
					line-height: 50px;
					padding: 0 30upx;
					color: #ff8200;
					font-size: 0.8rem;
				}
				.item-next{
					width: 26px;
					height: 26px;
					margin-top:12px;
				}
			}
			ul:active{
				background:rgb(250, 250, 250);
			}
		}
	}
}

</style>
