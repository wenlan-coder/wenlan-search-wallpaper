"use strict";
var common_vendor = require("../common/vendor.js");
const baseUrl = "http://service.picasso.adesk.com";
const request = (options = {}) => {
  common_vendor.index.showLoading({
    title: "\u52A0\u8F7D\u4E2D"
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + options.url || "",
      method: options.type || "GET",
      data: options.data || {},
      header: options.header || {},
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
      },
      complete() {
        common_vendor.index.hideLoading();
      }
    });
  });
};
const get = (url, data, options = {}) => {
  options.type = "GET";
  options.data = data;
  options.url = url;
  return request(options);
};
const post = (url, data, options = {}) => {
  options.type = "POST";
  options.data = data;
  options.url = url;
  return request(options);
};
const put = (url, data, options = {}) => {
  options.type = "PUT";
  options.data = data;
  options.url = url;
  return request(options);
};
const del = (url, data, options = {}) => {
  options.type = "DELETE";
  options.data = data;
  options.url = url;
  return request(options);
};
var request$1 = {
  request,
  get,
  post,
  put,
  del
};
exports.request = request$1;
