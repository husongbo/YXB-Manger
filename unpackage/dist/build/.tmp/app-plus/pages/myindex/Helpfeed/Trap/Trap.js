(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myindex/Helpfeed/Trap/Trap"],{"267e":function(t,e,n){"use strict";n.r(e);var a=n("9b0d"),i=n("bf48");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("b502");var c=n("2877"),u=Object(c["a"])(i["default"],a["a"],a["b"],!1,null,"2ef7a88e",null);e["default"]=u.exports},"4d6d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{len:0,startX:0,moveEndX:0,valueX:0}},methods:{touchstart:function(t){t.preventDefault(),this.startX=t.touches[0].pageX},touchmove:function(e){return e.preventDefault(),this.moveEndX=e.touches[0].pageX,this.valueX=this.moveEndX-this.startX,this.valueX>=80?void t.navigateBack({delta:1,animationType:"pop-in",animationDuration:200}):void this.valueX}}};e.default=n}).call(this,n("6e42")["default"])},"9b0d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"content",attrs:{eventid:"161340a6-0"},on:{touchstart:t.touchstart,touchmove:t.touchmove}},[t._m(0),t._m(1)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"card"},[n("view",{staticClass:"card-content"},[n("view",{staticClass:"card-content-inner"},[t._v("加油卡是脱机消费的方式，并没有联接网络的属性，圈存是将用户账户中已存入的资金划转到所持有的加油卡上的一种必要步骤。\n\t\t\t\t用户充值成功后，需前往加油卡品牌所属的任意加油站，\n\t\t\t\t对加油员工说：“我在网上充值后，请帮我圈存一下”或使用加油站内的圈存机按说明进行操作，只需1分钟就可以完成操作。")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",{staticClass:"card"},[n("view",{staticClass:"card-header"},[t._v("温馨提示")]),n("view",{staticClass:"card-content"},[n("view",{staticClass:"card-content-inner"},[t._v("部分城市无法实现异地圈存，如用户计划出行请提前做好圈存工作，以免遇到异地无法圈存的情况，影响使用。")])])])}];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return i})},b502:function(t,e,n){"use strict";var a=n("fa14"),i=n.n(a);i.a},bf48:function(t,e,n){"use strict";n.r(e);var a=n("4d6d"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},f226:function(t,e,n){"use strict";n("fa0a");var a=r(n("b0ce")),i=r(n("267e"));function r(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(i.default))},fa14:function(t,e,n){}},[["f226","common/runtime","common/vendor"]]]);