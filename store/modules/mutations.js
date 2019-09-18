export default{
	login(state, provider) {//登录信息保存
		// state.hasLogin = true
		state.uerInfo.token = provider.token
		state.uerInfo.userName = provider.cardnums
		uni.setStorage({
			key: 'uerInfo',
			data: provider
		})
		console.log("登录成功")
	},
	logout(state) {//退出信息销毁
		state.UserInfo.userimg='../../../static/personCenter/pic.png'
		state.UserInfo.userphone='请登录'
		state.UserInfo.logintime=''
		state.UserInfo.userinfos=''
		state.UserInfo.userpH=''
		state.UserInfo.userid=''
		state.UserInfo.Halfwaylogintime=''
		state.UserInfo.DatNum=''
		state.UserInfo.cardinfo=''
		state.hasLogins=false
		state.hasLogin=false
		state.hascard=false
		uni.removeStorage({
			key: 'WxUserInfos'
		});
	},
	setOpenid(state, openid) {
		state.openid = openid
	},
	//获取用户信息
	GetUserInfo(state){
		uni.getStorage({
			key: 'WxUserInfos',
			success: function (res) {
				state.UserInfo.userphone=res.data.userphone
				state.UserInfo.userimg=res.data.userimg
				state.UserInfo.userid=res.data.userid
				state.UserInfo.userpH=res.data.userpH
				state.UserInfo.logintime=res.data.logintime
				state.UserInfo.userinfos=res.data.userinfos
				state.UserInfo.cardinfo=res.data.cardinfo
				// console.log(JSON.stringify(res))
				if(state.UserInfo.userpH=='000000'){
					state.hasLogins=true
					state.hasLogin=false
					console.log(state.hasLogins)
					console.log(state.hasLogin)
				}
				else{
					state.hasLogins=true
					state.hasLogin=true
				}
				if(state.UserInfo.cardinfo!='no'){
					state.hascard=true
				}
				else{
					state.hascard=false
				}	
			}
		});
	},
	//微信登录
	wxlogin(state,userinfo){
		state.wxuserinfo=userinfo
		state.UserInfo.userphone=state.wxuserinfo.nickName
		state.UserInfo.userimg=state.wxuserinfo.avatarUrl
		state.UserInfo.userid=state.wxuserinfo.UserId
		state.UserInfo.userpH=state.wxuserinfo.UserPh
		state.UserInfo.logintime=state.wxuserinfo.UserTime
		state.UserInfo.userinfos=state.wxuserinfo.Userinfos
		state.UserInfo.cardinfo=state.wxuserinfo.Cardinfo
		if(state.UserInfo.userpH!='000000'){
			state.hasLogin=true
		}
		if(state.UserInfo.cardinfo!='no'){
			state.hascard=true
		}
		state.hasLogins=true
		console.log(JSON.stringify(state.hasLogin))
		console.log(JSON.stringify(state.UserInfo))
		uni.setStorage({
			key: 'WxUserInfos',
			data:state.UserInfo,
			success: function (e) {
				return;
			}
		});
	},
	//账户密码登录
	AccountPsd(state,userinfo){
		state.UserInfo.userphone=userinfo.phone
		state.UserInfo.userimg=userinfo.img
		state.UserInfo.userid=userinfo.userid
		state.UserInfo.userpH=userinfo.userph
		state.UserInfo.logintime=userinfo.time
		state.UserInfo.userinfos=userinfo.userinfos
		state.UserInfo.cardinfo=userinfo.cardinfo
		state.hasLogins=true
		state.hasLogin=true
		if(state.UserInfo.cardinfo!='no'){
			state.hascard=true
		}
		console.log(JSON.stringify(userinfo))
		uni.setStorage({
			key: 'WxUserInfos',
			data:state.UserInfo,
			success: function (e) {
				return;
			}
		});
	},
	//绑定油卡
	bindingCard(state,info){
		this.hascard=true
		state.UserInfo.cardinfo=info
		uni.setStorage({
			key: 'WxUserInfos',
			data:state.UserInfo,
			success: function (e) {
				return;
			}
		});
	},
	//完善信息
	bindinginfo(state,info){
		state.UserInfo.userinfos=info
		uni.setStorage({
			key: 'WxUserInfos',
			data:state.UserInfo,
			success: function (e) {
				return;
			}
		});
	},
	//设置支付密码
	SetPayPsd(state,pwd){
		state.UserInfo.userinfos=pwd	
	},
	USERINX(state){
		state.userindex++
		console.log(state.userindex)
	},
	//改变头像
	Changepic(state,pic){
		state.userimg=pic
		console.log(state.userimg)	
	},
	//手机号密码登录
	UserPhones(state,txt){
		state.userphone=txt
	},
	//手机号绑定成功
	PhonesSuccess(state,phone){
		state.UserInfo.userpH=phone
		state.hasLogin=true
		uni.setStorage({
			key: 'WxUserInfos',
			data:state.UserInfo,
			success: function (e) {
				return;
			}
		});
	},
	//获取当前日期时间
	GetData(state){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		month=month< 10 ? ("0" + month) : month;
		day=day< 10 ? ("0" + day) : day
		state.UserInfo.Halfwaylogintime= year + '-' + month + '-' + day;
	},
	//格式化日期的月份或天数的显示（小于10，在前面增加0）
	getFormatDate(value){
		var result;
		result = value < 10 ? ("0" + value) : value;
		return result;
	},
	//获取与毫秒数的转化比例（相差天数：1，相差小时数：2，相差分钟数：3，相差秒数：4）
	getDifferScale(state,value){
		//获取转化比（天数跟毫秒数的比例）
		if (value == 1) {
			state.format = parseFloat(24 * 60 * 60 * 1000);
			console.log(state.format)
		}
			//获取转化比（小时数跟毫秒数的比例）
		else if (value == 2) {
			state.format = parseFloat(60 * 60 * 1000);
		}
			//获取转化比（分钟数跟毫秒数的比例）
		else if (value == 3) {
			state.format = parseFloat(60 * 1000);
		}
			//获取转化比（秒数跟毫秒数的比例）
		else if (value == 4) {
			state.format = parseFloat(1000);
		}
	},
	//获取两个日期的相差日期数(differ 相差天数：1、相差小时数：2、相差分钟数：3、相差秒数：4)
	getDifferDate(state,Dates){
		console.log(Dates)
		var sDate1 = Date.parse(Dates.logintimes);
        var sDate2 = Date.parse(Dates.outlogintimes);
		var dateSpan = sDate2 - sDate1;
        var dateSpan = Math.abs(dateSpan);
		var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		state.UserInfo.DatNum=iDays
		// var startDate = new Date(Dates.logintimes);
		// var endDate = new Date(Dates.outlogintimes);
		// 
		// console.log(startDate)
		// var aa=endDate.getTime()+1000
		// console.log(aa)
		// var msecNum = aa - startDate.getTime();
		// console.log(msecNum)
		// this.commit("getDifferScale",Dates.diifer)
		// var dayNum = Math.floor(msecNum /state.format);
		// console.log(dayNum)
		// state.UserInfo.DatNum=dayNum
	}
}