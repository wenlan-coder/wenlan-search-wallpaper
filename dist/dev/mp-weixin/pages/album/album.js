"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data: () => ({
    params: {
      limit: 30,
      order: "new",
      skip: 0,
      first: 1
    },
    id: -1,
    album: {},
    wallpaper: [],
    hasMore: true
  }),
  computed: {},
  methods: {
    getList() {
      this.$request.get(`/v1/wallpaper/album/${this.id}/wallpaper`, __spreadValues({}, this.params)).then((res) => {
        console.log(res);
        if (Object.keys(this.album).length === 0) {
          this.album = res.res.album;
        }
        if (res.res.wallpaper.length === 0) {
          this.hasMore = false;
          common_vendor.index.showToast({
            title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
            icon: "none"
          });
          return;
        }
        this.wallpaper = [...this.wallpaper, ...res.res.wallpaper];
      }).catch((err) => {
        console.log(err.message);
      });
    },
    onReachBottom() {
      console.log("\u6211\u4E5F\u662F\u6709\u5E95\u7EBF\u7684");
      if (this.hasMore) {
        this.params.first = 0;
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        common_vendor.index.showToast({
          title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
          icon: "none"
        });
      }
    }
  },
  watch: {},
  onLoad(options) {
    console.log(options);
    this.id = options.id;
    this.getList();
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
  const _component_go_detail = common_vendor.resolveComponent("go-detail");
  _component_go_detail();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.album.cover,
    b: common_vendor.t(_ctx.album.name),
    c: _ctx.album.user.avatar,
    d: common_vendor.t(_ctx.album.user.name),
    e: common_vendor.t(_ctx.album.desc),
    f: common_vendor.f(_ctx.wallpaper, (item, index, i0) => {
      return {
        a: item.thumb + item.rule.replace("$<Height>", 360),
        b: "0057bc7b-0-" + i0,
        c: common_vendor.p({
          list: _ctx.wallpaper,
          index
        }),
        d: item.id
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0057bc7b"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
