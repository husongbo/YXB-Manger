(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/function/Balance/Balance"],{1216:function(t,n,e){"use strict";e("fa0a");var s=a(e("b0ce")),i=a(e("db75"));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(i.default))},"2b60":function(t,n,e){},"3bb3":function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("view",{staticClass:"content",attrs:{eventid:"855c8c52-0"},on:{touchstart:t.touchstart,touchmove:t.touchmove}},[e("view",{staticClass:"tops-parent"},[e("view",{staticClass:"tops"},[e("view",{staticClass:"tops-title"},[t._v("可用余额")]),e("view",{staticClass:"tops-text"},[t._v(t._s(t.monthsnumber))])])])])},i=[];e.d(n,"a",function(){return s}),e.d(n,"b",function(){return i})},"58b6":function(t,n,e){"use strict";e.r(n);var s=e("99d8"),i=e.n(s);for(var a in s)"default"!==a&&function(t){e.d(n,t,function(){return s[t]})}(a);n["default"]=i.a},"66c4":function(t,n,e){"use strict";var s=e("2b60"),i=e.n(s);i.a},"99d8":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=e("2f62"),i={data:function(){return{monthsnumber:0,sumnumber:15,len:0,startX:0,moveEndX:0,valueX:0,ulsvisit:"hidden",listtext:"全部",listtexturl:"../../../static/navIcon/next.png",list:""}},computed:(0,s.mapState)(["UserInfo"]),onLoad:function(){var t=this,n='{method:"GetUserMoneyInfo",user_id:"'.concat(this.UserInfo.userid,'"}');this.$api.ReagisterPhone(n).then(function(n){if(console.log(n),0==n.data.result)return console.log("没有余额"),void(t.monthsnumber="0.00");t.monthsnumber=JSON.parse(n.data.data_score)[0].MONEY})},methods:{touchstart:function(t){t.preventDefault(),this.startX=t.touches[0].pageX},touchmove:function(n){n.preventDefault(),this.moveEndX=n.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80&&t.navigateBack({delta:1,animationType:"pop-in",animationDuration:200})},openuls:function(){if("hidden"==this.ulsvisit)return this.ulsvisit="visible",void(this.listtexturl="../../../static/navIcon/down.png");this.ulsvisit="hidden",this.listtexturl="../../../static/navIcon/next.png"},changetext:function(t){this.listtext=t,console.log(this.listtext),this.ulsvisit="hidden",this.listtexturl="../../../static/navIcon/next.png"}}};n.default=i}).call(this,e("6e42")["default"])},db75:function(t,n,e){"use strict";e.r(n);var s=e("3bb3"),i=e("58b6");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("66c4");var o=e("2877"),u=Object(o["a"])(i["default"],s["a"],s["b"],!1,null,null,null);n["default"]=u.exports}},[["1216","common/runtime","common/vendor"]]]);