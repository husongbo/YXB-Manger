<template>
	<view class="box">
		<view class="box__header">
			<slot></slot>
		</view>
		<view class="box__body">
			<view class="password-box">
				<!-- 旧密码 -->
				<view class="password-item aa" v-if="oldpsd" @tap="show">
					<view class="password-item-char" v-for="i in items" :key="i">
						<view class="password-item-char__dot" v-if="oldpassword[i] || oldpassword[i] === 0"></view>
					</view>	
				</view>
				<view class="password-item" v-if="newpsd" @tap="show">
					<view class="password-item-char" v-for="i in items" :key="i">
						<view class="password-item-char__dot" v-if="password[i] || password[i] === 0"></view>
					</view>	
				</view>
				<view class="password-item" v-if="newpsds" @tap="show">
					<view class="password-item-char" v-for="i in items" :key="i">
						<view class="password-item-char__dot" v-if="passwords[i] || passwords[i] === 0"></view>
					</view>
				</view>
			</view>
			<view style="color: #CCCCCC;margin-top: 20upx;">{{passwordtext}}</view>
		</view>
		<view :class="'keyboard ' + pattern">
			<ul class="number">
				<li class="button" @tap="input(item)" v-for="item in keys" :key="item">{{item}}</li>
				<li class="button">.</li>
				<li class="button down" @tap="hide"></li>
			</ul>
			<view class="action">
				<view class="delete" @tap="del"></view>
				<view class="ok" @click="Back"></view>
			</view>
		</view>
		<!-- 提示框 -->
		<view class="Verification" :style="{display:vervisit}"  :class="{'veramin':vershow}">
			{{vertext}}
		</view>
		<button type="primary" class="Submission">确定</button>
		<simpleLoading ref="simpleLoading"></simpleLoading>
	</view>
</template>

<script>
	const keys = () => {
		let natural = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		return natural.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		});
	};
	import md5 from '@/common/md5.js'
	import Utils from '../../util/util.js'
	import uniIcon from '@/components/i-icon/i-icon.vue'
	import { mapState,mapMutations } from 'vuex'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	export default {
		props: {
			defaultPassword:{
				type: String
			},
			flag:{
				type:Boolean
			}
		},
		components: {
			uniIcon,
			simpleLoading
		},
		data() {
			return {
				items: [0, 1, 2, 3, 4, 5],
				password: [],//第一次密码
				passwords:[],//第二次密码
				oldpassword:[],//旧密码
				psdString:'',
				psdStrings:'',
				oldpsdString:'',
				keys: keys(),
				pattern: 'hidden',
				oldpsd:true,//旧密码
				newpsd:false,//第一次密码
				newpsds:false,//第二次密码
				passwordtext:'请输入旧密码',//密码底部信息
				vershow:true,//提示动画
				vervisit:"none",//动画显示
				vertext:'俩次密码不一致，请重新输入！',//提示信息
				Userid:'',
				Psdindex:0,
				userinfo:'',
				PsdFalg:true,
			};
		},
		computed: mapState([ 'UserInfo']),
		mounted(){
			// console.log(this.flag)
			var userdatas=`{method:"CheckUserPayPwd",user_id:"${this.UserInfo.userid}"}`
			console.log(userdatas)
			this.$api.ReagisterPhone(userdatas).then((res)=>{
				console.log(res)
				console.log(res.data.result)
				if(parseInt(res.data.result)==1&&res.data.message=='支付密码未设置'){
					this.oldpsd=false
					this.newpsd=true
					this.passwordtext='请输入密码'
					this.PsdFalg=false
				}
				else{
					this.PsdFalg=true
				}
			})
			// if(!this.flag){
			// 	this.oldpsd=false
			// 	this.newpsd=true
			// 	this.passwordtext='请输入密码'
			// }
			// var userdatas=`{method:"GetUserInfo",user_id:"${this.UserInfo.userid}"}`
			// this.$api.ReagisterPhone(userdatas).then((res)=>{
			// 	console.log(JSON.stringify(res))
			// })
		},
		methods: {
			...mapMutations(['SetPayPsd']),
			show() {
				let args = {
					cancel: false
				};
				this.$emit('shown', args);
				if (!args.cancel) {
					this.pattern = 'slideup';
				}
			},
			hide() {
				let args = {
					cancel: false
				};
				this.$emit('hidden', args);
				if (!args.cancel) {
					this.pattern = 'slidedown';
				}
			},
			//基本信息
			AjaxUserInfo(){
				console.log(this.UserInfo.userid)
				var userdatas=`{method:"GetUserInfo",user_id:"${this.UserInfo.userid}"}`
				this.$api.ReagisterPhone(userdatas).then((res)=>{
					console.log(JSON.stringify(res))
					this.userinfo=JSON.parse(res.data.user_info)[0]
					this.SetPayPsd(this.userinfo)
				})
			},
			input(item) {
				var _this=this
				let args = {
					target: this,
					data: item,
					cancel: false,
					callback: undefined
				};
				console.log('s');
				this.$emit('input', args);
				if(this.oldpsd){
					this.oldpassword.push(item);
					if (this.oldpassword.length === this.items.length) {
						this.oldpsdString=this.oldpassword.join('');
						console.log("旧密码"+this.oldpsdString)
						setTimeout(()=>{
							this.newpsd=true
							this.oldpsd=false
							this.newpsds=false
							this.passwordtext="请输入新密码"
							return;
						},500)
					}
					return;
				}
				if(this.newpsd){
					if (!args.cancel){
						this.password.push(item);
						if (this.password.length === this.items.length) {
							//长度达6位，自动验证
							this.psdString=this.password.join('');
							console.log("第一次"+this.psdString)
							setTimeout(()=>{
								this.newpsd=false
								this.oldpsd=false
								this.newpsds=true
								this.passwordtext="请再次输入密码"
								return;
							},200)
						}
						if (args.callback && typeof args.callback === 'function') {
							args.callback.call(this);
						}
					}
				}
				else if(this.newpsds){
					this.passwords.push(item);
					if (this.passwords.length === this.items.length) {
						this.psdStrings=this.passwords.join('');
						if(this.psdStrings==this.psdString){
							console.log("密码一致")
							if(this.Psdindex==0){
								this.$refs.simpleLoading.show({
									image:"../../../static/app-plus/tus.png",
									text:'绑定中...'
								});
								this.Psdindex=1
								this.Userid=this.UserInfo.userid
								console.log(this.Userid)
								if(this.PsdFalg){
									
									var PsdJson={
										old_pay_pwd:this.oldpsdString,
										new_pay_pwd:this.psdStrings
									}
									console.log(PsdJson)
									var MdPsd=md5(this.oldpsdString)
									console.log(MdPsd)
									var AesTetx=Utils.encrypt(JSON.stringify(PsdJson),MdPsd)
									let datas=`{method:"ModifyUserPayPwd",user_id:"${this.Userid}",post_params:"${AesTetx}"}`
									this.$api.ReagisterPhone(datas).then((res)=>{
										console.log(res)
											setTimeout(()=>{
												_this.$refs.simpleLoading.hide()
												if(res.data.result==0){
													uni.showToast({
														title:res.data.message,
														duration: 1000,
														icon:"none",
														success:function(){
															_this.newpsd=false
															_this.oldpsd=true
															_this.newpsds=false
															_this.passwordtext="请输入旧密码"
															_this.password=[]
															_this.passwords=[]
															_this.oldpassword=[]
														}
													});
												}
												else if(res.data.result==1){
													uni.showToast({
														title:res.data.message,
														duration: 1000,
														icon:"none",
														success:function(){
															_this.newpsd=false
															_this.oldpsd=true
															_this.newpsds=false
															_this.passwordtext="请输入旧密码"
															_this.password=[]
															_this.passwords=[]
															_this.oldpassword=[]
															setTimeout(()=>{
																uni.navigateBack({
																	delta:1,
																	animationType: 'pop-out',
																	animationDuration: 200
																})
															},500)
														}
													});
												}
												_this.Psdindex=0
											},1000)
									})
									return;
								}
								var psdjson={
									user_id:this.Userid,
									user_pay_pwd:this.psdStrings
								}
								console.log(psdjson)
								var AesJson=Utils.encrypt(JSON.stringify(psdjson),'afd60b4ad2ec1l2c586e2150770f8f9e')
								console.log(AesJson)
								var dataes=`{method:"SetUserPayPwd",post_params:"${AesJson}"}`
								uni.request({
									url: 'http://192.168.1.6:2001/App/Common/CSharp/app/user/UserInfo.ashx',
									data:{
										params:dataes
									},
									success: (res) => {
										console.log(res);
										if(res.data.result==1){
											setTimeout(()=>{
												_this.$refs.simpleLoading.hide()
												uni.showToast({
													title: '绑定成功',
													duration: 1500,
													icon:"none",
													success:function(){
														_this.AjaxUserInfo()
													}
												});
												setTimeout(()=>{
													this.Psdindex=0
													uni.navigateBack({
														delta:1,
														animationType: 'pop-out',
														animationDuration: 200
													})
												},1000)
											},1000)
										}
									}
								});
								this.done()
							}
						}
						else{
							this.vervisit='block'
							this.passwordtext='请输入密码'
							this.newpsd=true
							this.newpsds=false
							this.password=[]
							this.passwords=[]
							setTimeout(()=>{
								this.vervisit='none'
							},2000)
						}
						console.log(this.psdStrings)
					}
					
				}
			},
			del() {
				let args = {
					cancel: false
				};
				this.$emit('delete', args);
				if (!args.cancel) {
					if (this.password.length > 0 && this.newpsd) {
						this.password = this.password.slice(0, this.password.length - 1);
					}
					else if (this.passwords.length > 0 && this.newpsds) {
						this.passwords = this.passwords.slice(0, this.passwords.length - 1);
					}
					else{
						this.oldpassword = this.oldpassword.slice(0, this.oldpassword.length - 1);
					}
				}
			},
			done(){
				if (this.password.length !== this.items.length) return;
				
				this.$emit('confirm', {
					target: this,
					value: this.password.join('')
				});
			},
			Back(){
				uni.navigateBack({
					delta:1,
					animationType: 'pop-out',
					animationDuration: 200
				})
			}
		},
		watch: {
			defaultPassword: {
				immediate:true,
				handler(val){
					if (val && val.length === 6) {
						this.password = val.split('').map(Number);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './uni-password.scss'
</style>