"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    list: Array,
    index: Number
  },
  methods: {
    handleClick() {
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = this.index;
      common_vendor.index.navigateTo({
        url: "/pages/img-detail/img-detail"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
