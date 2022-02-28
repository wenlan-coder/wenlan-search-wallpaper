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
  data: () => ({
    userInfo: {}
  }),
  methods: {
    getUserInfo() {
      console.log("this\u6267", this);
      let that = this;
      common_vendor.index.getSetting({
        success(res) {
          common_vendor.index.showModal({
            title: "\u6388\u6743\u63D0\u9192",
            content: "\u8BF7\u6388\u6743\u5934\u50CF\u7B49\u4FE1\u606F\uFF0C\u4EE5\u4FBF\u4E3A\u60A8\u63D0\u4F9B\u66F4\u597D\u7684\u670D\u52A1",
            cancelText: "\u968F\u4FBF\u901B\u901B",
            confirmText: "\u786E\u8BA4\u6388\u6743",
            success: function(showres) {
              if (showres.confirm) {
                console.log("this\u6267", this);
                common_vendor.index.getUserProfile({
                  desc: "\u7528\u4E8E\u5B8C\u5584\u4F1A\u5458\u8D44\u6599",
                  lang: "zh_CN",
                  success: (infoRes) => {
                    console.log("\u6388\u6743\u4FE1\u606F", infoRes);
                    that.userInfo = __spreadValues({}, infoRes.userInfo);
                    common_vendor.index.login({
                      provider: "weixin",
                      success: (res1) => {
                        console.log(res1);
                        console.log("code", res1.code);
                      },
                      fail: () => {
                        common_vendor.index.showToast({
                          title: "\u5FAE\u4FE1\u767B\u5F55\u6388\u6743\u5931\u8D25",
                          icon: "none"
                        });
                      }
                    });
                  }
                });
              } else if (showres.cancel) {
                common_vendor.index.showToast({
                  title: "\u7528\u6237\u53D6\u6D88\u6388\u6743",
                  icon: "none"
                });
              }
            }
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: Object.keys(_ctx.userInfo).length === 0
  }, Object.keys(_ctx.userInfo).length === 0 ? {
    b: common_vendor.p({
      type: "contact-filled",
      size: "100",
      color: "#AFAFAF"
    }),
    c: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  } : {}, {
    d: Object.keys(_ctx.userInfo).length > 0
  }, Object.keys(_ctx.userInfo).length > 0 ? {
    e: common_vendor.t(_ctx.userInfo.nickName),
    f: _ctx.userInfo.avatarUrl
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-355cc69a"]]);
wx.createPage(MiniProgramPage);
