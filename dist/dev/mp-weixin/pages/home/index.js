"use strict";
var common_vendor = require("../../common/vendor.js");
const homeAlumb = () => "./home-alumb/index.js";
const homeCategory = () => "./home-category/home-category.js";
const homeNew = () => "./home-new/home-new.js";
const homeRecommend = () => "./home-recommend/home-recommend.js";
const _sfc_main = {
  components: {
    homeAlumb,
    homeCategory,
    homeNew,
    homeRecommend
  },
  data() {
    return {
      items: [{ title: "\u63A8\u8350" }, { title: "\u5206\u7C7B" }, { title: "\u6700\u65B0" }, { title: "\u4E13\u8F91" }],
      current: 0
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _component_home_recommend = common_vendor.resolveComponent("home-recommend");
  const _component_home_category = common_vendor.resolveComponent("home-category");
  const _component_home_new = common_vendor.resolveComponent("home-new");
  const _component_home_alumb = common_vendor.resolveComponent("home-alumb");
  (_easycom_uni_segmented_control2 + _component_home_recommend + _component_home_category + _component_home_new + _component_home_alumb)();
}
const _easycom_uni_segmented_control = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  _easycom_uni_segmented_control();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      styleType: "text",
      current: $data.current,
      values: $data.items.map((v) => v.title),
      activeColor: "#4cd964"
    }),
    c: $data.current === 0
  }, $data.current === 0 ? {} : {}, {
    d: $data.current === 1
  }, $data.current === 1 ? {} : {}, {
    e: $data.current === 2
  }, $data.current === 2 ? {} : {}, {
    f: $data.current === 3
  }, $data.current === 3 ? {} : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
