<template>
	<view class="parent-re" @touchstart="touchstart" @touchmove="touchmove"><regs></regs></view>
</template>

<script>
// 	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
// 	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
// 	import cityData from '../../../common/city.data.js';
import { mapState } from 'vuex';
import regs from '../../function/regphone/regphone.vue';
	export default {
		components:{
			regs
		},
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
			};
		},
		computed: mapState([ 'hasLogins','hasLogin']),
		onLoad(){
			if(this.hasLogins&&!this.hasLogin){
				uni.setNavigationBarTitle({
					title: '绑定手机号'
				});
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

<style scoped>
	.parent-re{
		height:100%;
		background: white;
		overflow-x: hidden;
	}
</style>
