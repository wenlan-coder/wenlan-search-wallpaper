"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_rquest = require("./utils/rquest.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/horizontal/index.js";
  "./pages/img-category/index.js";
  "./pages/search/index.js";
  "./pages/mine/index.js";
  "./pages/album/album.js";
  "./pages/img-detail/img-detail.js";
  "./pages/img-video/img-video.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$request = utils_rquest.request;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
