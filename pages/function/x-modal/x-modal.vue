<template>
	<view class="modal-view" :class="{'modal-show': hide}" @touchmove.stop.prevent="empty" v-if="pageCloak">
		<view class="modal-content">
			<slot name='title'>
				<view class="modal-text-center modal-title">
					{{title}}
				</view>
				
			</slot>
			<slot name='text'>
				<view class="modal-main modal-text-center">
					{{text}}
				</view>
			</slot>
			<view class="modal-row modal-border-top">
				<view 
					class="modal-col modal-border-right" 
					hover-class="modal-active"
					@click="cancel"
					v-if="!noCancel"
				>
					{{cancelText}}
				</view>
				<view 
					class="modal-col" 
					hover-class="modal-active"
					:style="{color: confirmColor}"
					@click="confirm"
				>
					{{confirmText}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '操作提示'
			},
			text: {
				type: String,
				default: '提示内容'
			},
			noCancel: {
				type: Boolean,
				default: false
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			confirmText: {
				type: String,
				default: '确定'
			},
			confirmColor: {
				type: String,
				default: 'rgb(0, 122, 255)'
			},
			hidden: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				hide: this.hidden,
				pageCloak: false,		// 小程序端初始化时，组件闪烁
				txt:false
			};
		},
		watch: {
			hidden(nVal, oVal){
				this.hide = nVal
			},
			hide(nVal, oVal){
				this.$emit('update:hidden', nVal)
			}
		},
		mounted() {
			this.pageCloak = true
		},
		methods: {
			empty(){},
			confirm(e){
				this.hide = false
				// console.log('confirm')
				this.$emit('confirm', e)
				
			},
			cancel(e){
				this.hide = false
				// console.log('cancel')
				this.$emit('cancel', e)
			}
		}
	}
</script>

<style lang="scss">
.modal-view{
	position: fixed !important;z-index: 999;top: 0;right: 0;bottom: 0;left: 0;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center; -ms-flex-align: center; align-items: center;-webkit-box-pack: center; -ms-flex-pack: center; justify-content: center;background: rgba(0, 0, 0, .46);visibility: hidden;transition: all .2s;will-change: auto;opacity: 0;
	.modal-content{background: #fff;width: 80%;border-radius: 6px;overflow: hidden;position: relative;padding-bottom: 50px;-webkit-transform: scale3d(.465, .465, .465); transform: scale3d(.465, .465, .465);transition: all .2s;will-change: auto;}
	
	.modal-row {display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;position: absolute !important;left: 0;right: 0;bottom: 0;height: 50px;line-height: 50px;text-align: center;font-size: 18px;color: rgb(3, 3, 3);}
	.modal-col {-ms-flex-preferred-size: 0;flex-basis: 0;-webkit-box-flex: 1;-ms-flex-positive: 1;flex-grow: 1;max-width: 100%;position: relative;transition: all .1s;}
	
	.modal-active{background: #f2f2f2;}
	.modal-title{font-size: 18px;text-align: center;padding: 1em 1.6em .3em;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
	.modal-main{padding: 1.3em 1.6em 1.3em;font-size: 15px;line-height: 26px;max-height: 400px;overflow-y: auto;color: #999;}
	.modal-padding{padding: 10px 15px;}
	.modal-text-center{text-align: center;}
	.modal-border-top::after, .modal-border-right::after{content: '';position: absolute;top: 0;right: 0;}
	.modal-border-top::after{left: 0;height: 1px;border-top: 1px solid #d5d5d5;transform: scaleY(.36) translateY(-1px);}
	.modal-border-right::after{bottom: 0;width: 1px;border-right: 1px solid #d5d5d5;transform: scaleX(.36) translateX(1px);}
}
.modal-view.modal-show{
	visibility: visible;opacity: 1;
	.modal-content{-webkit-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1);}
}
@keyframes fadeIn {
	0%{opacity: 0;}
	100%{opacity: 1;}
}
</style>
