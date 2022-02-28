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
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data: () => ({
    params: {
      limit: 30,
      order: "new",
      skip: 0
    },
    banner: [],
    album: [],
    hasMore: true
  }),
  computed: {},
  methods: {
    getList() {
      this.$request.get("/v1/wallpaper/album", __spreadValues({}, this.params)).then((res) => {
        if (res.res.album.length === 0) {
          this.hasMore = false;
          common_vendor.index.showToast({
            title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
            icon: "none"
          });
          return;
        }
        if (this.album.length === 0) {
          this.banner = res.res.banner;
        }
        this.album = [...this.album, ...res.res.album];
      }).catch((err) => {
        console.log(err.message);
      });
    },
    handleToLower() {
      console.log("\u6B66\u6C49\u52A0\u6CB9\uFF01\uFF01");
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        common_vendor.index.showToast({
          title: "\u6CA1\u6709\u6570\u636E\u4E86",
          icon: "none"
        });
      }
    }
  },
  watch: {},
  mounted() {
    common_vendor.index.setNavigationBarTitle({
      title: "\u4E13\u8F91"
    });
    this.getList();
  },
  onLoad() {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.banner, (item, k0, i0) => {
      return {
        a: item.thumb,
        b: item.id
      };
    }),
    b: common_vendor.f(_ctx.album, (item, k0, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.desc),
        d: item.id,
        e: `/pages/album/album?id=${item.id}`
      };
    }),
    c: common_vendor.o((...args) => $options.handleToLower && $options.handleToLower(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-46a90620"]]);
wx.createComponent(Component);
