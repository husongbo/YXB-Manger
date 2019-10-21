import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	//设置base地址
	// http.config.baseUrl = "http://sms.youxinbao.com.cn"
	http.config.baseUrl = "http://smstest.youxinbao.com.cn"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	}
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data,
    })
}

//手机号注册
export const ReagisterPhone = (data) => {
    return http.request({
        url: '/App/Common/CSharp/app/user/UserInfo.ashx',
        method: 'GET', 
        data,
		// handle:true
    })
}

//手机验证码
export const SendVerfyCode = (data) => {
    return http.request({
        url: '/App/Common/CSharp/app/user/UserInfo.ashx',
        method: 'GET', 
        data,
    })
}

//微信授权登录
export const AuthLogin = (data) => {
    return http.request({
        url: '/App/Common/CSharp/app/user/UserInfo.ashx',
        method: 'GET', 
        data,
    })
}


// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	ReagisterPhone,
	SendVerfyCode,
	AuthLogin
}