(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myindex/Instructions/Instructions"],{"09ab":function(t,e,n){"use strict";n.r(e);var a=n("bd19"),u=n("a9c0");for(var o in u)"default"!==o&&function(t){n.d(e,t,function(){return u[t]})}(o);n("ea97");var i=n("2877"),r=Object(i["a"])(u["default"],a["a"],a["b"],!1,null,"14d96d6f",null);e["default"]=r.exports},4066:function(t,e,n){"use strict";n("fa0a");var a=o(n("b0ce")),u=o(n("09ab"));function o(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(u.default))},8140:function(t,e,n){},"8c74":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{len:0,startX:0,moveEndX:0,valueX:0}},methods:{touchstart:function(t){t.preventDefault(),this.startX=t.touches[0].pageX},touchmove:function(e){return e.preventDefault(),this.moveEndX=e.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80?void t.navigateBack({delta:1,animationType:"pop-in",animationDuration:200}):void this.valueX}}};e.default=n}).call(this,n("6e42")["default"])},a9c0:function(t,e,n){"use strict";n.r(e);var a=n("8c74"),u=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=u.a},bd19:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content",attrs:{eventid:"32c53da1-0"},on:{touchstart:t.touchstart,touchmove:t.touchmove}},[n("h3",[t._v("公告")]),n("view",[t._v("中油九洲北斗汽油平台“油信宝”关于平台用户油品消费开票通知")]),n("view",[t._v("一、平台油品消费后由四川中油九洲北斗科技能源有限公司开具发票。")]),n("view",[t._v("二、鉴于国家对金税三期系统更新升级，预计2017年12月底前完成的平台开具电子发票功能，未能如期开放，平台会加紧与税务系统就“金税三期电子发票系统”对接。")]),n("view",[t._v("三、平台在2018年2月20日前上线“我的发票”信息格式，采集开票信息。用于目前开具纸质增值税普通发票的数据及之后与“金税三期电子发票系统”对接时开具电子发\n                票的数据，开发完成后及时向用户开放申请电子发票的功能。")])],1)},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},ea97:function(t,e,n){"use strict";var a=n("8140"),u=n.n(a);u.a}},[["4066","common/runtime","common/vendor"]]]);