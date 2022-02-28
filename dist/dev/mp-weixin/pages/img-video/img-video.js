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
    items: [
      { title: "\u6700\u65B0", order: "new" },
      { title: "\u70ED\u95E8", order: "hot" }
    ],
    current: 0,
    params: {
      limit: 30,
      skip: 0,
      order: "new"
    },
    id: 0,
    vertical: [],
    hasMore: true
  }),
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  computed: {},
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      } else {
        return;
      }
      this.params.order = this.items[e.currentIndex].order;
      this.params.skip = 0;
      this.vertical = [];
      this.getList();
    },
    getList() {
      this.$request.get(`/v1/vertical/category/${this.id}/vertical`, __spreadValues({}, this.params)).then((result) => {
        console.log(result);
        if (result.res.vertical.length === 0) {
          this.hasMore = false;
          common_vendor.index.showToast({
            title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
            icon: "none"
          });
          return;
        }
        this.vertical = [...this.vertical, ...result.res.vertical];
      });
    },
    handleScrolltolower() {
      if (this.hasMore) {
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
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  _easycom_uni_segmented_control2();
}
const _easycom_uni_segmented_control = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  _easycom_uni_segmented_control();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      values: _ctx.items.map((v) => v.title),
      current: _ctx.current,
      ["style-type"]: "text",
      ["active-color"]: "#4cd964"
    }),
    c: common_vendor.f(_ctx.vertical, (item, k0, i0) => {
      return {
        a: item.thumb,
        b: item.id
      };
    }),
    d: common_vendor.o((...args) => $options.handleScrolltolower && $options.handleScrolltolower(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0ed222ff"]]);
_sfc_main.__runtimeHooks = 3;
wx.createPage(MiniProgramPage);
