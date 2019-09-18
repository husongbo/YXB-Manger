<template>
	<view>
		<section class="aui-scrollView">
		    <view class="aui-back-box">
		        <view class="aui-back-pitch">
		            <img src="../../../static/img/icon-pitch.png" alt="">
		        </view>
		        <view class="aui-back-title">
		            <h2>设置成功</h2>
		            <p>新密码设置成功,请牢记您的密码</p>
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
				uni.switchTab({
					url: '/pages/tabBar/personCenter/personCenter'
				});
			}
		}
	}
</script>

<style>

</style>
