<template>
	<view class="content" @touchstart="touchstart" @touchmove="touchmove">
		<view class="card">
			<view v-if="bindingif">
			<view class="card-content">
				<view class="card-content-inner">
					<span style="color: #C8141E">温馨提示：</span>
					购买油信宝联通合作套餐，绑定手机号码后，可以享受联通套餐"30元耍卡"优惠。
					<br>
					 1、全国流量不限量（通话费另计） 
					 <br>
					  2、加油每月前100升再补贴3角/升（办理油信宝加油卡）
				</view>
			</view>
			<!-- 绑定联通卡 -->
			<view class="card" style="margin-top: 0.5rem;">
				<view class="card-header">
					<view class="namefont">
						绑定联通卡
					</view>
				</view>
				<view class="card-content">
					<view class="list-block">
						<ul>
							<li>
								<view class="item-content">
									<view class="item-inner">
										<view class="namefont">
											手机号
										</view>
										<view class="item-input">
											<input type="text" placeholder="请输入手机号" id="phone">
										</view>
										<!-- <view class="item-after" style="font-size: small; color: #9E9E9E;"></view> -->
									</view>
								</view>
							</li>
							<li>
								<view class="item-content">
									<view class="item-inner">
										<view class="namefont">
											手机验证码
										</view>
										<view class="item-input">
											<input type="text" placeholder="请输入验证码" id="phone">
										</view>
										<view class="item-after" style="font-size: small; color: #9E9E9E;">
											<a class="button">发送验证码</a>
										</view>
									</view>
								</view>
							</li>
						</ul>
					</view>
				</view>
				</view>
				<view class="card-footer">
					<span></span>
					<a class=" btn tijiao" @click="binding">绑定</a>
					<span></span>
				</view>
			</view>
			<!-- 在线申请联通卡 -->
			<view class="card" style="margin-top: 0.5rem;">
				<view class="card-header">
					<view class="namefont">
						在线申请联通卡
					</view>
				</view>
				<view class="card-content">
					<view class="card-content-inner"  style="text-indent: 0rem;">
						您可以线上渠道开通联通卡并进行实名认证，绑定后根据联通卡消费返利。
					</view>
				</view>
				<view class="card-footer">
					<span></span>
					<a class=" btn tijiao">开卡</a>		
					<navigator animation-type="pop-in" animation-duration="300" url="./reunicom" open-type="navigate">
					<a class=" btn tijiao" style="background-color: #4cd964;">充值</a>
					</navigator>
					<span></span>
				</view>
			</view>
			<!-- 已绑定联通卡 -->
			<view class="card" style="margin-top: 0.5rem;">
				<view class="card-header">
					<view class="namefont">
						已绑定联通卡
					</view>
				</view>
				<view class="card-content">
					
				</view>
				<view class="card-footer">
					<span></span>
					<navigator animation-type="pop-in" animation-duration="300" url="./reunicom" open-type="navigate">
					<a class=" btn tijiao">充值</a>
					</navigator>
					<span></span>
				</view>
			</view>
		</view>
		<view class="Verification" :style="{display:vervisit}" :class="{'veramin':vershow}">
			请输入正确的手机号
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				len:0,
				startX:0,
				moveEndX:0,
				valueX:0,
				vervisit:'none',
				vershow:false,
				indexnum:1,
				bindingif:false
			};
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
				　　　　}
					},
				binding(event){
					if(this.indexnum==1){
						this.indexnum=0
						this.vervisit="block"
						this.vershow=true
						setTimeout(()=>{
							this.indexnum=1
							this.vervisit="none"
							this.vershow=false
						},2000)
					}
				}
			}
	}
</script>

<style scoped>
.content{
	height: 100%;
	background: white;
	overflow-y: hidden;
}
.card{
	background: #fff;
    box-shadow: 0 0 0.6rem rgba(245, 127, 89, 0.3);
    margin: 0.5rem;
    position: relative;
    border-radius: 0.4rem;
    font-size: 0.7rem;
}
.Verification{
	width: 80%;
	margin: 0 10%;
	position: fixed;
	bottom: 50%;
	left: 0;
	background: rgba(0,0,0,0.5);
	z-index: 999;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
	color: white;
	border-radius: 10upx;
	font-size: 0.8rem;
}
.veramin{
	animation: verifications 0.2s linear;
}
@keyframes verifications{
	from{
		bottom: -10px;
	}
	to{
		bottom:50%;
	}
}
.card-content{
	position: relative;
}
.card-content-inner{
	padding: 0.75rem;
    position: relative;
}
.card-header,.card-footer{
	border-radius: 0.1rem 0.1rem 0 0;
    font-size: 0.85rem;
    font-weight: bold;
	min-height: 2.2rem;
    position: relative;
    padding: 0.5rem 0.75rem;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.tijiao:active{
	background-color: rgb(76, 217, 100);
}
.namefont{
	font-weight: bold;
	color: #666666;
    font-size: 0.85rem;
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
.card-content{
	position: relative;
}
.list-block{
    margin: 0;
	font-size: 0.85rem;
}
.list-block ul {
    background: #fff;
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
}
.list-block li {
    box-sizing: border-box;
    position: relative;
}
.item-content{
	box-sizing: border-box;
    padding-left: 0.75rem;
    min-height: 2.2rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.item-inner{
	padding-right: 0.75rem;
    position: relative;
    width: 100%;
    padding-top: 0.4rem;
    padding-bottom: 0.35rem;
    min-height: 2.2rem;
    overflow: hidden;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.namefont{
	width: 40%;
    flex-shrink: 0;
    margin: 4px 0;
	font-weight: lighter;
    color: #666666;
    font-size: 0.85rem;
	vertical-align: top;
}
.item-input{
	width: 100%;
    margin-top: -0.4rem;
    margin-bottom: -0.35rem;
    -webkit-box-flex: 1;
	flex-shrink: 1;
}
.list-block .item-input input {
    font-size: 0.75rem;
}
.item-after{
	display: flex;
    max-height: 1.4rem;
    flex-shrink: 0;
    margin-left: 0.25rem;
    white-space: nowrap;
}
.item-inner:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #e7e7e7;
    display: block;
    z-index: 15;
    transform-origin: 50% 100%;
}
.button{
    border: none;
    color: #C8141E;
}
.card-footer{
	border-radius: 0 0 0.1rem 0.1rem;
    color: #5f646e;
}
.card-footer:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
}
.btn{
	background-color: #C8141E;
    color: #fff;
    padding: 0.1rem 1.4rem;
    box-shadow: 0 0 0rem rgba(245, 125, 89, 0.4);
	border: none;
	    text-decoration: none;
    text-align: center;
    display: block;
    border-radius: 0.25rem;
    line-height: 1.25rem;
    box-sizing: border-box;
	    margin: 0;
    height: 1.35rem;
    white-space: nowrap;
    position: relative;
    text-overflow: ellipsis;
    font-size: 0.7rem;
    font-family: inherit;
    cursor: pointer;
}
input::-webkit-input-placeholder{ /*WebKit browsers*/

color: red;

}

input::-moz-input-placeholder{ /*Mozilla Firefox*/

color: red;

}

input::-ms-input-placeholder{ /*Internet Explorer*/ 

color: red;

}
</style>
