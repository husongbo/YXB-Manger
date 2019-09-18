<template>
	<view class="">
		<view v-for="(item,index) in arrlist" :key="index">
			<view class="headpages" >
				<view class="headoages-left" style="width: 50%;display: flex;flex-direction: row;height: 80upx;align-items: center;"  @tap="changeradio(item,!item.flag)">
					<image :src="item.img" mode="" style="width: 40upx;height: 40upx;margin-left: 30upx;"></image>
					<view class="" style="margin-left: 20upx;">{{item.months}}</view>
				</view>
				<view class="" style="width: 50%;display: flex;align-items: center;justify-content: flex-end;" @tap="downups(item,!item.updown)">
					<image :src="item.imgs" mode="" style="width: 40upx;height: 40upx;margin-right: 40upx;" ></image>
				</view>
			</view>
			<view v-if="!item.updown" class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(items,indexs) in item.list" :key="indexs">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
					<view class="uni-media-list-logo">
						<image src="../../../static/myicon/mx1.png"/>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{items.name}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{items.time}}</view>
					</view>
					<view class="money">￥<span>{{items.price}}</span></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			arrlist:{
				type:Array
			}
		},
		data(){
			return{
				arrlistes:''
			}
		},
		onLoad(){
			console.log(JSON.stringify(this.arrlist))
		},
		methods:{
			changeradio(item,flag){
				console.log(flag)
				
				if(flag){
					item.img="../../../static/app-plus/radio.png"
				}
				else{
					item.img="../../../static/app-plus/circle.png"
				}
				item.flag=flag
				this.$emit('clickradio',item,flag);
			},
			downups(item,flag){
				console.log(flag)
				if(!flag){
					item.imgs="../../../static/app-plus/down.png"
				}
				else{
					item.imgs="../../../static/app-plus/up.png"
				}
				item.updown=flag
				this.$emit('shoubuliao',item,flag);
				// this.$emit('shoubuliao',item,flag);
			}
		}
	}
</script>

<style>
	.parent-info{
			height:100%;
			background: white;
			position: relative;
		}
		@keyframes add{
			from{
				transform: scale(1.2);
			}
			to{
				transform: scale(1);
			}
		}
		.modal-add{visibility: visible;animation: add 0.2s linear;}
		.modal-hid{visibility: hidden;}
		.register-ok{
			width: 90%;
			margin: 80upx 5%;
			padding: 20upx 0;
			background: #ff8200;
			color: white;
			border-radius: 10upx;
			text-align: center;
		}
		.add{
			display: inline-block;
			width: 20px;
			height: 20px;
			background-color: #ff8200;
			color: #fff;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-content: center;
			float: right;
		}
		.item-inner{
			background: white;
			padding-left: 30upx;
			padding-right: 0.75rem;
			position: relative;
			width: 100%;
			padding-top: 0.4rem;
			padding-bottom: 0.35rem;
			min-height: 2.2rem;
			overflow: hidden;
			box-sizing: border-box;
			border-bottom: 1px solid #e1e1e1;
		}
		.cardheaders{
			// padding:1.5rem 0.75rem;
		}
		.uni-flex{
			padding: 40upx 40upx;
			background: white;
			width: 100%;
			overflow-x: hidden;
		}
	.card-text{padding-right:40upx;}
	.uni-list-cell{
		background:white;
		border-bottom: 1px solid #e1e1e1;
	}
	.uni-list-cell:active{background: rgb(240,240,240);}
	.uni-list-cell::after{
		height: 0;
	}
	.cell-btn{
		    padding: 11px 15px;
			border: 0;
	}
	.btns{
		/* width:200upx; */
		background: white;
		color: #ff8200;
		border: 1px solid #ff8200;
		padding:  4upx 8upx;
	}
	.radio-right{
		margin-left: 150upx;
	}
	.card-header {
		width: 100%;
	    font-weight: normal;
	    font-size: 0.7rem;
		min-height: 2.2rem;
	    position: relative;
	    padding: 0.5rem 0.75rem;
	    box-sizing: border-box;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: justify;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.card-header span{
		width: 30%;
	}
	.card-header input{
		font-size: 0.7rem;
		// color: #C0C0C0;
	}
	.card-header:after {
	    content: '';
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: auto;
	    top: auto;
	    height: 1px;
	    width: 100%;
	    background-color: #e1e1e1;
	    display: block;
	    z-index: 15;
	    -webkit-transform-origin: 50% 100%;
	    transform-origin: 50% 100%;
	}
	.card {
	    background-color: #fff;
	    margin: 0;
	    margin-bottom: 0.3rem;
		position: relative;
	    border-radius: 0.1rem;
	    font-size: 0.7rem;
	}
	.modal-overlay{
		opacity: 1;
		position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    background: rgba(0, 0, 0, 0.4);
	    z-index: 999;
	    -webkit-transition-duration: 400ms;
	    transition-duration: 400ms;
	}
	.modal-in{
		opacity: 1;
	    -webkit-transition-duration: 400ms;
	    transition-duration: 400ms;
	    -webkit-transform: translate3d(0, 0, 0) scale(1);
	    transform: translate3d(0, 0, 0) scale(1);
		width: 14.5rem;
	    margin-left: -7.25rem;
		position: absolute;
	    z-index: 11000;
	    left: 50%;
		top: 50%;
	    text-align: center;
	    border-radius: 0.35rem;
		transition-property: transform, opacity;
	    color: #3d4145;
	}
	.modal-inner{
		background-color: #fff;
	    font-size: 0.7rem;
		padding: 0;
	    padding-bottom: 0.75rem;
		border-radius: 0.35rem 0.35rem 0 0;
	    position: relative;
	}
	.modal-title{
		background-color: #ff8200;
	    height: 2rem;
	    line-height: 2rem;
	    color: #FFFFFF;
	    font-size: 0.7rem;
	    border-radius: 0.35rem 0.35rem 0 0;
	}	
	.modal-text{
		margin-top: 0.75rem;
		padding-left: 20upx;
		display: flex;
		flex-direction: row;
	}
	.modal-inner span {
		width: 30%;
	}
	.modal-inner input {
	    border: 1px solid #ddd;
	    font-size: 0.7rem;
		margin-right: 20upx;
	}
	.modal-inner:after {
	    content: '';
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: auto;
	    top: auto;
	    height: 1px;
	    width: 100%;
	    background-color: #b5b5b5;
	    display: block;
	    z-index: 15;
	    -webkit-transform-origin: 50% 100%;
	    transform-origin: 50% 100%;
	}
	.headpages{
		height: 80upx;
		width:100%;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #CCCCCC;
	}
	.modal-buttons{
		height: 2.2rem;
	    overflow: hidden;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.modal-button:first-child {
	    border-radius: 0 0 0 0.35rem;
	}
	.modal-button:active{
		background: #e1e1e1;
	}
	.modal-button{
		background-color: #FFFFFF;
	    color: #1c1d1f;
		width: 100%;
	    padding: 0 0.25rem;
	    height: 2.2rem;
	    font-size: 0.85rem;
	    line-height: 2.2rem;
	    text-align: center;
	    display: block;
	    position: relative;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	    cursor: pointer;
	    box-sizing: border-box;
	    -webkit-box-flex: 1;
	}
	.modal-button:after {
	    content: '';
	    position: absolute;
	    right: 0;
	    top: 0;
	    left: auto;
	    bottom: auto;
	    width: 1px;
	    height: 100%;
	    background-color: #b5b5b5;
	    display: block;
	    z-index: 15;
	    -webkit-transform-origin: 100% 50%;
	    transform-origin: 100% 50%;
	}
	.modal-button:last-child {
	    border-radius: 0 0 0.35rem 0;
	}
	.modal-button-bold{
		font-weight: 500;
	}
	
	.uni-list-cell-navigate.uni-navigate-right:after {
		content: '';
	    }
	uni-button:after{
		border:0;
	}
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
