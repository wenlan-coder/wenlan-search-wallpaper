"use strict";var e=require("../common/vendor.js");const i={props:{list:Array,index:Number},methods:{handleClick(){getApp().globalData.imgList=this.list,getApp().globalData.imgIndex=this.index,e.index.navigateTo({url:"/pages/img-detail/img-detail"})}}};var t=e._export_sfc(i,[["render",function(i,t,a,n,r,l){return{a:e.o(((...e)=>l.handleClick&&l.handleClick(...e)))}}]]);wx.createComponent(t);