"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data: () => ({
    category: []
  }),
  computed: {},
  methods: {
    getList() {
      this.$request.get("/v1/vertical/category").then((result) => {
        this.category = result.res.category;
      });
    }
  },
  watch: {},
  mounted() {
    common_vendor.index.setNavigationBarTitle({ title: "\u5206\u7C7B" });
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
    a: common_vendor.f(_ctx.category, (item, k0, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.name),
        c: item.id,
        d: `/pages/img-video/img-video?id=${item.id}`
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd478b46"]]);
wx.createComponent(Component);
