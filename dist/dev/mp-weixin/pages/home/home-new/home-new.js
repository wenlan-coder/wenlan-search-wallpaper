"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},
  mounted() {
    common_vendor.index.setNavigationBarTitle({ title: "\u6700\u65B0" });
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
  return {};
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
