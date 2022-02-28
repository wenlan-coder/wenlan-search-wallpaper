/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2022-02-27 16:07:22
 * @LastEditors: wenlan
 * @LastEditTime: 2022-02-27 17:47:11
 */

// request.js
// 通常可以吧 baseUrl 单独放在一个 js 文件了
const baseUrl = "http://service.picasso.adesk.com";
// 加载中

const request = (options = {}) => {
    //请求前置
    uni.showLoading({
        title: "加载中",
    });
    // 在这里可以对请求头进行一些设置
    // 例如：
    // options.header = {
    //      "Content-Type": "application/x-www-form-urlencoded"
    // }
    return new Promise((resolve, reject) => {
        uni.request({
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
                uni.hideLoading();
            },
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

export default {
    request,
    get,
    post,
    put,
    del,
};
