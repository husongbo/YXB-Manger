<template>
	<view>
		<section class="aui-scrollView">
		    <view class="aui-back-box">
		        <view class="aui-back-pitch">
		            <img src="../../../static/img/icon-pitch.png" alt="">
		        </view>
		        <view class="aui-back-title">
		            <h2>绑定成功</h2>
		            <p>手机号绑定成功,请完善您的信息和支付密码</p>
		        </view>
		        <view class="aui-back-button">
		            <button @click="back">返  回</button>
		        </view>
		    </view>
		</section>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap(e) {
			
			uni.navigateTo({
			    url: '../../tabBar/Login/Login',
				animationType: 'pop-in',
				animationDuration: 200
			})
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:2,
					animationType: 'pop-out',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>

</style>
