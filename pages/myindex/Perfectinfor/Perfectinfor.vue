<template>
	<view class="parent-re" @touchstart="touchstart" @touchmove="touchmove"><regs  :flag="flags"></regs></view>
</template>

<script>
// 	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
// 	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
// 	import cityData from '../../../common/city.data.js';
import regs from '../../function/regfect/regfect.vue';
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
				flags:true,
			};
		},
		onLoad(options){
			this.flags=JSON.parse(options.flag)
			console.log(this.flags)
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
	}
</style>
