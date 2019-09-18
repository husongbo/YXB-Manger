<template>
	<view>
		<view class="keyboard-ceng" :class="'' + patterns" @tap="ClosePsd">
		</view>
		<!-- <uni-shader v-if="shader"></uni-shader> -->
		<view :class="'keyboard-box ' + pattern">
			<view class="close-button" @tap="hide">
				<uni-icon type="close" size="16" color="#fff"></uni-icon>
			</view>
			<view class="keyboard-title">
				<text>{{title}}</text>
			</view>
			<view class="money-box">
				<view>￥{{CouponPrice}}</view>
				<view>请输入支付密码</view>
				<view class="text-box">
					<view class="item-char" v-for="i in items" :key="i">
						<view class="item-char__dot" v-if="password[i] || password[i] === 0"></view>
					</view>
				</view>
				<view>忘记密码</view>
			</view>
			<view class="keyboard-content mt-10">
				<view class="table">
					<view class="row">
						<view @tap="inputPwd($event)" data-char="1">1</view>
						<view @tap="inputPwd($event)" data-char="2">2</view>
						<view @tap="inputPwd($event)" data-char="3">3</view>
					</view>
					<view class="row">
						<view @tap="inputPwd($event)" data-char="4">4</view>
						<view @tap="inputPwd($event)" data-char="5">5</view>
						<view @tap="inputPwd($event)" data-char="6">6</view>
					</view>
					<view class="row">
						<view @tap="inputPwd($event)" data-char="7">7</view>
						<view @tap="inputPwd($event)" data-char="8">8</view>
						<view @tap="inputPwd($event)" data-char="9">9</view>
					</view>
					<view class="row">
						<view></view>
						<view @tap="inputPwd($event)" data-char="0">0</view>
						<view @tap="backspace" data-char="0">
							删除
						</view>
						<!-- <view hover-class="cell-active" class="backspace" @tap="backspace">
							<uni-icon type="backspace2" class="backspace2"></uni-icon>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/i-icon/i-icon.vue'
	import { mapState } from 'vuex';
	// import uniShader from '@/components/uni-shader.vue'
	export default {
		components: {
			uniIcon
			// uniShader
		},
		props: {
			title: {
				type: String,
				default: '余额付款'
			},
			CouponPrice:{
				type:Number,
				default:0
			}
			
		},
		computed: mapState([ 'UserInfo']),
		data() {
			return {
				shader: false,
				password: [],
				items: [0, 1, 2, 3, 4, 5],
				pattern: 'hidden',
				patterns:'hidden'
			};
		},
		methods: {
			show() {
				this.shader = true;
				let args = {
					cancel: false
				};
				this.$emit('shown', args);
				if (!args.cancel) {
					this.pattern = 'slideup';
					this.patterns='blocks'
				}
			},
			hide() {
				this.shader = false;
				let args = {
					cancel: false
				};
				this.$emit('hidden', args);
				if (!args.cancel) {
					this.pattern = 'hidden';
					this.patterns='hidden'
					this.password=[]
				}
			},
			inputPwd(e) {
				let char = e.currentTarget.dataset.char;
				let args = {
					target: this,
					data: char,
					cancel: false,
					callback: undefined
				};
				this.$emit('input', args);
				if (!args.cancel){
					if (this.password.length === this.items.length) {
						console.log(this.password)
						return;
					}
					if (args.callback && typeof args.callback === 'function') {
						args.callback.call(this);
					}
					this.password.push(char);
					console.log(char)
					if (this.password.length === this.items.length) {
						setTimeout(()=>{
							//长度达6位，自动验证
							if(this.password.join('')==123456){
								this.$emit('completed', this.password.join(''));
								return;
							}
							this.$emit('completed','error');
							this.password=[]
							return;
						},200)
					}
				}
			},
			ClosePsd(){
				this.hide();
				this.password=[]
				uni.showToast({
					title: '您已取消支付',
					duration: 1000,
					icon:"none",
				});
			},
			backspace() {
				let args = {
					cancel: false
				};
				this.$emit('delete', args);
				if (!args.cancel) {
					if (this.password.length > 0) {
						this.password = this.password.slice(0, this.password.length - 1);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mt-10 {margin-top: 10px;}
	.hidden {display: none;}
	.blocks {display: block;}
	.keyboard-box {position: absolute;background: #fff;z-index: 99999999999;bottom: 0;width: 100%;}
	.keyboard-box .close-button {
		position: absolute;
		top: 2px;
		right: 5px;		
		z-index: 9999;
	}
	.keyboard-box .keyboard-title {
		height: 30px;
		color: #fff;
		font-size: 12px;
		z-index: 999;
		text-align: center;
		line-height: 30px;
		position: relative;
		overflow: hidden;
	}
	.keyboard-box .keyboard-title text {z-index: 9999;position: relative;}
	.keyboard-box .keyboard-title:after {
		content: '';
		width: 120%;
		height: 30px;
		position: absolute;
		left: -10%;
		top:0;
		border-radius: 0 0 50% 50%;
		background: #00c456;
	}
	.keyboard-ceng{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background: rgba(0,0,0,0.5);
	}
	.keyboard-box .money-box {
		width: 100%;
		text-align: center;
	}
	.keyboard-box .money-box .text-box {padding: 10px 0;display: flex;flex-direction: row;align-items: center;justify-content: center;}
	.keyboard-box .money-box .text-box .item-char {
		border:1px solid #a6a6a6;
		width: 30px;
		height: 30px;
		&__dot {
			height: 30px;
			&:after {
				content: '●';
				font-size: 16px;
				line-height: 30px;
				height: 30px;
				display: block;
			}
		}
	}
	.keyboard-box .money-box .text-box .item-char:not(:first-child) {
		margin-left: 3px;
	}
	.keyboard-box .money-box view:nth-child(1) {
		font-size: 30px;
		color: #222;
	}
	.keyboard-box .money-box view:nth-child(2) {
		font-size: 12px;
	}
	.keyboard-box .money-box view:nth-child(4) {
		font-size: 12px;
		color: #00c456;
	}
	.keyboard-box .keyboard-content {
		min-height: 100px;
		height: auto;
		padding: 0 10px;
		width: 100%;
		box-sizing: border-box;
	}
	.keyboard-box .keyboard-content .table {
		display: table;
		border-collapse:separate;
		border-top:1px solid #f6f6f6;
		border-left:1px solid #f6f6f6;
		width: 100%;
	}
	.keyboard-box .keyboard-content .row {
		display: table-row;
	}
	.keyboard-box .keyboard-content .row .backspace {
		text-align: center;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// width: calc(100% / 3);
	}
	/* .keyboard-box .keyboard-content .row .backspace:after {
		font-family: 'icomoon'!important;
		content: '\e900';
		font-size: 20px;
		line-height: 40px;
	} */
	.keyboard-box .keyboard-content .row view {
		display: table-cell;
		width: calc(100% / 3);
		text-align: center;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #f6f6f6;
		border-right: 1px solid #f6f6f6;
		font-size: 14px;
		font-weight: bold;
	}
	.keyboard-box .keyboard-content .row view:active {
		background: #f3f3f3;
	}
	/* .keyboard-box .keyboard-content .row .cell-active {
		background: #f3f3f3;
	} */
	/*动画*/
	@keyframes slidedown {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}
	.slidedown {
		animation: slidedown 0.3s linear;
		transform: translateY(100%);
	}
	.slideup {
		animation: slideup 0.3s linear;
		transform: translateY(0);
	}
	@keyframes slideup {
		from {
			transform: translateY(calc(100%));
		}
		to {
			transform: translateY(0);
		}
	}
	.backspace2{
		display: flex;
		justify-items: center;
	}
</style>
