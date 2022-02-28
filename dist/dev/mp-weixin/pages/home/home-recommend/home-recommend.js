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
const goDetail = () => "../../../components/go-detail.js";
const _sfc_main = {
  components: {
    goDetail
  },
  data: () => ({
    recommends: [],
    monthes: {},
    hots: [],
    params: {
      limit: 30,
      order: "hot",
      skip: 0
    },
    hasMore: true
  }),
  computed: {},
  methods: {
    getList() {
      this.$request.get("/v3/homepage/vertical", __spreadValues({}, this.params)).then((res) => {
        if (res.res.vertical.length === 0) {
          this.hasMore = false;
          common_vendor.index.showToast({
            title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
            icon: "none"
          });
          return;
        }
        if (this.recommends.length === 0) {
          this.recommends = res.res.homepage[1].items;
          this.monthes = res.res.homepage[2];
          this.monthes.MM = common_vendor.dayjs(this.monthes.stime).format("MM");
          this.monthes.DD = common_vendor.dayjs(this.monthes.stime).format("DD");
          console.log(this.monthes);
        }
        this.hots = [...this.hots, ...res.res.vertical];
        console.log("@@", this.hots);
      }).catch((err) => {
        console.log(err.message);
      });
    },
    handleToLower() {
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
    common_vendor.index.setNavigationBarTitle({ title: "\u63A8\u8350" });
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
if (!Array) {
  const _component_go_detail = common_vendor.resolveComponent("go-detail");
  _component_go_detail();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.recommends.length > 0
  }, _ctx.recommends.length > 0 ? {
    b: common_vendor.f(_ctx.recommends, (item, k0, i0) => {
      return {
        a: item.thumb,
        b: item.id,
        c: `/pages/album/album?id=${item.target}`
      };
    }),
    c: common_vendor.t(_ctx.monthes.DD),
    d: common_vendor.t(_ctx.monthes.MM),
    e: common_vendor.t(_ctx.monthes.title),
    f: common_vendor.f(_ctx.monthes.items, (item, index, i0) => {
      return {
        a: item.thumb + item.rule.replace("$<Height>", 360),
        b: "1c204103-0-" + i0,
        c: common_vendor.p({
          index,
          list: _ctx.monthes.items
        }),
        d: item.id
      };
    }),
    g: common_vendor.f(_ctx.hots, (item, index, i0) => {
      return {
        a: item.thumb,
        b: "1c204103-1-" + i0,
        c: common_vendor.p({
          index,
          list: _ctx.hots
        }),
        d: item.id
      };
    }),
    h: common_vendor.o((...args) => $options.handleToLower && $options.handleToLower(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c204103"]]);
wx.createComponent(Component);
