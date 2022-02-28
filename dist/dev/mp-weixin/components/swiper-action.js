"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  emits: ["swiperAction"],
  data() {
    return {
      startTime: 0,
      startX: 0,
      startY: 0
    };
  },
  methods: {
    handleTouchstart(event) {
      this.startTime = Date.now();
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
    },
    handleTouchend(event) {
      const endTime = Date.now();
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      if (endTime - this.startTime > 2e3) {
        return;
      }
      let direction = "";
      if (Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) < 10) {
        direction = endX - this.startX > 0 ? "right" : "left";
      } else {
        return;
      }
      this.$emit("swiperAction", { direction });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleTouchstart && $options.handleTouchstart(...args)),
    b: common_vendor.o((...args) => $options.handleTouchend && $options.handleTouchend(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
