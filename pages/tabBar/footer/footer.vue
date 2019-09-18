<template>
	<view>
		<footer class="aui-bar aui-bar-tab"  id="footer">
			<div class="aui-bar-tab-item" v-for="(item,index) in footlist" :key="index" :class="{'aui-active':item.target}" @click="rediect(index)" tapmode>
				<image class="footer-img" :src="item.src" mode=""></image>
				<div class="aui-bar-tab-label">{{item.text}}</div>
			</div>
		</footer>
	</view>
</template>

<script>
	export default {
		props:[
			"footerid"
		],
		data() {
			return {
				footlist:[
					{
						src:'../../../static/navIcon/tab_icon_wode_shouye.png',
						srcs:'../../../static/navIcon/tab_icon_shouye.png',
						text:'首页',
						url:'/pages/tabBar/home/home',
						target:false,
						id:1
					},
					{
						src:'../../../static/navIcon/tab_icon_daohang.png',
						srcs:'../../../static/navIcon/tab_icon_dang_daohang.png',
						text:'导航',
						url:'/pages/tabBar/component/component',
						target:false,
						id:2
					},
					{
						src:'../../../static/navIcon/tab_icon_youka.png',
						srcs:'../../../static/navIcon/tab_icon_bang_youka.png',
						text:'油卡',
						url:'/pages/tabBar/gasCard/gasCard',
						target:false,
						id:3
					},
					{
						src:'../../../static/navIcon/tab_icon_wode.png',
						srcs:'../../../static/navIcon/tab_icon_wode_wode.png',
						text:'我的',
						url:'/pages/tabBar/personCenter/personCenter',
						target:false,
						id:4
					}
				]
			}
		},
		created(){
			this.footlist.forEach((index)=>{
				if(index.id===this.footerid){
					var srcindex=index.srcs
					index.src=srcindex
					index.target=true
					
				}		
			})
		},
		methods: {
			rediect(e){
				console.log(this.footlist[e].url)
				uni.redirectTo({
					url:this.footlist[e].url
				});
			}
		}
	}
</script>

<style>
.footer-img{
		width: 20px;
		height: 20px;
		position: relative;
		top:10upx;
	}
.aui-active{
	color:rgb(255,130,0);
	/* #f7f7f8 */
}
.aui-bar-tab{
 background:#f7f7f8 ;
}
</style>
