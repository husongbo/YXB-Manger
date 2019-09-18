<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<!-- <header id="header" class="mui-bar mui-bar-nav">
			<view onclick="javascript :history.back(-1);" style="float: left;"><img class="backs" src="./back.png" >
			<view class="back">返回</view></view>
			<h1 class="mui-title">我的积分</h1>
			<img class="nexts" src="./nav_icon_shuoming.png" >
		</header> -->
		<view class="tops-parent">
		<view class="tops">
			<view class="tops-title">可用余额</view>
			<view class="tops-text">{{monthsnumber}}</view>
		</view>
		</view>
		
	</view>
</view>
</template>

<script>
	export default {
		data() {
			return {
				monthsnumber:0,
				sumnumber:15,
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				ulsvisit:"hidden",
				listtext:'全部',
				listtexturl:'../../../static/navIcon/next.png',
			}
		},
		methods: {
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
			}		
		}
	}
</script>

<style>
body{
				font-family: "微软雅黑";
			}
			.content{
				background: white;
				float: left;
				clear: both;
				width: 100%;
				height: 100%;
				overflow-y: scroll;
				overflow-x: hidden;
			}
			.chidren{
				width: 100%;
			}
			.chidrens{
				height: 80upx!important;
				padding:0 10px !important;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.chidrens .right{
				padding-top: 0!important;
			}
			.record-parent{
				margin-top: 400upx;
			}
			.tops-parent{
				width: 100%;
				background: white;
				position: fixed;
				left: 0;
				z-index: 999;
			}
			.tops{
				width: 90%;
				height:150px;
				margin: 0 5%;
				background: rgb(245,245,245);
				box-shadow: 0px 1px 10px rgba(0,0,0, 0.2);
				border-radius: 10px;
				
				margin-top: 50upx;
				/* top: 88upx; */
				
				/* margin-top: 62px; */
			}
			#header{
				background: white;
			}
			.tops-title{
				text-align: center;
				padding-top: 30px;
				color: rgb(124,200,254);
				font-size: 1rem;
			}
			.monthss::before{
				position: absolute;
				padding: 7px 2px;
				left: -5px;
				top: 5px;
				background: rgb(13,143,237);
				content: '';
			}
			.tops-text{
				text-align: center;
				/* padding-top: 30px; */
				font-size: 2rem;
				color: rgb(10,143,245);
				font-weight: bold;
			}
			.record{
				width: 90%;
				height: 30px;
				margin: 0 5%;
			}
			.record .left{
				float: left;
				width: 50%;
				font-weight: 600;
				font-size: 0.8rem;
			}
			.record .right{
				float: right;
				color: #ccc;
			}
			.chid{
				width: 90%;
				margin: 0 5%;
				/* padding: 0 20px; */
				border-radius: 5px;
				border:2px solid rgb(247,247,247);
				box-sizing: border-box;
			}
			.chid-parent{
				width: 100%;
				height: 55px;
				box-sizing: border-box;
				border-bottom: 1px solid rgb(231,231,231);
				padding: 0 20px;
			}
			.chid-parent .left{
				height: 55px;
				line-height: 55px;
				font-weight: 600;
				float: left;
				/* width: 50%; */
			}
			.chid-parent .right{
				height: 55px;
				line-height: 55px;
				float: right;
				font-weight: 600;
			}
			.chid-parent .right span{
				color: rgb(250,170,19);
			}
			.liebiao{
				/* width: 100%; */
				height: 120upx;
				border-bottom: 1px solid rgb(231,231,231);
				padding: 5px 10px;
			}
			.liebiao:last-child{
				bottom: 0;
			}
			.liebiao .left{
				float: left;
				width: 50%;
				position: relative;
			}
			.liebiao .left view{
				/* padding: 5px 0; */
			}
			.liebiao .left view:first-child{
				font-weight: 600;
			}
			.liebiao .left view:last-child{
				color: #ccc;
			}
			.liebiao .right{
				float: right;
				padding-top: 10px;
				color: rgb(250,170,19);
			}
			.back{
				font-size: 1rem;
				float: left;
				height: 44px;
				line-height: 44px;
				color: rgb(55,136,197);
			}
			.liebiao:active{
				background:rgb(240,240,240);
			}
			.months{
				padding: 7px 2px;
				margin-top: 10px;
				margin-right: 5px;
				float: left;
				background: rgb(13,143,237);
					
			}
			.mui-title{
				font-weight: 600;
				font-size: 1.3rem;
			}
			.backs{
				float: left;
				width: 24px;
				height: 24px;
				margin-top: 10px;
			}
			.nexts{
				float: right;
				width: 24px;
				height: 24px;
				margin-top: 10px;
			}
			.record img{
				float: right;
				width: 20px;
				height: 20px;
			}
			.uls{
				position: absolute;
				top:30px;
				right:-10px;
				width: 100%;
				background: white;
				padding: 0 10px;
				width:100px;
				border:2px solid rgb(247,247,247); 
				
			}
			.uls view{
				height: 40px;
				text-align: center;
				line-height: 40px;
				border-bottom: 1px solid rgb(231,231,231);
			}
			.uls view:last-child{
				border: 0;
			}
			.uls view:hover{
				color: #0062CC;
			}
</style>
