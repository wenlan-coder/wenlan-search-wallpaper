"use strict";var e=require("../../common/vendor.js");e.dayjs.locale("zh-cn"),e.dayjs.extend(e.relativeTime);const t={components:{swiperAction:()=>"../../components/swiper-action.js"},data:()=>({imgDetail:{},album:[],hot:[],comment:[],imgIndex:0}),computed:{},methods:{getData(){const{imgList:t}=getApp().globalData;this.imgDetail=t[this.imgIndex],console.log(this.imgDetail),this.imgDetail.cnTime=e.dayjs(1e3*this.imgDetail.atime).fromNow(),console.log("时间",this.imgDetail.cnTime),this.getComments(this.imgDetail.id)},getComments(t){this.$request.get(`/v2/wallpaper/wallpaper/${t}/comment`).then((t=>{this.album=t.res.album,t.res.hot.forEach((t=>t.cnTime=e.dayjs(1e3*t.atime).fromNow())),t.res.comment.forEach((t=>t.cnTime=e.dayjs(1e3*t.atime).fromNow())),this.hot=t.res.hot,this.comment=t.res.comment}))},handleSwiperAction(t){const{imgList:i}=getApp().globalData;"left"===t.direction&&this.imgIndex<i.length-1?(this.imgIndex++,this.getData()):"right"===t.direction&&this.imgIndex>0?(this.imgIndex--,this.getData()):e.index.showToast({title:"没有数据了",icon:"none"})},async handleDownLoad(){await e.index.showLoading({title:"下载中"});const t=await e.index.downloadFile({url:this.imgDetail.img});console.log("小程序内存",t);const{tempFilePath:i}=t,o=await e.index.saveImageToPhotosAlbum({filePath:i});console.log(o),e.index.hideLoading(),await e.index.showToast({title:"下载成功"})}},watch:{},onLoad(){const{imgIndex:e}=getApp().globalData;this.imgIndex=e,this.getData()},onReady(){},onShow(){},onHide(){},onUnload(){},onPullDownRefresh(){e.index.stopPullDownRefresh()},onReachBottom(){}};if(!Array){e.resolveComponent("swiper-action")()}var i=e._export_sfc(t,[["render",function(t,i,o,a,n,s){return{a:t.imgDetail.thumb,b:e.o(s.handleSwiperAction),c:e.t(t.imgDetail.rank),d:e.f(t.album,((t,i,o)=>({a:t.cover,b:e.t(t.name),c:t.id}))),e:e.f(t.hot,((t,i,o)=>({a:t.user.avatar,b:e.t(t.user.name),c:e.t(t.cnTime),d:e.f(t.user.title,((e,t,i)=>({a:e.icon,b:e.icon}))),e:e.t(t.content),f:e.t(t.size),g:t.id}))),f:e.f(t.comment,((t,i,o)=>({a:t.user.avatar,b:e.t(t.user.name),c:e.t(t.cnTime),d:e.f(t.user.title,((e,t,i)=>({a:e.icon,b:e.icon}))),e:e.t(t.content),f:e.t(t.size),g:t.id}))),g:e.o(((...e)=>s.handleDownLoad&&s.handleDownLoad(...e)))}}],["__scopeId","data-v-33f078f2"]]);t.__runtimeHooks=3,wx.createPage(i);
