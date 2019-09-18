<template>
	<view class="parent-info" @touchstart="touchstart" @touchmove="touchmove">
		<view>
		<uni-view data-v-960e14a2="" class="uni-list-cell">
			<uni-view data-v-960e14a2="" class="uni-list-cell-navigate uni-navigate-right">
			发票类型
		</uni-view>
		</uni-view>
		<uni-view data-v-960e14a2="" class="uni-list-cell cell-btn">
			<view data-v-5c82e918="" class="btns">电子普通发票</view>
		</uni-view>
		</view>
		<view>
			<uni-view data-v-960e14a2="" class="uni-list-cell">
				<uni-view data-v-960e14a2="" class="uni-list-cell-navigate uni-navigate-right">
				发票抬头
			</uni-view>
			</uni-view>
			<view style="width: 100%;overflow-x: hidden;">
			<radio-group class="uni-flex" name="gender" @change="radiocheck">
				<label>
					<radio value="0" checked />个人</label>
				<label class="radio-right">
					<radio value="1" />公司</label>
			</radio-group>
			</view>
			<!-- 公司 -->
			<view :style="{display:item}">
			<view class="item-inner">
                <span>添加公司名称和税号</span>
                <span class="add" @click="modaladd">+</span>
            </view>
			<view class="card" v-if="Companyif">
				<view class="card-header">
					<span>公司名称</span>
					<view class="card-text" style="font-size: .8rem;">{{Company.name}}</view>				
					<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="" style="color: #CCCCCC;">请选择公司</view>
					</picker>
				</view>
				<view class="card-header">
					<span>税号</span>
					<view class="card-text" style="font-size: .8rem;">{{Company.id}}</view>
				</view>
			</view>
			</view>
			<!-- 个人 -->
			<view :style="{display:items}">
			<view class="card">
				<view class="card-header">
					<span>姓名</span>
					<input type="text" disabled="disabled" style="font-size: .9rem;" :value="UserInfo.userinfos.M0001_NAME" placeholder="请填写姓名"/>
				</view>
				<view class="card-header">
					<span>身份证号</span>
					<input type="text" disabled="disabled" style="font-size: .9rem;" :value="UserInfo.userinfos.M0001_IDENTITY_CARD" placeholder="填写身份证号" />
				</view>
				<view class="card-header">
					<span>电子邮箱</span>
					<input type="text" disabled="disabled" style="font-size: .9rem;" :value="UserInfo.userinfos.M0001_EMAIL" placeholder="填写电子邮箱"/>
				</view>
			</view>
			</view>
			<uni-view data-v-960e14a2="" class="uni-list-cell">
				<uni-view :class="[{'active':index==tabIndex}]" @tap="toggleTab(index)" v-for="(item,index) in tabList" :key="index" class="uni-list-cell-navigate uni-navigate-right">
				<span>月份选择<span>（请选择）</span></span>
				<span>{{tabList[0].name}}</span>
				</uni-view>
			</uni-view>
			<!-- <view class="card-header cardheaders">
				<span>发票信息</span>
				<view class="card-text"></view>
			</view> -->
			<!-- <view class="" v-for="(item,index) in arrlist" :key="index">
				<view class="headpages">
					<view class="headoages-left" style="width: 50%;display: flex;flex-direction: row;height: 80upx;align-items: center;">
						<image src="../../../static/app-plus/circle.png" mode="" style="width: 40upx;height: 40upx;margin-left: 30upx;" @click="Changeradio(index)"></image>
						<view class="" style="margin-left: 20upx;">{{item.months}}</view>
					</view>
					<view class="" style="width: 50%;display: flex;align-items: center;justify-content: flex-end;">
						<image src="../../../static/app-plus/up.png" mode="" style="width: 40upx;height: 40upx;margin-right: 40upx;"></image>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(items,indexs) in item.list" :key="indexs">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list ">
						<view class="uni-media-list-logo">
							<image src="../../../static/myicon/mx1.png"/>
						</view>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{items.name}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">{{items.time}}</view>
						</view>
						<view class="money">￥<span>{{items.price}}</span></view>
					</view>
				</view>
			</view> -->
			<arrlists :arrlist="arrlist" @clickradio="radios" @shoubuliao="aiaiai"></arrlists>
			
			
			<w-picker :mode="mode" startYear="2016" endYear="2030" step="1" :defaultVal="defaultVal" @confirm="onConfirm" ref="picker" themeColor="#f00"></w-picker>
			<view class="btn">
			<view data-v-7a1412f1="" data-v-5c82e918="" class="register-ok" @click="Invoicesub">提交</view>
			</view>
		</view>
		<!-- 弹出框 -->
		<view class="modal-in" style=" margin-top: -123px;" :class="{'modal-add':modals,'modal-hid':modalshid}">
			<view class="modal-inner">
				<view class="modal-title">添加</view>
				<view class="modal-text" style="margin-bottom: 60upx;">
					<span style="width: 30%;display: flex;align-items: center;">公司名称</span>
					<input type="text" class="inputs" v-model="Companytext.Name" placeholder="请输入公司全称" style="text-align: left;padding-left: 20upx;height:60upx;line-height: 60upx;font-size: .9rem;">
				</view>
				<view class="modal-text" style="margin-bottom: 40upx;">
					<span style="width: 30%;display: flex;align-items: center;">识别号</span>
					<input type="text" class="inputs" v-model="Companytext.IDCom" placeholder="请填写纳税人识别号" style="text-align: left;padding-left: 20upx;height:60upx;line-height: 60upx;font-size: .9rem;">
				</view>
			</view>
			<view class="modal-buttons">
				<span class="modal-button" @click="closemodal">取消</span>
				<span class="modal-button modal-button-bold" @click="Determine">确定</span>
			</view>
		</view>
		<view class="modal-overlay" :style="{display: dismodal}"></view>
		<alerts :show='alertarray.show' :msg='alertarray.msg'></alerts>
		<simpleLoading ref="simpleLoading"></simpleLoading>
	</view>
	
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import alerts from '@/components/loading/alert.vue'
	import simpleLoading from '@/components/loading/dialog-loading.vue'
	import arrlists from './list.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				item:'none',
				items:'block',
				modals:false,
				dismodal:'none',
				modalshid:true,
				array: [],
				index:1,
				tabList:[{
						mode:"yearMonth",
						name:'',
						value:[0,1]
					}],
				tabIndex:0,
				Companytext:{
					Name:'',
					IDCom:''
				},
				Company:{
					name:'',
					id:''
				},
				CompanyYZ:[
					{num:/^[a-zA-Z0-9]{15}$/},
					{num:/^[a-zA-Z0-9]{18}$/},
					{num:/^[a-zA-Z0-9]{20}$/}
				],
				CompanyFlag:false,
				alertarray:{
					show:false,
					msg:''
				},
				EditIndex:0,
				Companylist:[],
				Companyif:false,
				ComRecordList:[],
				checkedlist:[],
				ceshilist:[],
				arrlist:[],
				subindex:0,
			};
		},
		components:{
			wPicker,
			alerts,
			simpleLoading,
			arrlists
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url: '/pages/myindex/Instructions/Instructions',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		computed:{
			...mapState([ 'UserInfo']),
			mode(){
				return this.tabList[this.tabIndex].mode
			},
			defaultVal(){
				return this.tabList[this.tabIndex].value
			}
		},
		onLoad(){
			console.log(this.UserInfo.userid)
			this.GetInvoiceRecord()
			this.GetRecord()
		},
		methods:{
			touchstart(event){
				event.preventDefault();
		　　　　	this.startX = event.touches[0].pageX
			},
			bindPickerChange: function(e) {
				console.log(e.target.value)
				this.Companylist.forEach((item,index)=>{
					if(index==e.target.value){
						this.Company.name=item.PT0019_COMPANY_NAME
						this.Company.id=item.PT0019_TAX_NUMBER
						return;
					}
				})
			},
			Invoicesub(){
				var _this=this
				if(_this.subindex==0){
					_this.subindex=1
					if(_this.ComRecordList.length==0){
						uni.showToast({
							title:'您还没有需要提交的发票',
							duration: 1000,
							icon:"none",
						});
						_this.subindex=0
						return;
					}
					if(_this.checkedlist.length==0){
						uni.showToast({
							title:'请选择要提交的发票',
							duration: 1000,
							icon:"none",
						});
						_this.subindex=0
						return;
					}
					var month=''
					_this.checkedlist.forEach((item,index)=>{
						if((_this.checkedlist.length)!=index+1){
							month+=item+","
						}
						else{
							month+=item
						}
					})
					var datas=`{method:"ApplayTicketInfo",user_id:"${this.UserInfo.userid}",month:"${month}",ticket_type:"1",ticket_info_id:'', email:"${this.UserInfo.userinfos.M0001_EMAIL}"}`
					this.$api.ReagisterPhone(datas).then((res)=>{
						console.log(JSON.stringify(res))
					})
					console.log(datas)
				}
				
			},
			radios(items,flag){
				var _this=this
				console.log(items.months)
				this.arrlist.forEach((item,index)=>{
					if(item.months==items.months){
						if(flag){
							// item.list.forEach((val)=>{
								_this.checkedlist.push(items.months)
								console.log(JSON.stringify(_this.checkedlist))
							// })
						}
						else{
							if(_this.checkedlist.length==0){
								return;
							}
							_this.checkedlist.forEach((val,index)=>{
								if(items.months==val){
									_this.checkedlist.splice(index,1)
									console.log(JSON.stringify(_this.checkedlist))
									return;
								}
							})
						}
					}
				})
			},
			aiaiai(items,flag){
				var _this=this
				console.log(items.months)
				this.arrlist.forEach((item,index)=>{
					if(item.months==items.months){
						if(flag){
							// item.list.forEach((val)=>{
								_this.ceshilist.push(items.months)
								// console.log(JSON.stringify(_this.ceshilist))
							// })
						}
						else{
							if(_this.ceshilist.length==0){
								return;
							}
							_this.ceshilist.forEach((val,index)=>{
								if(items.months==val){
									_this.ceshilist.splice(index,1)
									// console.log(JSON.stringify(_this.ceshilist))
									return;
								}
							})
						}
					}
				})
			},
			GetRecord(){
				var datas=`{method:"GetTicketInfo",user_id:"${this.UserInfo.userid}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					console.log(JSON.stringify(res))
					if(res.data.result==1){
						this.ComRecordList=JSON.parse(res.data.data)
						this.ComRecordList.forEach((item)=>{
							item.months=item.消费月份
							item.name=item.消费商品
							item.price=item.消费金额
							item.time=item.消费时间
							
						})
						console.log(JSON.stringify(this.ComRecordList))
						this.arrlist.push({months:'',img:'',imgs:'',flag:'',updown:'',list:[]})
						this.arrlist[0].months=this.ComRecordList[0].months
						this.arrlist[0].img='../../../static/app-plus/circle.png'
						this.arrlist[0].imgs='../../../static/app-plus/down.png'
						this.arrlist[0].flag=false
						this.arrlist[0].updown=false
						this.arrlist[0].list=[]
						this.arrlist[0].list.push(this.ComRecordList[0])
						this.ComRecordList.forEach((item,index)=>{
							if(index==0){
								return;
							}
							else{
								var i=0
								this.arrlist.forEach((items,indexs)=>{
									console.log(this.arrlist.length)
									if(parseInt(items.months)==parseInt(item.months)){
										i++
										items.list.push(item)
										console.log(items.months)
										return;
									}	
								})
								if(i==0){
									this.arrlist.push({months:'',img:'',imgs:'',flag:'',updown:'',list:[]})
									console.log(this.arrlist.length)
									this.arrlist[this.arrlist.length-1].months=item.months
									this.arrlist[this.arrlist.length-1].list.push(item)
									this.arrlist[this.arrlist.length-1].img='../../../static/app-plus/circle.png'
									this.arrlist[this.arrlist.length-1].flag=false
									this.arrlist[this.arrlist.length-1].imgs='../../../static/app-plus/down.png'
									this.arrlist[this.arrlist.length-1].updown=false
								}
									
								
							}		
							console.log(JSON.stringify(this.arrlist))
							})
						console.log(JSON.stringify(this.arrlist))
						return;
					}
				})
			},
			//获取发票信息
			GetInvoiceRecord(){
				var _this=this
				_this.array=[]
				var datas=`{method:"GetCompanyTicketInfo",user_id:"${this.UserInfo.userid}"}`
				this.$api.ReagisterPhone(datas).then((res)=>{
					if(res.data.result==0){
						return;
					}
					this.Companylist=JSON.parse(res.data.data)
					if(this.Companylist.length!=0){
						this.Companyif=true
					}
					this.Company.name=this.Companylist[0].PT0019_COMPANY_NAME
					this.Company.id=this.Companylist[0].PT0019_TAX_NUMBER
					this.Companylist.forEach((item)=>{
						_this.array.push(item.PT0019_COMPANY_NAME)
					})
					console.log(this.Companylist)
				})
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
			},
			//单选
			radiocheck(item){
				if(item.detail.value=="0"){
					this.items="block"
					this.item="none"
				}
				else{
					this.item="block"
					this.items="none"
				}
			},
			//弹框
			modaladd(){
				this.dismodal="block"
				this.modalshid=false
				this.modals=true
			},
			closemodal(){
				this.dismodal="none"
				this.modalshid=true
				this.modals=false
			},
			Determine(){
				// CompanyYZ
				var _this=this
				console.log(this.Companytext.IDCom)
				if(_this.EditIndex==0){
					_this.EditIndex=1
					if(_this.Companytext.Name==''||_this.Companytext.IDCom==''){
						_this.alertarray.show=true
						_this.alertarray.msg='不能为空，请继续输入'					
						setTimeout(()=>{
							_this.alertarray.show=false
							_this.EditIndex=0
						},1000)
						return;
					}
					this.CompanyYZ.forEach((item)=>{
						if(item.num.test(_this.Companytext.IDCom)){
							_this.CompanyFlag=true
							return
						}
					})
					console.log(_this.CompanyFlag)
					if(_this.CompanyFlag){
						var datas=`{method:"UpdateCompanyTicketInfo",user_id:"${_this.UserInfo.userid}",company_name:"${_this.Companytext.Name}",tax_number:"${_this.Companytext.IDCom}"}`
						this.$api.ReagisterPhone(datas).then((res)=>{
							console.log(JSON.stringify(res))
							if(res.data.result==1){
								_this.$refs.simpleLoading.show({
									image:"../../../static/app-plus/tus.png",
									text:'绑定中...'
								});
								setTimeout(()=>{
									_this.$refs.simpleLoading.hide()
									_this.EditIndex=0
									_this.Companytext.Name=''
									_this.Companytext.IDCom=''
									this.dismodal="none"
									this.modalshid=true
									this.modals=false
									_this.GetInvoiceRecord()
									uni.showToast({
										title:'绑定成功',
										duration: 1000,
										icon:"none",
									});
								},1000)
								return;
							}
							setTimeout(()=>{
								_this.$refs.simpleLoading.hide()
								_this.EditIndex=0
								_this.Companytext.Name=''
								_this.Companytext.IDCom=''
								this.dismodal="none"
								this.modalshid=true
								this.modals=false
								uni.showToast({
									title:'绑定失败',
									duration: 1000,
									icon:"none",
								});
							},1000)
							return;
							
							
						})
						return;
					}
					_this.alertarray.show=true
					_this.alertarray.msg='公司识别号格式不正确，请重新输入'
					_this.Companytext.IDCom=''
					setTimeout(()=>{
						_this.alertarray.show=false
						_this.EditIndex=0
					},1000)
					//接口调用
					
				}
				
				
			},
			toggleTab(index){
				this.tabIndex=index;
				this.$refs.picker.show();
			},
			//获取日期
			onConfirm(val){
				console.log(val);
				this.tabList[0].name=val.result
			}
		}
	}
</script>

<style lang="scss" scoped>
	.parent-info{
		height:100%;
		background: white;
		position: relative;
	}
	@keyframes add{
		from{
			transform: scale(1.2);
		}
		to{
			transform: scale(1);
		}
	}
	.modal-add{visibility: visible;animation: add 0.2s linear;}
	.modal-hid{visibility: hidden;}
	.register-ok{
		width: 90%;
		margin: 80upx 5%;
		padding: 20upx 0;
		background: #ff8200;
		color: white;
		border-radius: 10upx;
		text-align: center;
	}
	.inputs{
		// width: 70%;
		margin: 0;
		input{
			height: 26px;
			line-height: 26px;
		}
	}
	.add{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: #ff8200;
		color: #fff;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-content: center;
		float: right;
	}
	.item-inner{
		background: white;
		padding-left: 30upx;
		padding-right: 0.75rem;
		position: relative;
		width: 100%;
		padding-top: 0.4rem;
		padding-bottom: 0.35rem;
		min-height: 2.2rem;
		overflow: hidden;
		box-sizing: border-box;
		border-bottom: 1px solid #e1e1e1;
	}
	.cardheaders{
		// padding:1.5rem 0.75rem;
	}
	.uni-flex{
		padding: 40upx 40upx;
		background: white;
		width: 100%;
		overflow-x: hidden;
	}
.card-text{padding-right:40upx;}
.uni-list-cell{
	background:white;
	border-bottom: 1px solid #e1e1e1;
}
.uni-list-cell:active{background: rgb(240,240,240);}
.uni-list-cell::after{
	height: 0;
}
.cell-btn{
	    padding: 11px 15px;
		border: 0;
}
.btns{
	/* width:200upx; */
	background: white;
	color: #ff8200;
	border: 1px solid #ff8200;
	padding:  4upx 8upx;
}
.radio-right{
	margin-left: 150upx;
}
.card-header {
	width: 100%;
    font-weight: normal;
    font-size: 0.7rem;
	min-height: 2.2rem;
    position: relative;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.card-header span{
	width: 30%;
}
.card-header input{
	font-size: 0.7rem;
	// color: #C0C0C0;
}
.card-header:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
}
.card {
    background-color: #fff;
    margin: 0;
    margin-bottom: 0.3rem;
	position: relative;
    border-radius: 0.1rem;
    font-size: 0.7rem;
}
.modal-overlay{
	opacity: 1;
	position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
}
.modal-in{
	opacity: 1;
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    -webkit-transform: translate3d(0, 0, 0) scale(1);
    transform: translate3d(0, 0, 0) scale(1);
	width: 14.5rem;
    margin-left: -7.25rem;
	position: absolute;
    z-index: 11000;
    left: 50%;
	top: 50%;
    text-align: center;
    border-radius: 0.35rem;
	transition-property: transform, opacity;
    color: #3d4145;
}
.modal-inner{
	background-color: #fff;
    font-size: 0.7rem;
	padding: 0;
    padding-bottom: 0.75rem;
	border-radius: 0.35rem 0.35rem 0 0;
    position: relative;
}
.modal-title{
	background-color: #ff8200;
    height: 2rem;
    line-height: 2rem;
    color: #FFFFFF;
    font-size: 0.7rem;
    border-radius: 0.35rem 0.35rem 0 0;
}	
.modal-text{
	margin-top: 0.75rem;
	padding-left: 20upx;
	display: flex;
	justify-content: space-between;
}
.modal-inner span {
	width: 30%;
}
.modal-inner input {
    border: 1px solid #ddd;
    font-size: 0.7rem;
	margin-right: 20upx;
}
.modal-inner:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #b5b5b5;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
}
.headpages{
	height: 80upx;
	width:100%;
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid #CCCCCC;
}
.modal-buttons{
	height: 2.2rem;
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.modal-button:first-child {
    border-radius: 0 0 0 0.35rem;
}
.modal-button:active{
	background: #e1e1e1;
}
.modal-button{
	background-color: #FFFFFF;
    color: #1c1d1f;
	width: 100%;
    padding: 0 0.25rem;
    height: 2.2rem;
    font-size: 0.85rem;
    line-height: 2.2rem;
    text-align: center;
    display: block;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
    -webkit-box-flex: 1;
}
.modal-button:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    left: auto;
    bottom: auto;
    width: 1px;
    height: 100%;
    background-color: #b5b5b5;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 100% 50%;
    transform-origin: 100% 50%;
}
.modal-button:last-child {
    border-radius: 0 0 0.35rem 0;
}
.modal-button-bold{
	font-weight: 500;
}

.uni-list-cell-navigate.uni-navigate-right:after {
	content: '';
    }
uni-button:after{
	border:0;
}.uni-media-list-logo{
	width: 26px;
	height: 26px;
}
.uni-media-list-body {
	height: 36px;
}
.uni-list-cell-navigate.uni-navigate-right:after{
	content: '';
}
.money{
	color: #ff8200;
	font-size: 0.9rem;
}
.parent-view{
	height: calc(100vh - 44px);
	overflow-y: hidden;
}
.tab{
	text-align: center;
	background: white;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10upx 0;
}
.tab image{
	width: 36upx;
	height: 36upx;
	position: relative;
}
</style>
