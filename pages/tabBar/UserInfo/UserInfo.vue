<template>
  <view class="content" @touchstart="touchstart" @touchmove="touchmove">
    <!-- <view class="info">
		<span>头像</span>
		<view class="images">
			<image src="../../../static/myicon/nav_icon_quancun.png" mode=""></image>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view> -->
	<!-- <view class="info">
		<span>积分</span>
		<view class="images">
			<span>565</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view> -->
	<view class="info" @click="OpenReg">
		<span>昵称</span>
		<view class="images">
			<span>{{UserInfo.userinfos.M0001_NAME}}</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view>
	<view class="info" @click="OpenReg">
		<span>电子邮箱</span>
		<view class="images">
			<span>{{UserInfo.userinfos.M0001_EMAIL}}</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view>
	<!-- <view class="info" @click="OpenReg">
		<span>联系方式</span>
		<view class="images">
			<span>{{UserInfo.userinfos.M0001_PHONE}}</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view> -->
	<view class="info" @click="OpenReg">
		<span>证件号码</span>
		<view class="images">
			<span>{{UserInfo.userinfos.M0001_IDENTITY_CARD}}</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view>
	<view class="info" @click="OpenReg">
		<span>我的地区</span>
		<view class="images">
			<span>{{UserInfo.userinfos.M0001_SUPPLIER_PROVINCE}}&nbsp;{{UserInfo.userinfos.M0001_SUPPLIER_CITY}}&nbsp;{{UserInfo.userinfos.M0001_SUPPLIER_CONUNTY}}</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view>
	<view class="info" @click="OpenReg">
		<span>我的地址</span>
		<view class="images">
			<span>{{UserInfo.userinfos.M0001_SUPPLIER_ADDRESS}}</span>
			<image src="../../../static/navIcon/next.png" mode="" style="width: 60upx;height: 60upx;margin-left: 10upx;"></image>
		</view>
	</view>
	<button class="outlogin" @click="outlogin">退出登录</button>
	<simpleLoading ref="simpleLoading"></simpleLoading>
  </view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import simpleLoading from '@/components/loading/dialog-loading.vue'
  export default {
    
    data() {
      return {
		  len:0,
		  startX:0,
		  moveEndX:0,
		  valueX:0,
		  loginouttext:1,
		  GetUserInfo:''
	  };
    },
	components: {
		simpleLoading
	},
	computed: mapState([ 'UserInfo']),
    mounted() {},
    onLoad(){
		console.log(JSON.stringify(this.UserInfo.userinfos))
		// var userdatas=`{method:"GetUserInfo",user_id:"${this.UserInfo.userid}"}`
		// this.$api.ReagisterPhone(userdatas).then((res)=>{
		// 	console.log(JSON.stringify(res))
		// 	this.GetUserInfo=JSON.parse(res.data.user_info)[0]
		// })
	},
	watch:{
		UserInfo(news,olds){
			console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
			this.UserInfo=news
		}
	},
    methods:{
      /**
       * 点击触发
       * @param {Object} type 跳转页面名或者类型方式
       */
	  ...mapMutations(['logout','USERINX']),
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
		//退出登录
		outlogin(){
			this.logout()
			this.$refs.simpleLoading.show({
				image:"../../../static/app-plus/tus.png",
				text:'注销中...'
			});
			setTimeout(()=>{
				this.$refs.simpleLoading.hide()
				uni.showToast({
					title: '注销成功',
					duration: 1000,
					icon:"none",
					success:function(){
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
								animationType: 'pop-in',
								animationDuration: 200
							})
						},1000)	
					}
				});
			},1000)
			// this.USERINX()
		},
		OpenReg(){
			uni.navigateTo({
			    url:'../../myindex/Perfectinfor/Perfectinfor?flag=false',
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
    }
  }
</script>

<style>
  
  .content{
	  height: 100%;
	  background: white;
	  overflow-y: hidden;
  }
  .info{
	  padding: 0 40upx;
	  padding-right: 20upx;
	  display: flex;
	  justify-content:space-between;
	  align-items:center;
	  height: 100upx;
	  line-height: 100upx;
	  border-bottom: 1px solid #ECECEC;
  }
  .info:active{
	  background: #ECECEC;
  }
  .images{
	  display: flex;
	  justify-content: center;
	  align-items: center;
  }
  .images span{
	  color:#CCCCCC;
  }
  image{
	  width: 80upx;
	  height: 80upx;
	  border-radius: 50%;
  }
  button:after{
	  border: 0;
  }
  .outlogin{
	  width: 80%;
	  height: 80upx;
	  line-height: 80upx;
	  margin:0 10%;
	  position: absolute;
	  bottom:100upx;
	  border-radius: 40upx;
	  text-align: center;
	  background: rgb(254,163,60);
	  color: white;
	  border: 0;
  }
  .outlogin:active{
	  background: rgb(255,110,0
	  );
  }
</style>
