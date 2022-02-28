"use strict";
var common_vendor = require("../../common/vendor.js");
common_vendor.dayjs.locale("zh-cn");
common_vendor.dayjs.extend(common_vendor.relativeTime);
const swiperAction = () => "../../components/swiper-action.js";
const _sfc_main = {
  components: {
    swiperAction
  },
  data: () => ({
    imgDetail: {},
    album: [],
    hot: [],
    comment: [],
    imgIndex: 0
  }),
  computed: {},
  methods: {
    getData() {
      const { imgList } = getApp().globalData;
      this.imgDetail = imgList[this.imgIndex];
      console.log(this.imgDetail);
      this.imgDetail.cnTime = common_vendor.dayjs(this.imgDetail.atime * 1e3).fromNow();
      console.log("\u65F6\u95F4", this.imgDetail.cnTime);
      this.getComments(this.imgDetail.id);
    },
    getComments(id) {
      this.$request.get(`/v2/wallpaper/wallpaper/${id}/comment`).then((result) => {
        this.album = result.res.album;
        result.res.hot.forEach((v) => v.cnTime = common_vendor.dayjs(v.atime * 1e3).fromNow());
        result.res.comment.forEach((v) => v.cnTime = common_vendor.dayjs(v.atime * 1e3).fromNow());
        this.hot = result.res.hot;
        this.comment = result.res.comment;
      });
    },
    handleSwiperAction(e) {
      const { imgList } = getApp().globalData;
      if (e.direction === "left" && this.imgIndex < imgList.length - 1) {
        this.imgIndex++;
        this.getData();
      } else if (e.direction === "right" && this.imgIndex > 0) {
        this.imgIndex--;
        this.getData();
      } else {
        common_vendor.index.showToast({
          title: "\u6CA1\u6709\u6570\u636E\u4E86",
          icon: "none"
        });
      }
    },
    async handleDownLoad() {
      await common_vendor.index.showLoading({
        title: "\u4E0B\u8F7D\u4E2D"
      });
      const result = await common_vendor.index.downloadFile({ url: this.imgDetail.img });
      console.log("\u5C0F\u7A0B\u5E8F\u5185\u5B58", result);
      const { tempFilePath } = result;
      const result2 = await common_vendor.index.saveImageToPhotosAlbum({ filePath: tempFilePath });
      console.log(result2);
      common_vendor.index.hideLoading();
      await common_vendor.index.showToast({
        title: "\u4E0B\u8F7D\u6210\u529F"
      });
    }
  },
  watch: {},
  onLoad() {
    const { imgIndex } = getApp().globalData;
    this.imgIndex = imgIndex;
    this.getData();
  },
  onReady() {
  },
  onShow() {
  },
  onHide() {
  },
  onUnload() {
  },
  onPullDownRefresh() {
    common_vendor.index.stopPullDownRefresh();
  },
  onReachBottom() {
  }
};
if (!Array) {
  const _component_swiper_action = common_vendor.resolveComponent("swiper-action");
  _component_swiper_action();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.imgDetail.thumb,
    b: common_vendor.o($options.handleSwiperAction),
    c: common_vendor.t(_ctx.imgDetail.rank),
    d: common_vendor.f(_ctx.album, (item, k0, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.name),
        c: item.id
      };
    }),
    e: common_vendor.f(_ctx.hot, (item, k0, i0) => {
      return {
        a: item.user.avatar,
        b: common_vendor.t(item.user.name),
        c: common_vendor.t(item.cnTime),
        d: common_vendor.f(item.user.title, (item2, k1, i1) => {
          return {
            a: item2.icon,
            b: item2.icon
          };
        }),
        e: common_vendor.t(item.content),
        f: common_vendor.t(item.size),
        g: item.id
      };
    }),
    f: common_vendor.f(_ctx.comment, (item, k0, i0) => {
      return {
        a: item.user.avatar,
        b: common_vendor.t(item.user.name),
        c: common_vendor.t(item.cnTime),
        d: common_vendor.f(item.user.title, (item2, k1, i1) => {
          return {
            a: item2.icon,
            b: item2.icon
          };
        }),
        e: common_vendor.t(item.content),
        f: common_vendor.t(item.size),
        g: item.id
      };
    }),
    g: common_vendor.o((...args) => $options.handleDownLoad && $options.handleDownLoad(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2710133b"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
