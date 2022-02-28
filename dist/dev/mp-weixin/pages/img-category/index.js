"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      videoObj: {
        url: "http://img5.adesk.com/61ae09357e978a3aa51aefbb?imageMogr2/thumbnail/!350x540r/gravity/Center/crop/350x540&sign=c205baffe104a5425c8bc4cb1e05c330&t=621c907b",
        video: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
      },
      muted: false
    };
  },
  onLoad() {
  },
  methods: {
    handleMuted() {
      this.muted = !this.muted;
    },
    async handleDownload() {
      await common_vendor.index.showLoading({ title: "\u4E0B\u8F7D\u4E2D" });
      const result = await common_vendor.index.downloadFile({ url: this.videoObj.video });
      const { tempFilePath } = result;
      console.log(result);
      await common_vendor.index.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });
      common_vendor.index.hideLoading();
      await common_vendor.index.showToast({ title: "\u4E0B\u8F7D\u6210\u529F" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.videoObj.url,
    b: common_vendor.o((...args) => $options.handleMuted && $options.handleMuted(...args)),
    c: common_vendor.n($data.muted ? "icon-icon-2" : "icon-pinpaiicon"),
    d: $data.muted,
    e: $data.videoObj.video,
    f: common_vendor.o((...args) => $options.handleDownload && $options.handleDownload(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8d66c862"]]);
wx.createPage(MiniProgramPage);
