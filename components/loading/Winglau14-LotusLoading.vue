<template>
	<!--
	* lotusLoadingData.isShow:设置显示加载中组件
	* -->
    <view v-if="lotusLoadingData.isShow" class="lotus-loading-wrap">
        <view class="lotus-loading-inner">
            <view class="lotus-loading-center">
                <text class="lotus-loading-img"></text>
                <view class="lotus-loading-text">加载中</view>
            </view>
        </view>
    </view>
</template>
<style lang="less">
    @import "./Winglau14-loutsLoading.css";
</style>
<script>

    export default {
        name: 'lotus-loading',
        props: ['lotusLoadingData'],
        data () {
            return {
                
            }
        }
    }
</script>